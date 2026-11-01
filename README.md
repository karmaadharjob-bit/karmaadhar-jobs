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
| `GET /api/health` | Health probe used by the container healthcheck; also reports storage status |

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

## Storage and durability

Applications and new listings are written to `DATA_DIR/db.json` with an atomic
temp-file-plus-rename write. Deployments mount a persistent volume at `/app/data`,
so listings and applications survive redeploys.

`GET /api/health` reports the store's real state:

```json
{ "status": "ok", "jobs": 12, "uptime": 42,
  "storage": { "path": "/app/data/db.json", "mode": "file", "writable": true,
               "lastWriteAt": "2026-11-01T14:20:00.000Z", "error": null } }
```

If the volume is not writable the store falls back to memory, and `storage.mode`
reports `memory` with the underlying error instead of failing silently — that was a
real risk here, because the process runs as the non-root `node` user.

## Notes

- All user-supplied values are HTML-escaped by EJS (`<%= %>`) before rendering.
- The dependency tree is pinned by `package-lock.json`.

## Tests

`test/app.test.js` covers listing/search/filter behaviour, job detail rendering, 404s,
application validation and persistence, employer posting validation, HTML escaping of
user input, the JSON API, health/storage reporting, and survival of posted data across
a fresh process start (18 tests).
