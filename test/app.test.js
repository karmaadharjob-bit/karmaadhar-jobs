'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

// Isolate the data store for this test run.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'karmaadhar-jobs-'));
process.env.DATA_DIR = tmpDir;

const app = require('../server');

let server;
let base;

function dbPath() {
  return path.join(tmpDir, 'db.json');
}

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath(), 'utf8'));
}

function postForm(url, fields, options = {}) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
    redirect: 'manual',
    ...options
  });
}

const validJob = {
  title: 'Security Guard (Night Shift)',
  company: 'Shree Facility Services',
  city: 'Nagpur',
  location: 'Sitabuldi, Nagpur',
  category: 'Security Guard',
  type: 'Full-time',
  workMode: 'On-site',
  experience: '1 - 2 years',
  qualification: '10th Pass',
  contactEmail: 'hiring@shreefacility.example',
  description:
    'Guard the main gate of a residential society at night, log visitors and do two rounds of the campus every shift.',
  responsibilities: 'Check visitor IDs at the gate\nPatrol the campus twice per shift',
  requirements: 'Ex-servicemen welcome\nAadhaar card and police verification',
  skills: 'Gate Security, Visitor Log, Night Shift',
  salaryMin: '18000',
  salaryMax: '24000',
  salaryPeriod: 'month'
};

