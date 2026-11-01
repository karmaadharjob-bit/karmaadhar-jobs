'use strict';

const fs = require('node:fs');
const path = require('node:path');
const seedJobs = require('./seed');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const workModes = ['On-site', 'Hybrid', 'Remote'];

let db = null;

function buildFreshDatabase() {
  const jobs = seedJobs();
  const highestId = jobs.reduce((max, job) => Math.max(max, job.id), 0);
  return {
    jobs,
    applications: [],
    nextJobId: highestId + 1,
    nextApplicationId: 1
  };
}

// Tracks whether DATA_DIR is genuinely writable. A mounted volume that the
// runtime user cannot write to would otherwise fail silently: the app would
// serve seeds from memory and look healthy while losing every new record.
const storage = {
  probed: false,
  writable: null,
  lastError: null,
  lastWriteAt: null
};

function recordWriteFailure(err) {
  storage.writable = false;
  storage.lastError = err.message;
}

function persist() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const tmp = `${DB_FILE}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
    fs.renameSync(tmp, DB_FILE);
    storage.writable = true;
    storage.lastError = null;
    storage.lastWriteAt = new Date().toISOString();
    return true;
  } catch (err) {
    recordWriteFailure(err);
    console.warn(
      `[store] Could not write ${DB_FILE} (${err.message}); continuing with in-memory data only.`
    );
    return false;
  }
}

function probeWritable() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const probeFile = path.join(DATA_DIR, `.write-probe-${process.pid}`);
    fs.writeFileSync(probeFile, 'ok');
    fs.unlinkSync(probeFile);
    storage.writable = true;
    storage.lastError = null;
  } catch (err) {
    recordWriteFailure(err);
    console.warn(
      `[store] DATA_DIR ${DATA_DIR} is not writable (${err.message}); jobs and applications ` +
        'will be kept in memory and lost on restart.'
    );
  }
  storage.probed = true;
  return storage.writable;
}

function load() {
  if (db) return db;
  if (!storage.probed) probeWritable();
  try {
    const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    if (!Array.isArray(parsed.jobs) || !Array.isArray(parsed.applications)) {
      throw new Error('Unexpected database shape');
    }
    db = {
      jobs: parsed.jobs,
      applications: parsed.applications,
      nextJobId: parsed.nextJobId || parsed.jobs.length + 1,
      nextApplicationId: parsed.nextApplicationId || parsed.applications.length + 1
    };
  } catch (err) {
    db = buildFreshDatabase();
    persist();
  }
  return db;
}

function normalize(value) {
  return String(value == null ? '' : value).trim().toLowerCase();
}

function publishedJobs() {
  return load()
    .jobs.filter((job) => (job.status || 'published') === 'published')
    .slice()
    .sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
}

function matchesQuery(job, q) {
  if (!q) return true;
  const haystack = [
    job.title,
    job.company,
    job.location,
    job.category,
    job.description,
    (job.skills || []).join(' ')
  ]
    .map(normalize)
    .join(' ');
  return q
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(normalize(term)));
}

/**
 * @param {{q?: string, location?: string, category?: string, type?: string, workMode?: string}} filters
 */
function listJobs(filters = {}) {
  const { q = '', location = '', category = '', type = '', workMode = '' } = filters;
  return publishedJobs().filter((job) => {
    if (!matchesQuery(job, String(q).trim())) return false;
    if (location && normalize(job.location) !== normalize(location)) return false;
    if (category && normalize(job.category) !== normalize(category)) return false;
    if (type && normalize(job.type) !== normalize(type)) return false;
    if (workMode && normalize(job.workMode) !== normalize(workMode)) return false;
    return true;
  });
}

function getJob(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) return null;
  return load().jobs.find((job) => job.id === numericId) || null;
}

function createJob(input) {
  const data = load();
  const job = {
    id: data.nextJobId,
    title: input.title,
    company: input.company,
    companySize: input.companySize || '',
    location: input.location,
    workMode: input.workMode || 'On-site',
    category: input.category,
    type: input.type,
    experience: input.experience || 'Not specified',
    salaryMin: input.salaryMin || null,
    salaryMax: input.salaryMax || null,
    salaryPeriod: input.salaryPeriod || 'year',
    currency: 'INR',
    description: input.description,
    responsibilities: input.responsibilities || [],
    requirements: input.requirements || [],
    skills: input.skills || [],
    postedAt: new Date().toISOString(),
    contactEmail: input.contactEmail,
    status: 'published'
  };
  data.jobs.push(job);
  data.nextJobId += 1;
  persist();
  return job;
}

function createApplication(jobId, input) {
  const data = load();
  const application = {
    id: data.nextApplicationId,
    jobId: Number(jobId),
    name: input.name,
    email: input.email,
    phone: input.phone || '',
    portfolio: input.portfolio || '',
    coverLetter: input.coverLetter || '',
    createdAt: new Date().toISOString()
  };
  data.applications.push(application);
  data.nextApplicationId += 1;
  persist();
  return application;
}

function countApplications(jobId) {
  return load().applications.filter((application) => application.jobId === Number(jobId)).length;
}

function getCategories() {
  return [...new Set(publishedJobs().map((job) => job.category))].sort();
}

function getLocations() {
  return [...new Set(publishedJobs().map((job) => job.location))].sort();
}

function getStats() {
  const jobs = publishedJobs();
  return {
    jobs: jobs.length,
    companies: new Set(jobs.map((job) => job.company)).size,
    categories: new Set(jobs.map((job) => job.category)).size,
    applications: load().applications.length
  };
}

function getStorageInfo() {
  load();
  return {
    path: DB_FILE,
    mode: storage.writable ? 'file' : 'memory',
    writable: Boolean(storage.writable),
    lastWriteAt: storage.lastWriteAt,
    error: storage.lastError
  };
}

module.exports = {
  jobTypes,
  workModes,
  getStorageInfo,
  listJobs,
  getJob,
  createJob,
  createApplication,
  countApplications,
  getCategories,
  getLocations,
  getStats,
  __dbFile: DB_FILE
};
