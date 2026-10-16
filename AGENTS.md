# Games Hub — Base44 Dev Environment

## Overview
Vite + React + Phaser 3 single-page app (no backend, no database).

## Running
- `docker compose -f docker-compose.base44.yml up -d --build`
- App listens on container port 5173, mapped to host port 3000.
- No lockfile exists; `npm install` runs on container startup.

## Health
- Vite dev server serves `/` — healthcheck probes `http://localhost:5173/`.

## Notes
- No external credentials or secrets required.
- Vite 5.4 does not support `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` (added in Vite 6.1).
  `vite.config.js` conditionally adds `server.allowedHosts` with `.${BASE44_SANDBOX_HOST_DOMAIN}`
  when `BASE44_PREVIEW_MODE === '1'`, so the preview proxy host is accepted.
