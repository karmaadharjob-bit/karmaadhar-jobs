# Karmaadhar Jobs

A server-rendered job board for the Karmaadhar network: browse openings, search and
filter by location/category, read a full job brief, apply in-page, and publish new
listings from an employer form.

## Stack

- Node.js 24 LTS + Express 4 + EJS templates (no build step, no client framework)
- JSON file store (`data/db.json`, override with `DATA_DIR`) seeded with 12 sample
  listings on first boot — no external database or native modules
- Plain CSS design system in `public/styles.css`

## Pages and routes

| Route | Purpose |
| --- | --- |
| `GET /` | Hero, keyword search, location/category/work-mode/type filters, job cards |
| `GET /jobs/:id` | Full job brief plus the apply form |
| `POST /jobs/:id/apply` | Validates and stores an application |
| `GET /post`, `POST /post` | Employer listing form with validation |
| `GET /about` | How the board works, for candidates and employers |
| `GET /api/jobs` | JSON listing for the same filters (`?q=&location=&category=&type=&workMode=`) |
| `GET /api/health` | Health probe used by the container healthcheck |

## Local development

```bash
npm install
npm start          # http://localhost:3000
npm test           # node --test test/
```

## Docker

```bash
docker build -t karmaadhar-jobs .
docker run -p 3000:3000 karmaadhar-jobs
```

The image patches Alpine packages, runs as the non-root `node` user, and keeps the
data file in `/app/data` (set `DATA_DIR` to relocate it).

## Notes

- Applications and new listings are written to the JSON store. Without a mounted
  persistent volume they live in the container filesystem and reset on redeploy.
- All user-supplied values are HTML-escaped by EJS (`<%= %>`) before rendering.
- The dependency tree is pinned by `package-lock.json`.

## Tests

`test/app.test.js` covers listing/search/filter behaviour, job detail rendering, 404s,
application validation and persistence, employer posting validation, HTML escaping of
user input, the JSON API and the health endpoint (15 tests).
