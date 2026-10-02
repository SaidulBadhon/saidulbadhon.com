# Stage 2 — the Bangla long-form video (1920×1080)

The build is the HyperFrames faceless-explainer pipeline with the series kit on top. Paths:

```
SKILL=.claude/skills/new-post
FE=~/.agents/skills/faceless-explainer/scripts      # assemble-index, transitions, audio (sync-durations), frame-packets
P=videos/<slug>                                     # the project
```

If `ffmpeg`/`ffprobe` aren't on PATH in this shell, prepend
`/c/Users/sb_sa/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin`.
Before the first render-affecting command, `npx hyperframes@latest upgrade --project $P --check`.

## 1 · Scaffold

`node $SKILL/scripts/new-video-project.mjs --dir $P` — runs `hyperframes init` and copies the series
kit (frame.md, fonts, SFX, jingle, number-wheel, voices.json, `.hyperframes/*.mjs`).

Write `$P/BRIEF.md` (frontmatter: `workflow: faceless-explainer`, `flow: automation`,
`storyboard: no`, `message`, `destination: youtube`, `aspect: 1920x1080`, `language: bn`, `audience`,
`length`, `series: kintu-darhan`; body: link to the post, the episode's twist). Save the approved
post (plus its chart data) verbatim to `$P/capture/extracted/visible-text.txt`, and a
`tokens.json` with `{title, description, colors: [], fonts: []}`.
Copy `$SKILL/assets/series/video-direction.md` → `$P/.hyperframes/video-direction.md`.

## 2 · Beat sheet + script

`STORYBOARD.md` — frontmatter (`format: 1920x1080`, `duration`, `message`, `arc`, `audience`,
`mode: autonomous`, `language: bn`), then one `## Frame N — <title>` block per beat of the series
template (`series-bible.md`): `scene`, `voiceover` (Bangla, same as SCRIPT), `duration` (estimate),
`transition_in` (`cut` everywhere except a `push-slide LEFT` between consecutive CHECKER frames
and a `zoom-through` into the verdict), `status: outline`, `src: compositions/frames/NN-<name>.html`,
`type`, `persuasion`, `beat`, `speaker: HOST|CHECKER|none (silent)`, `chapter:` (Bangla, on chapter
starts), `blueprint`, then `narrativeRole` / `keyMessage`. Silent frames: the freeze (2) and the
end card (last).

`SCRIPT.md` — header (voices, direction), then `## Line N — <label> (Frame N) [HOST|CHECKER]`,
a `**Delivery:**` note, and the spoken Bangla indented 4 spaces. Write for the ear: short sentences,
numbers in words, English tech terms kept, jokes localized. Aim for 400–480 words total
(≈3–3.5 min with Kore's pace).

Also write the on-screen copy as you plan each frame (Bangla, short; digits Western).

## 3 · Voice → timings

```
cd $P
node .hyperframes/gemini-paced.mjs          # one request / 21s; per-day cap → next model automatically
node .hyperframes/tighten.mjs               # cap pauses at 0.45s (raw takes kept in assets/voice/raw/)
node .hyperframes/align.mjs                 # word onsets from pauses (DP fit) → audio_meta words
node $FE/audio.mjs sync-durations --audio-meta ./audio_meta.json --storyboard ./STORYBOARD.md
```

If `gemini-paced` stops at "daily quota reached on every model", report it and stop the video
stage (resume tomorrow with the same command — it only generates missing lines). Note which lines
used a fallback model (`model` on each voice in audio_meta.json).

Print the aligned words (`node -e` over audio_meta.json) and use them for everything below.

## 4 · Shot design (in STORYBOARD.md)

Add a `## Video direction` pointer section ("binding direction: `.hyperframes/video-direction.md`")
and, per frame, the time-coded shot sequence: `Scene k (a–b s): on "<Bangla word>" (t s) <what
reveals, where, which move>` — every reveal on an aligned Bangla word time, reveals spread across
the frame, the last ~0.5s a still hold. Name `focal:`, `roles:`, `sfx:`. Keep the reference
episode's frames as your vocabulary (`videos/chatgpt-pro-200-but-wait-theres-less-bn/compositions/frames/`).

Write `.hyperframes/sfx-cues.json` (frame-relative `at` = the same word times; palette and volumes
in `series-bible.md` § Sound).

## 5 · Frames (workers)

```
node $FE/frame-packets.mjs --project "$(pwd)" --storyboard "$(pwd)/STORYBOARD.md"
```

Dispatch one Agent per frame with `model: "sonnet"`, `run_in_background: true`, **at most 5 at a
time** (start the next as each finishes). Prompt template:

> You are a HyperFrames frame worker. Build exactly ONE frame composition file. Read these first, in
> order — they are your entire brief: (1) `<P>/.hyperframes/frame-packets/_role.md` (role contract);
> (2) `<P>/.hyperframes/frame-packets/<id>.md` (your frame block + shot sequence + inlined
> blueprint/rules); (3) `<P>/.hyperframes/video-direction.md` (binding series direction);
> (4) `<P>/frame.md`. Optional reference for the series look: the same-role frame in
> `videos/chatgpt-pro-200-but-wait-theres-less-bn/compositions/frames/`.
> Dispatch context: PROJECT_DIR=<P>; frame_id=<id>; output compositions/frames/<id>.html (one bare
> `<template>` fragment; root `data-composition-id="<id>"`; timeline at `window.__timelines["<id>"]`);
> confirmed sketch: none; canvas 1920×1080; captions disabled (keep content above y=896px);
> prefix ids/classes with `f<NN>-`. Write ONLY your file; don't run the hyperframes CLI; no `<audio>`.
> Be efficient: read each file once, write once, re-read once for the self-check. Reply with one
> line: the path + a one-sentence summary.

Verify each file starts with `<template` and ends with `</template>`; then mark frames
`status: animated`.

## 6 · Assemble, transitions, mix

```
node .hyperframes/mix.mjs cues
node $FE/assemble-index.mjs --storyboard ./STORYBOARD.md --hyperframes .
node $FE/transitions.mjs inject --storyboard ./STORYBOARD.md --hyperframes .
node $FE/transitions.mjs verify --storyboard ./STORYBOARD.md --index ./index.html
node .hyperframes/mix.mjs bed
```

## 7 · Checks

`npx hyperframes check --json > .hyperframes/check.json` must report `ok: true`. Known findings:

- **An element visible across the whole video** (content_overlap errors in frames far from its
  own): a frame sets `style.visibility = "visible"` from JS — change it to `"inherit"`.
- **content_overlap on intentional layering** (tight display stacks, a marker note written over a
  struck number, 3D card faces, the PAUSE readout over a frozen set): snapshot it; if it reads fine,
  add `data-layout-allow-overlap` to the container and run
  `node .hyperframes/push-overlap-flag.mjs compositions/frames/<file>.html` (the flag must sit on
  each text element, not an ancestor). If it doesn't read fine, fix the layout.
- `gsap_repeated_fromto_without_baseline` warnings where the two tweens animate different
  properties (opacity vs transform) are harmless; same-property pairs need `immediateRender: false`.
- An empty beat (a frame clears before the next reveal arrives) — move the clear later.

Contact sheet: `npx hyperframes snapshot --at <each frame's end − 0.35s>` and look at every frame
(Bangla shaping, overflow, anything leaking between frames).

## 8 · Check-in ② and render

Ask "render now, or preview first?" (preview: `npx hyperframes preview --background`).
Render: `npx hyperframes render --skill=faceless-explainer --quality high --output renders/<slug>-bn.mp4`.
Then probe it (`ffprobe` duration) and measure loudness
(`ffmpeg -i … -af ebur128=peak=true -f null -` → target ≈ −14 LUFS integrated).
