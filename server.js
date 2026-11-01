'use strict';

const path = require('node:path');
const express = require('express');
const store = require('./lib/store');
const { metaFor, jobCategories } = require('./lib/categories');
const { formatSalary, timeAgo, initials } = require('./lib/format');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

app.locals.formatSalary = formatSalary;
app.locals.timeAgo = timeAgo;
app.locals.initials = initials;
app.locals.types = store.jobTypes;
app.locals.workModes = store.workModes;
app.locals.experienceLevels = store.experienceLevels;
app.locals.experienceOptions = store.experienceOptions;
app.locals.qualifications = store.qualifications;
app.locals.jobCategories = jobCategories;
app.locals.categoryMeta = metaFor;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+()\d][\d\s()-]{6,19}$/;

function text(value, max) {
  const cleaned = String(value == null ? '' : value).trim();
  return cleaned.slice(0, max);
}

function listFromLines(value, maxItems = 10) {
  return String(value || '')
    .split(/\r?\n/)
    .map((line) => text(line, 220))
    .filter(Boolean)
    .slice(0, maxItems);
}

function listFromCsv(value, maxItems = 12) {
  return String(value || '')
    .split(',')
    .map((item) => text(item, 40))
    .filter(Boolean)
    .slice(0, maxItems);
}

function toAmount(value) {
  const digits = String(value == null ? '' : value).replace(/[^\d]/g, '');
  if (!digits) return null;
  const amount = Number(digits);
  return Number.isSafeInteger(amount) ? amount : null;
}

function validateApplication(body) {
  const errors = {};
  const data = {
    name: text(body.name, 120),
    email: text(body.email, 160),
    phone: text(body.phone, 24),
    portfolio: text(body.portfolio, 200),
    coverLetter: text(body.coverLetter, 3000)
  };

  if (data.name.length < 2) errors.name = 'Please enter your full name.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = 'Please enter a valid phone number.';
  if (data.portfolio && !/^https?:\/\/\S+$/i.test(data.portfolio)) {
    errors.portfolio = 'Portfolio link must start with http:// or https://';
  }
  if (data.coverLetter.length < 20) {
    errors.coverLetter = 'Please write at least 20 characters so the employer knows why you fit.';
  }

  return { data, errors };
}

function validateJob(body) {
  const errors = {};
  const data = {
    title: text(body.title, 120),
    company: text(body.company, 90),
    location: text(body.location, 90),
    city: text(body.city, 60),
    category: text(body.category, 60),
    type: text(body.type, 30),
    workMode: text(body.workMode, 20),
    experience: text(body.experience, 40) || 'Fresher',
    qualification: text(body.qualification, 40) || '10th Pass',
    salaryMin: toAmount(body.salaryMin),
    salaryMax: toAmount(body.salaryMax),
    salaryPeriod: body.salaryPeriod === 'month' ? 'month' : 'year',
    description: text(body.description, 4000),
    responsibilities: listFromLines(body.responsibilities),
    requirements: listFromLines(body.requirements),
    skills: listFromCsv(body.skills),
    contactEmail: text(body.contactEmail, 160)
  };

  if (data.title.length < 3) errors.title = 'Job title is required (at least 3 characters).';
  if (data.company.length < 2) errors.company = 'Company name is required.';
  if (data.location.length < 2) errors.location = 'Location is required.';
  if (data.city && data.city.length < 2) errors.city = 'Enter a valid city.';
  if (!data.city) data.city = store.cityFromLocation(data.location);
  if (data.category.length < 2) errors.category = 'Category is required.';
  if (!store.jobTypes.includes(data.type)) errors.type = 'Choose a valid job type.';
  if (!store.workModes.includes(data.workMode)) errors.workMode = 'Choose a valid work mode.';
  if (!store.experienceOptions.includes(data.experience)) {
    errors.experience = 'Choose the experience you need.';
  }
  if (!store.qualifications.includes(data.qualification)) {
    errors.qualification = 'Choose a valid qualification.';
  }
  if (data.description.length < 40) {
    errors.description = 'Please describe the role in at least 40 characters.';
  }
  if (!EMAIL_RE.test(data.contactEmail)) errors.contactEmail = 'A valid contact email is required.';
  if (data.salaryMin && data.salaryMax && data.salaryMax < data.salaryMin) {
    errors.salaryMax = 'Maximum salary cannot be lower than the minimum.';
  }

  return { data, errors };
}

