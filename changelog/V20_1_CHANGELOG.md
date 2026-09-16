# NON X V20.1 — HERO VIDEO RESTORE

- Restored the cinematic homepage hero video.
- NX-001 now explicitly references the existing `heavy-hoodie-video.mp4` as `heroMedia`, so the Drop 001 cinematic hero continues to autoplay muted/loop.
- Added a defensive fallback in `initDropHero()` to the same cinematic video if a future product is missing `heroMedia`.
- The native 360° product video remains separate and unchanged.
