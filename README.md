# ThreadPlay.co

Public website for **ThreadPlay**, the first native timeline gaming ecosystem.

ThreadPlay games are designed to be:

- **Passive** — play over minutes, hours, or days.
- **Complementary** — add play to the timeline rather than pulling people away.
- **Frictionless** — challenge with a mention and move with a reply.

## Ecosystem

Battle Dinghy, Battle Chess Arena, ThreadChess, ThreadBookie, Baseball Stars, The Straits, Connect 4, Checkers, Chinese Checkers, and future partner-built timeline-native games.

## Architecture

This is a dependency-free static website served by Nginx in a small Docker container.

- `index.html` — complete public website
- `Dockerfile` — production container
- `nginx.conf` — static hosting, SPA fallback, gzip, and health endpoint
- `railway.json` / `railway.toml` — Railway deployment configuration
- `/health` — deployment health check

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Railway

Create or connect a Railway service to this repository. Railway will detect the Dockerfile configuration and serve the application on port `8080`.

Custom domains:

- `threadplay.co`
- `www.threadplay.co`

Contact: `justin@threadplay.co`