before(async () => {
  server = app.listen(0, '0.0.0.0');
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.close();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test('home page lists seeded blue-collar jobs', async () => {
  const res = await fetch(`${base}/`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /Karmaadhar/);
  assert.match(html, /Find a job near you/);
  assert.match(html, /Delivery Executive/);
  assert.match(html, /Security Guard/);
  assert.match(html, /Cook \(North Indian\)/);
});

test('home page shows category shortcuts, city list and monthly salaries', async () => {
  const html = await (await fetch(`${base}/`)).text();
  assert.match(html, /category-tile/);
  assert.match(html, /Housekeeping/);
  assert.match(html, /Electrician/);
  assert.match(html, /<option value="Mumbai"/);
  assert.match(html, /per month/);
  assert.doesNotMatch(html, /per year/);
});

test('category filter narrows results', async () => {
  const html = await (await fetch(`${base}/?category=Driver`)).text();
  assert.match(html, /Cab Driver/);
  assert.doesNotMatch(html, /Delivery Executive</);
});

test('city filter narrows results', async () => {
  const html = await (await fetch(`${base}/?city=Pune`)).text();
  assert.match(html, /Commis Chef \/ Kitchen Helper/);
  assert.doesNotMatch(html, /Cab Driver/);
});

test('experience filter narrows results', async () => {
  const fresher = await (await fetch(`${base}/?experience=Fresher`)).text();
  assert.match(fresher, /Delivery Executive/);
  assert.doesNotMatch(fresher, /Heavy Truck Driver/);

  const experienced = await (await fetch(`${base}/?experience=2%2B%20years`)).text();
  assert.match(experienced, /Heavy Truck Driver/);
});

test('keyword search matches seeded titles', async () => {
  const byTitle = await (await fetch(`${base}/?q=plumber`)).text();
  assert.match(byTitle, /Plumber/);
  assert.doesNotMatch(byTitle, /Cab Driver/);

  const byCategory = await (await fetch(`${base}/?q=housekeeping`)).text();
  assert.match(byCategory, /Housekeeping Staff \(Office\)/);
});

test('search with no matches renders an empty state', async () => {
  const res = await fetch(`${base}/?q=zzzznotarealskill`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /No jobs match that search/);
});

test('job detail page renders the full brief', async () => {
  const res = await fetch(`${base}/jobs/1`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /Delivery Executive/);
  assert.match(html, /Job description/);
  assert.match(html, /Your daily work/);
  assert.match(html, /Who can apply/);
  assert.match(html, /Skills/);
  assert.match(html, /Apply for this job/);
  assert.match(html, /Andheri East, Mumbai/);
  assert.match(html, /₹/);
});

test('post a job page renders the employer form', async () => {
  const res = await fetch(`${base}/post`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /Post a job in two minutes/);
  assert.match(html, /Salary from \(₹ per month\)/);
  assert.match(html, /name="experience"/);
  assert.match(html, /name="qualification"/);
  assert.match(html, /value="Security Guard"/);
});

test('unknown pages return 404', async () => {
  const missingJob = await fetch(`${base}/jobs/9999`);
  assert.equal(missingJob.status, 404);
  const missingPage = await fetch(`${base}/no-such-page`);
  assert.equal(missingPage.status, 404);
});

test('valid application is stored and redirects back to the job', async () => {
  const res = await postForm(`${base}/jobs/2/apply`, {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    portfolio: 'https://example.com/priya',
    coverLetter: 'I ride my own scooter and have delivered in Koramangala for two years.'
  });
  assert.equal(res.status, 302);
  assert.match(res.headers.get('location'), /^\/jobs\/2\?applied=1/);

  const applications = readDb().applications;
  const stored = applications.find((item) => item.email === 'priya.sharma@example.com');
  assert.ok(stored, 'application should be persisted');
  assert.equal(stored.jobId, 2);
  assert.equal(stored.name, 'Priya Sharma');

  const page = await (await fetch(`${base}/jobs/2?applied=1`)).text();
  assert.match(page, /Application sent/);
});

test('invalid application is rejected without being stored', async () => {
  const before = readDb().applications.length;
  const res = await postForm(`${base}/jobs/3/apply`, {
    name: 'A',
    email: 'not-an-email',
    coverLetter: 'too short'
  });
  assert.equal(res.status, 400);
  const html = await res.text();
  assert.match(html, /Please enter a valid email address/);
  assert.match(html, /Please write at least 20 characters/);
  assert.equal(readDb().applications.length, before);
});

test('employer can publish a job and it appears in the listing', async () => {
  const res = await postForm(`${base}/post`, validJob);
  assert.equal(res.status, 302);
  const location = res.headers.get('location');
  assert.match(location, /^\/jobs\/\d+\?posted=1$/);

  const newId = Number(location.match(/\/jobs\/(\d+)/)[1]);
  const detail = await (await fetch(`${base}${location}`)).text();
  assert.match(detail, /Security Guard \(Night Shift\)/);
  assert.match(detail, /Your job is live/);
  assert.match(detail, /Sitabuldi, Nagpur/);

  const home = await (await fetch(`${base}/?city=Nagpur`)).text();
  assert.match(home, /Security Guard \(Night Shift\)/);

  const stored = readDb().jobs.find((job) => job.id === newId);
  assert.equal(stored.company, 'Shree Facility Services');
  assert.equal(stored.city, 'Nagpur');
  assert.equal(stored.experience, '1 - 2 years');
  assert.equal(stored.qualification, '10th Pass');
  assert.deepEqual(stored.skills, ['Gate Security', 'Visitor Log', 'Night Shift']);
  assert.equal(stored.salaryMin, 18000);
  assert.equal(stored.salaryPeriod, 'month');
});

test('job posting validation rejects incomplete listings', async () => {
  const res = await postForm(`${base}/post`, {
    ...validJob,
    title: '',
    description: 'short',
    type: 'Freelance',
    category: '',
    experience: '9 years',
    contactEmail: 'nope'
  });
  assert.equal(res.status, 400);
  const html = await res.text();
  assert.match(html, /Job title is required/);
  assert.match(html, /at least 40 characters/);
  assert.match(html, /Choose a valid job type/);
  assert.match(html, /Category is required/);
  assert.match(html, /Choose the experience you need/);
  assert.match(html, /A valid contact email is required/);
});

test('salary range is validated', async () => {
  const res = await postForm(`${base}/post`, { ...validJob, salaryMin: '30000', salaryMax: '10000' });
  assert.equal(res.status, 400);
  assert.match(await res.text(), /Maximum salary cannot be lower than the minimum/);
});

test('user supplied HTML is escaped in rendered pages', async () => {
  const res = await postForm(`${base}/post`, {
    ...validJob,
    title: '<script>alert(1)</script>Malicious Role'
  });
  assert.equal(res.status, 302);
  const page = await (await fetch(`${base}${res.headers.get('location')}`)).text();
  assert.doesNotMatch(page, /<script>alert\(1\)<\/script>/);
  assert.match(page, /&lt;script&gt;alert\(1\)&lt;\/script&gt;Malicious Role/);
});

test('jobs API returns JSON for filters', async () => {
  const byType = await fetch(`${base}/api/jobs?type=Part-time`);
  assert.equal(byType.status, 200);
  assert.match(byType.headers.get('content-type'), /application\/json/);
  const typeBody = await byType.json();
  assert.ok(typeBody.count >= 1);
  for (const job of typeBody.jobs) {
    assert.equal(job.type, 'Part-time');
  }

  const byCity = await (await fetch(`${base}/api/jobs?city=Mumbai`)).json();
  assert.ok(byCity.count >= 1);
  for (const job of byCity.jobs) {
    assert.equal(job.city, 'Mumbai');
  }

  const byExperience = await (await fetch(`${base}/api/jobs?experience=2%2B%20years`)).json();
  assert.ok(byExperience.count >= 1);
  for (const job of byExperience.jobs) {
    assert.equal(job.experience, '2+ years');
  }
});

test('health endpoint reports ok', async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
  assert.ok(body.jobs > 10);
});

test('health endpoint reports a writable file-backed store', async () => {
  const body = await (await fetch(`${base}/api/health`)).json();
  assert.equal(body.storage.writable, true);
  assert.equal(body.storage.mode, 'file');
  assert.equal(body.storage.path, dbPath());
  assert.equal(body.storage.error, null);
});

test('posted jobs and applications survive a fresh process start', async () => {
  const posted = await postForm(`${base}/post`, {
    ...validJob,
    title: 'Durability Probe Driver',
    category: 'Driver',
    contactEmail: 'durability@shreefacility.example'
  });
  assert.equal(posted.status, 302);

  const applied = await postForm(`${base}/jobs/1/apply`, {
    name: 'Restart Survivor',
    email: 'restart.survivor@example.com',
    coverLetter: 'Checking that my application is still here after the process restarts cleanly.'
  });
  assert.equal(applied.status, 302);

  // A separate process reads only from disk, which is what a redeploy does.
  const script = `
    process.env.DATA_DIR = ${JSON.stringify(tmpDir)};
    const store = require(${JSON.stringify(path.join(__dirname, '..', 'lib', 'store.js'))});
    process.stdout.write(JSON.stringify({
      titles: store.listJobs({}).map((job) => job.title),
      applicants: store.countApplications(1),
      storage: store.getStorageInfo()
    }));
  `;
  const out = JSON.parse(execFileSync(process.execPath, ['-e', script], { encoding: 'utf8' }));

  assert.ok(
    out.titles.includes('Durability Probe Driver'),
    'job posted before restart should still be listed'
  );
  assert.equal(out.applicants, 1, 'application submitted before restart should still be stored');
  assert.equal(out.storage.writable, true);
});
