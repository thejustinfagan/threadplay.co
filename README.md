# ThreadPlay.co

Public website for **ThreadPlay**, the first native timeline gaming ecosystem.

ThreadPlay games are designed to be:

- **Passive** — play over minutes, hours, or days.
- **Complementary** — add play to the timeline rather than pulling people away.
- **Frictionless** — challenge with a mention and move with a reply.

## Ecosystem

Battle Dinghy, Battle Chess Arena, ThreadChess, ThreadBookie, Baseball Stars, The Straits, Connect 4, Checkers, Chinese Checkers, and future partner-built timeline-native games.

## Visual language

The public site uses an original ThreadPlay identity built around:

- A monochrome **TP spool mark**
- Flowing thread and strand dividers
- Black, off-white, graphite, and one restrained electric-blue accent
- Timeline-emulator compositions that keep the product experience central
- Lightweight inline SVG and CSS rather than stock imagery or external design dependencies

The spool and strand system is inspired by the physical language of threads, connection, continuity, and public conversation. The existing ThreadPlay positioning and product copy remain the primary message.

## Architecture

The deployed Railway service is a dependency-free static website served by Nginx in a small Docker container.

- `index.html` — complete public website and inline visual assets
- `Dockerfile` — production container
- `nginx.conf` — static hosting, SPA fallback, gzip, and health endpoint
- `railway.json` / `railway.toml` — Railway deployment configuration
- `/health` — deployment health check

The `app/` folder is an experimental Next.js scaffold and is not used by the current Dockerfile deployment.

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
