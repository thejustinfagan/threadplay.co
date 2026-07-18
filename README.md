# ThreadPlay.co

Public website for **ThreadPlay**, the native gaming layer for the public timeline.

## Category position

ThreadPlay is designed around three product principles:

- **Passive** — a turn takes seconds while a game can persist for minutes, hours, or days.
- **Complementary** — play adds stakes and spectatorship without replacing the public timeline.
- **Frictionless** — a mention begins the interaction, a reply advances it, and the arbiter preserves rules and state.

## Current experience

The public site is an immersive, dependency-free single-page experience served by Nginx. It intentionally avoids the conventional white editorial landing-page treatment.

The page includes:

- A custom WebGL2 thread-field shader reacting to pointer position and document scroll
- The approved black-thread spool identity with restrained electric-blue signal accents
- A dense full-viewport hero built from real product proof, brand material, board state, and live telemetry
- The supplied public **Battle Dinghy Game #151** as a dominant proof point
- A visual input → arbiter → public-output interaction model
- A sticky, scroll-controlled Battle Dinghy replay with no dead scroll area
- A dynamic 4×4 fleet board, public thread, hit/miss telemetry, fleet damage, and final receipt
- A source-faithful emulator capture archive
- An interactive 9×9 four-player Battle Chess Arena demonstration
- A connected ecosystem map for current games and partner-built experiences
- Responsive desktop and mobile compositions
- Reduced-motion, keyboard, semantic, and no-WebGL fallbacks

## Brand assets

- `assets/brand/threadplay-visual-system.svg` — flowing black thread, TP spool, and restrained blue signal treatment derived from the supplied identity board
- `assets/threadplay-mark.svg` — transparent spool mark with subtle blue thread signals
- `assets/thread-field.svg` — reusable black-thread field with optional blue active-state strands

## Simulator provenance

### Battle Dinghy

The replay follows the current `WinnerBot` move order from `thejustinfagan/threadplay-simulator`:

`A1, A2, A3, A4, B1, B2, B3, B4, C1, C2, C3, C4, D1, D2, D3, D4`

The page converts that real move contract into a deterministic public visualization. The exact private opponent fleet is not represented as a captured production game.

The hero and capture archive also use `assets/captures/battle-dinghy-game151.svg`, a source-faithful reconstruction of the supplied public Game #151 screenshot. It preserves the visible players, shared 5×5 grid, hit/miss state, last-shot marker, full-fleet status, and public turn context.

The native Battle Dinghy renderer source was audited in `thejustinfagan/Battle_Dinghy`, including `multiplayer_image.py`, `image_generator.py`, and `combat_radar_image.py`, so the public asset follows the production board language rather than generic game-board styling.

### Battle Chess Arena

The browser demonstration reflects the current simulator scenario shape:

- Four players
- 9×9 board
- Balanced deterministic bot policy
- Seed `20260617`
- First ring collapse after turn 32
- Later collapse cadence based on active players

### Capture archive

The branch includes source-faithful emulator renders for:

- Battle Dinghy
- ThreadChess
- ThreadBookie
- Baseball Stars
- The Straits

Game #151 is identified as reconstructed from the supplied public capture. The remaining pieces are explicitly presented as emulator-derived renders rather than live X screenshots.

## Deployment

Railway builds the existing Dockerfile and serves the site on port `8080`. The health endpoint remains `/health`.

Contact: `justin@threadplay.co`
