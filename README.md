# ThreadPlay.co

Public website for **ThreadPlay**, the native gaming layer for the public timeline.

ThreadPlay games are designed to be:

- **Passive** — a turn takes seconds while a game can unfold over minutes, hours, or days.
- **Complementary** — the game adds stakes and spectatorship without replacing the timeline.
- **Frictionless** — a mention starts the game, a reply advances it, and the arbiter manages state.

## Experience

The site is a dependency-free, cinematic single-page experience served by Nginx. It includes:

- A custom WebGL2 thread-field shader with static fallback
- A scroll-controlled Battle Dinghy replay
- A dynamic 4×4 Battle Dinghy board and public thread
- A deterministic Battle Chess Arena demonstration
- Five source-faithful ThreadPlay emulator captures
- A complete ecosystem inventory and partnership invitation
- Responsive layouts, keyboard focus treatment, semantic landmarks, and reduced-motion support

## Simulator provenance

### Battle Dinghy

The scroll replay follows the current `WinnerBot` coordinate contract in `threadplay-simulator`:

`A1, A2, A3, A4, B1, B2, B3, B4, C1, C2, C3, C4, D1, D2, D3, D4`

The board visualization is deterministic and clearly labeled as a simulator-driven replay.

### Battle Chess Arena

The arena uses the current scenario configuration:

- 4 players
- 9×9 board
- balanced deterministic bot policy
- seed `20260617`
- first collapse after 32 turns
- subsequent collapse cadence based on active players

The browser sequence was generated from the same policy shape and fixed seed for the public demonstration.

### Capture archive

The capture archive contains source-faithful local emulator renders for:

- Battle Dinghy
- ThreadChess
- ThreadBookie
- Baseball Stars
- The Straits

They use the simulator’s X-native composition, scenario contracts, board conventions, and fidelity labels. They are intentionally described as emulator renders, not live X screenshots.

## Ecosystem represented

Battle Dinghy, Battle Chess Arena, ThreadChess, ThreadBookie, Baseball Stars, The Straits, Connect 4, Checkers, Chinese Checkers, State Street Live, and future partner-built timeline-native experiences.

## Files

- `index.html` — page structure and content
- `styles.css` — CSS module entry point
- `css/*.css` — foundation, experience, ecosystem, motion, and responsive layers
- `app.js` — JavaScript module entry point
- `js/*.js` — shader, site behavior, Battle Dinghy replay, and Battle Chess demo
- `assets/threadplay-mark.svg` — ThreadPlay identity
- `assets/captures/*.svg` — self-contained emulator capture assets
- `Dockerfile` — Railway/Nginx production image
- `nginx.conf` — static hosting and health endpoint

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deployment

Railway builds the existing Dockerfile and serves the site on port `8080`. The health endpoint remains `/health`.

Contact: `justin@threadplay.co`
