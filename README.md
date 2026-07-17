# ThreadPlay.co — Cinematic Timeline-Native Experience

The public ThreadPlay website is a dependency-free, single-page experience built for Railway/Nginx.

## Experience architecture

- Custom **WebGL2 fragment shader** backdrop with pointer and scroll uniforms
- Progressive CSS scroll-driven animation enhancements
- Sticky, scroll-controlled simulation chapters
- Source-faithful **Battle Dinghy WinnerBot** move sweep (`A1` through `D4`)
- Exact **57-move Battle Chess Arena** sequence from `battle_chess_4p_complete.yaml`
- Dynamic 4×4 fleet board and 9×9 arena move map
- Reduced-motion and no-WebGL fallbacks
- No framework, external font, stock-image or runtime dependency

## Source provenance

The simulation sequences are based on the connected private repository `thejustinfagan/threadplay-simulator`:

- `apps/bot_runner/strategies/game_bots/winner.py`
- `scenarios/battle_dinghy/battle_chess_4p_complete.yaml`

The Battle Dinghy board is a deterministic visualization driven by the exact WinnerBot sweep sequence. The Battle Chess experience replays the exact actor/from/to transcript as a move map.

## Files

- `index.html` — semantic page structure
- `styles.css` — visual system, responsive layout and scroll-driven enhancements
- `app.js` — WebGL shader, replay engines and dynamic boards
- `Dockerfile` — Nginx production image
- `nginx.conf` — static hosting and `/health`
- `railway.json` / `railway.toml` — Railway deployment configuration

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.
