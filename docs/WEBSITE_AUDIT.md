# ThreadPlay Website Audit

## Executive assessment

ThreadPlay already has the difficult product layer: game runtimes, a fake-X API, scenario execution, timeline rendering, generated media, run history, and a catalog spanning naval games, chess, sports, classic boards, and companion mechanics.

The public website must communicate the category rather than look like an internal simulator console.

## Position

> **The timeline’s first gaming layer.**

This is ThreadPlay's brand thesis and should be treated as positioning language until independently substantiated as a market-history claim.

### Experience principles

| Principle | Product meaning | Interface behavior |
|---|---|---|
| **Passive** | Games unfold over minutes, hours, or days. | State persists without demanding a live session. |
| **Complementary** | Play adds to the host timeline rather than replacing it. | Normal posts and replies remain the interaction model. |
| **Frictionless** | The timeline acts as lobby, controller, broadcast, and record. | Mentions begin games; replies advance them. |

## Audiences

1. Players and spectators.
2. Game developers and studios.
3. Creators, communities, and distribution partners.
4. Platforms and infrastructure partners.

## Current ecosystem represented by the site

1. Battle Dinghy
2. Battle Chess Arena
3. ThreadChess
4. ThreadBookie
5. Baseball Stars
6. The Straits
7. Connect 4
8. Checkers
9. Chinese Checkers
10. Future partner-built experiences

## Design direction

The implemented website uses:

- asymmetric editorial composition,
- off-white and near-black foundations,
- one chartreuse signal color,
- system fonts with no external dependency,
- timeline-native game demonstrations,
- dense ecosystem rows instead of generic card grids,
- a direct partnership narrative.

It avoids default AI-site patterns such as purple gradients, centered SaaS heroes, interchangeable three-card feature sections, and decorative glass effects.

## Information architecture

1. Category-defining hero.
2. Passive / Complementary / Frictionless principles.
3. Timeline-native interaction proof.
4. Complete ecosystem index.
5. Challenge → reply → leave → return interaction model.
6. Partnership and development invitation.

## Product claims requiring launch review

- Approve use of “first” as a public brand claim.
- Confirm which game labels should read live, simulator-ready, pre-launch, or in development.
- Decide whether partnership intake should remain email-based or use a structured form.
- Add production gameplay captures when representative deployed scenarios are available.
- Add analytics and social metadata after the canonical Railway domain is active.

## Accessibility and resilience

- Semantic section hierarchy.
- Responsive layouts for desktop and mobile.
- High-contrast black, white, and chartreuse palette.
- No runtime JavaScript dependency.
- No external font, image, or analytics dependency.
- Nginx health check at `/health`.