// ---------------------------------------------------------------- pages

app.get('/', (req, res) => {
  const filters = {
    q: text(req.query.q, 80),
    city: text(req.query.city, 60),
    location: text(req.query.location, 90),
    category: text(req.query.category, 60),
    type: text(req.query.type, 30),
    workMode: text(req.query.workMode, 20),
    experience: text(req.query.experience, 20)
  };
  const jobs = store.listJobs(filters);
  const hasFilters = Boolean(
    filters.q ||
      filters.city ||
      filters.location ||
      filters.category ||
      filters.type ||
      filters.workMode ||
      filters.experience
  );

  res.render('index', {
    title: hasFilters
      ? `${jobs.length} job${jobs.length === 1 ? '' : 's'} found`
      : 'Find jobs near you',
    activeNav: 'jobs',
    jobs,
    filters,
    hasFilters,
    categoryTiles: store.getCategoryTiles(),
    cities: store.getCities(),
    categories: store.getCategories(),
    locations: store.getLocations(),
    stats: store.getStats()
  });
});

app.get('/jobs/:id', (req, res, next) => {
  const job = store.getJob(req.params.id);
  if (!job || (job.status && job.status !== 'published')) {
    return next();
  }
  res.render('job', {
    title: job.title,
    activeNav: 'jobs',
    job,
    applied: req.query.applied === '1',
    posted: req.query.posted === '1',
    applicants: store.countApplications(job.id),
    errors: {},
    values: {}
  });
});

app.post('/jobs/:id/apply', (req, res, next) => {
  const job = store.getJob(req.params.id);
  if (!job || (job.status && job.status !== 'published')) return next();

  const { data, errors } = validateApplication(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).render('job', {
      title: job.title,
      activeNav: 'jobs',
      job,
      applied: false,
      posted: false,
      applicants: store.countApplications(job.id),
      errors,
      values: data
    });
  }

  store.createApplication(job.id, data);
  return res.redirect(`/jobs/${job.id}?applied=1#apply`);
});

app.get('/post', (req, res) => {
  res.render('post', {
    title: 'Post a job',
    activeNav: 'post',
    cities: store.getCities(),
    errors: {},
    values: {
      type: 'Full-time',
      workMode: 'On-site',
      experience: 'Fresher',
      qualification: '10th Pass',
      salaryPeriod: 'month'
    },
    done: false
  });
});

app.post('/post', (req, res) => {
  const { data, errors } = validateJob(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).render('post', {
      title: 'Post a job',
      activeNav: 'post',
      cities: store.getCities(),
      errors,
      values: {
        ...data,
        responsibilities: String(req.body.responsibilities || ''),
        requirements: String(req.body.requirements || ''),
        skills: (data.skills || []).join(', ')
      },
      done: false
    });
  }

  const job = store.createJob(data);
  return res.redirect(`/jobs/${job.id}?posted=1`);
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    activeNav: 'about',
    stats: store.getStats()
  });
});

// ----------------------------------------------------------------- api

app.get('/api/jobs', (req, res) => {
  const jobs = store.listJobs({
    q: text(req.query.q, 80),
    city: text(req.query.city, 60),
    location: text(req.query.location, 90),
    category: text(req.query.category, 60),
    type: text(req.query.type, 30),
    workMode: text(req.query.workMode, 20),
    experience: text(req.query.experience, 20)
  });
  res.json({ count: jobs.length, jobs });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    jobs: store.getStats().jobs,
    uptime: Math.round(process.uptime()),
    // Surfaced so a volume that is not writable is visible instead of
    // silently degrading to in-memory storage.
    storage: store.getStorageInfo()
  });
});

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page not found', activeNav: '' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled request error:', err.message);
  res.status(500).render('404', { title: 'Something went wrong', activeNav: '' });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Karmaadhar Jobs listening on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;
