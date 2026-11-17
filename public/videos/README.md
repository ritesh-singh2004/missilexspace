# Hero & showcase video assets

**Currently shipped:** `rocket-launch.mp4` — OpenRocket design walkthrough (22.5s, 1916×458, ~10.2MB), used by the `/rockets` *Design & Simulation* section through `lib/hero-video.ts`. It plays poster-first with native controls (`VideoHero interactive`), so no audio or resolution variants are required.

Drop launch footage here using these exact filenames — `VideoHero` (`components/hero/VideoHero.tsx`) and `lib/hero-video.ts` already reference them, and the hero falls back to the existing static image automatically until the files exist.

| File | Used for | Target |
|---|---|---|
| `rocket-launch-4k.mp4` | Desktop (`min-width: 1024px`) | 3840×2160, H.264, ~15–25 Mbps |
| `rocket-launch-1080p.mp4` | Tablet (`min-width: 640px`) | 1920×1080, H.264, ~8–12 Mbps |
| `rocket-launch-720p.mp4` | Mobile (default) | 1280×720, H.264, ~4–6 Mbps |

Requirements:
- MP4 container, H.264 video, no audio track needed (the hero plays muted).
- 15–30s loop, no hard cuts at the loop point — ignition through liftoff and camera tracking reads best.
- Keep each file under ~15MB where possible; re-encode with a lower CRF/bitrate before uploading a raw export.
- 16:9 source cropped/cover-fit at render time — avoid letterboxing baked into the file.

To add a second video (e.g. a mission-showcase clip elsewhere on the site), add a new `VideoSource[]` array in `lib/hero-video.ts` and pass it into another `<VideoHero />` instance — the component is reusable, not hero-specific.
