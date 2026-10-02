# Stage 3 — the Bangla vertical Short (1080×1920, ≤ 60s)

The Short is cut from the long-form: same voice lines (no new TTS), same look, re-laid-out for a
phone held upright. Build it after the long-form passes its checks.

## 1 · Pick the beats (≤ 60s of voice)

4–6 long-form frames whose lines stand on their own, in order:

1. the cold open (HOST, the hype) — the hook in the first 2 seconds
2. the freeze (silent, record scratch)
3. the real numbers (CHECKER, the thesis)
4. one proof beat — the single most visual chart/shelf/comparison frame
5. the verdict (CHECKER) — optional if time allows

Add up the long-form durations (the freeze is 1.4s); drop a beat if the total passes ~55s
(leave room for a 2.5s end card). Skip frames whose line depends on a previous one ("Also…",
"So what do you do?").

## 2 · Scaffold + seed

```
SKILL=.claude/skills/new-post
FE=~/.agents/skills/faceless-explainer/scripts
node $SKILL/scripts/new-video-project.mjs --dir videos/<slug>-short --format 1080x1920
node $SKILL/scripts/short-from-long.mjs --long videos/<slug> --short videos/<slug>-short --frames 1,2,3,<proof>,<verdict>
```

`short-from-long` copies the chosen wavs + aligned words (renumbered 01..N), writes the Short's
audio_meta, `SCRIPT.md` and `.hyperframes/short-map.json` (short frame → long frame).
Copy `$SKILL/assets/series/video-direction.md` to `.hyperframes/`.

## 3 · Storyboard

`STORYBOARD.md` with `format: 1080x1920`, one block per short frame (same `speaker`, voiceover and
duration as its long-form frame; `src: compositions/frames/NN-<name>.html`), plus a final silent
end card (`duration: 2.5s`): "পুরো ভিডিও চ্যানেলে" + "saidulbadhon.com". All transitions `cut`.
`sfx-cues.json`: the long-form cues for the chosen frames, renumbered (times unchanged), plus a
`chime` on the end card. Then `sync-durations`.

## 4 · Frames — re-lay the long-form frames vertically

Port each frame from its long-form HTML (`videos/<slug>/compositions/frames/<long id>.html`) with
Sonnet workers (≤ 5 at a time). Worker brief, on top of the long-form template:

- Canvas 1080×1920. Same copy, same props, same motion, **same timeline times** (the voice is
  identical), new layout: stack vertically, hero high (y ≈ 0.2–0.4 of the height), type larger with
  fewer words per line, the paused-tape chrome kept at the top.
- **Shorts safe zone:** keep all text and key visuals inside x 60–900, y 220–1500 — YouTube's
  Shorts UI covers the right edge (buttons) and the bottom ~20% (title, channel).
- New ids per file are fine (separate project); keep `visibility` handling as `"inherit"`.

## 5 · Assemble, check, render

Same as the long-form § 6–8 (mix cues → assemble → transitions → mix bed → check → contact sheet).
Check-in ② before rendering: `--output renders/<slug>-short-bn.mp4`.
