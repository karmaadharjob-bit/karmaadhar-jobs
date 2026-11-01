'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
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
  title: 'Warehouse Supervisor',
  company: 'Sunrise Retail',
  location: 'Nagpur, Maharashtra',
  category: 'Logistics',
  type: 'Full-time',
  workMode: 'On-site',
  experience: '3–5 years',
  contactEmail: 'hiring@sunriseretail.example',
  description:
    'Supervise inbound and outbound warehouse operations for our central distribution centre.',
  responsibilities: 'Plan daily shifts\nTrack inventory accuracy',
  requirements: '3+ years in warehouse operations\nComfort with WMS software',
  skills: 'Inventory, WMS, Team Leadership',
  salaryMin: '450000',
  salaryMax: '600000',
  salaryPeriod: 'year'
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

test('home page lists seeded jobs', async () => {
  const res = await fetch(`${base}/`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /Karmaadhar/);
  assert.match(html, /Senior Frontend Engineer/);
  assert.match(html, /Staff Nurse/);
  assert.match(html, /Latest openings/);
});

test('category filter narrows results', async () => {
  const res = await fetch(`${base}/?category=Healthcare`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /Staff Nurse/);
  assert.doesNotMatch(html, /Senior Frontend Engineer/);
});

test('keyword search matches title and skill text', async () => {
  const byTitle = await (await fetch(`${base}/?q=nurse`)).text();
  assert.match(byTitle, /Staff Nurse/);
  assert.doesNotMatch(byTitle, /Operations Associate/);

  const bySkill = await (await fetch(`${base}/?q=tally`)).text();
  assert.match(bySkill, /Accounts Executive/);
});

test('work mode filter returns only remote roles', async () => {
  const html = await (await fetch(`${base}/?workMode=Remote`)).text();
  assert.match(html, /Digital Marketing Manager/);
  assert.doesNotMatch(html, /Operations Associate/);
});

test('search with no matches renders an empty state', async () => {
  const res = await fetch(`${base}/?q=zzzznotarealskill`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /No roles match that search/);
});

test('job detail page renders the full brief', async () => {
  const res = await fetch(`${base}/jobs/1`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /Senior Frontend Engineer/);
  assert.match(html, /About the role/);
  assert.match(html, /What we are looking for/);
  assert.match(html, /Apply for this role/);
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
    coverLetter: 'I have three years of dispatch coordination experience and know the Pune network well.'
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
  assert.match(detail, /Warehouse Supervisor/);
  assert.match(detail, /Your job is live/);

  const home = await (await fetch(`${base}/?category=Logistics`)).text();
  assert.match(home, /Warehouse Supervisor/);

  const stored = readDb().jobs.find((job) => job.id === newId);
  assert.equal(stored.company, 'Sunrise Retail');
  assert.deepEqual(stored.skills, ['Inventory', 'WMS', 'Team Leadership']);
  assert.equal(stored.salaryMin, 450000);
});

test('job posting validation rejects incomplete listings', async () => {
  const res = await postForm(`${base}/post`, {
    ...validJob,
    title: '',
    description: 'short',
    type: 'Freelance',
    contactEmail: 'nope'
  });
  assert.equal(res.status, 400);
  const html = await res.text();
  assert.match(html, /Job title is required/);
  assert.match(html, /at least 40 characters/);
  assert.match(html, /Choose a valid job type/);
  assert.match(html, /A valid contact email is required/);
});

test('salary range is validated', async () => {
  const res = await postForm(`${base}/post`, { ...validJob, salaryMin: '900000', salaryMax: '100000' });
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
  const res = await fetch(`${base}/api/jobs?type=Internship`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /application\/json/);
  const body = await res.json();
  assert.ok(body.count >= 1);
  for (const job of body.jobs) {
    assert.equal(job.type, 'Internship');
  }
});

test('health endpoint reports ok', async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.status, 'ok');
  assert.ok(body.jobs > 10);
});
