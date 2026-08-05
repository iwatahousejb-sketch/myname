# myname — video editing preferences

This repo is used to track personal preferences for recurring Claude Code
video-editing requests (TikTok/Reels-style "omnibus" compilation videos).
No app code lives here; this file just records how to redo past requests
without re-deriving them from scratch.

## Default behavior: just sending a compilation video means "do the full treatment"

When the user sends a vertical (1080x1920) omnibus/compilation video with no
further instructions (or just "これやって" / "お願い" type requests), apply
**both** of the following automatically, without being asked each time:

1. Insert the black separator clip at every gap between segments (see
   "Workflow: inserting a clip between segments" below). Reuse whichever
   black insert clip was last uploaded/used in this project if one is
   available in the session; otherwise ask for it once.
2. Build and composite the combined ranking + telop overlay (see "Combined
   ranking + telop overlay" below), with rank count matching the video's own
   burned-in title (e.g. "Top5" → medals/numbers 1-5, "Top6" → 1-6).

Ask the user for the per-rank label text (what each clip is about, e.g.
"5位 夫婦", "4位 ゴルフ") if it isn't obvious/already established earlier in
the conversation — don't guess content labels. Everything else (sizing,
spacing, font, animation timing) should follow the tuned defaults below
without re-asking.

## Workflow: inserting a clip between segments of an omnibus video

Given a vertical (1080x1920) compilation video made of several short clips
cut together, and a separate short clip to insert:

1. Detect scene cuts with ffmpeg's scene filter:
   `ffmpeg -i in.mov -filter:v "select='gt(scene,0.4)',showinfo" -f null -`
   (raise the threshold, e.g. 0.6-0.7, to drop false positives from camera
   motion/panning; confirm real cuts by extracting frames right before/after
   each candidate timestamp).
2. Build segment boundaries = `[0.0] + cut_times + [duration]`.
3. Use one `ffmpeg -filter_complex` with `trim`/`atrim` on the source for
   each segment, and `trim`/`atrim` on the insert clip repeated once per
   gap, then `concat=n=...:v=1:a=1`. Default behavior (unless told
   otherwise) is to insert the clip **at every gap** between all segments,
   not just one — confirm with the user first since this is ambiguous from
   a text request alone (send a numbered contact-sheet of the detected cuts
   if unsure).
4. Normalize both sources before concat: `fps=30`, `format=yuv420p`,
   `setsar=1`, `aformat=sample_rates=44100:channel_layouts=stereo` — the
   insert clip is often a different resolution/fps than the omnibus, so pad
   it to the target frame (e.g. `scale=1080:1080,pad=1080:1920:0:420:black`
   for a square clip going into a 9:16 frame) rather than stretching it.
5. Encode with `libx264 -crf 26 -preset veryfast -c:a aac -b:a 128k` to stay
   under the 30 MiB SendUserFile limit; crf 18 is too large for anything
   past ~60s at 1080x1920.
6. Trimming the insert clip's duration (e.g. "cut 0.2s off the end") means
   `trim=start=0:end=<new_duration>` — keep the head, cut the tail, unless
   told otherwise.
7. **Default black insert clip trim (current tuned value): `trim=start=0.1:end=0.6`**
   (0.5s duration) — after several rounds of "cut N seconds off the end"
   landing on a 0.6s clip (`trim=start=0:end=0.6`), the next round of
   feedback was to cut the *front* instead: drop the first 0.1s and keep
   `0.1`→`0.6` of the original insert clip. Use this trim as the default for
   new videos going forward instead of re-deriving from "0.6s off the head."
8. Long ffmpeg renders (>2min) must run with `run_in_background: true` —
   the foreground Bash timeout is 2 minutes.

## Combined ranking + telop overlay (medals 1-3 + numbers 4-6 + animated labels)

**This supersedes the earlier medal-only design** — the medal icons and the
per-rank label text are now built and rendered together, as one PIL-generated
overlay video, not composited in separate passes. Reference implementation:
`build_combined_overlay.py` in the scratchpad from the session that tuned
this (regenerate from the spec below rather than hunting for that temp file).

### Icons (medals 1-3, plain numbers 4-6)

- `x_c = 90` — horizontal center of the icon column (left edge of frame).
- Medal diameter `D = 82`, ribbon width `Rw = 52` (`D*0.635`), ribbon height
  `Rh = 36` (`D*0.44`). Ribbon = two triangles (light blue `(74,150,235)`
  left tail, dark blue `(18,82,165)` right tail) meeting at a point below —
  not a rectangle, that's what reads as a ribbon rather than a flag.
- Medal ring/fill/highlight/number colors: gold
  `(225,140,10)/(255,193,30)/(255,224,120)/(185,100,5)`, silver
  `(150,150,155)/(205,205,210)/(232,232,235)/(120,120,125)`, bronze
  `(150,85,35)/(205,120,55)/(225,165,110)/(120,55,15)`. The rank number is
  drawn *directly on* the medal (dark, ~30% down from center, DejaVu Sans
  Bold at `D*0.62`), not as a separate white-outlined digit beside it.
  Numbers 4/5/6 (no medal) are plain bold white with a thin black outline
  (DejaVu Sans Bold, size 96 ≈ 70px tall).
- **Icons are always fully opaque for the whole video** — they never fade in
  per-rank and never dim. Only the label text (below) animates. (An earlier
  version made icons appear one-by-one and mismatched pitch between medal
  rows and number rows — both were flagged as wrong; don't repeat either.)
- **Row spacing must be perfectly uniform** across all 5-6 rows — same pitch
  medal-to-medal, medal-to-number, and number-to-number. Tuned value:
  `row_pitch = 140`, row 1 (first medal) vertical center at `y = 472`
  (i.e. `start_y = 395` for the ribbon top, clearing the title banner that
  these compilation videos burn in — check the actual banner's bottom edge
  per-video, ~373px was measured on the reference, so 395 leaves a clean
  margin). Row *n* center = `472 + (n-1)*140`.
- **`start_center_y` is per-video, not always 472** — some title banners
  (e.g. two-line banners, or ones with descenders/deep kanji on the left)
  run deeper than the ~373px reference. Pixel-scan the actual frame (dark
  vs light at the x-columns under the ribbon's left tail, roughly
  `x = x_c - Rw/2` to `x_c`, i.e. `x≈64` to `90`) to find the banner's true
  bottom edge for that video, then use the **minimal safe value**:
  `start_center_y = deepest_dark_y_near_ribbon + 77` (77 = `Rh + D/2`, the
  distance from icon center up to the ribbon's top-left corner) — don't add
  extra padding beyond that. An earlier round on a deep-banner video used
  `540` (banner bottom ~452, so ~11px of unnecessary extra margin on top of
  the required 77px), and the explicit feedback was "move it up a bit" —
  `525` (banner bottom 452 + 77 = 529, so ~4px margin) was confirmed to
  still clear the banner cleanly. Prefer tight margins like this over
  generous ones.
- **But zero margin is too tight** — on a shallow-banner video (bottom
  ~343px), using the literal `banner_bottom + 77` formula with no slack
  (`start_center_y = 418`) put the ribbon/arrow shape flush against the
  banner text with no gap, and it read as visibly overlapping in practice
  (flagged with a screenshot circling the overlap). Moving to `448` (~30px
  of real margin beyond the `+77` point) fixed it cleanly. So: compute the
  tight minimum via `banner_bottom + 77`, then add roughly **20-30px of
  actual margin on top of that** before finalizing — "tight" means "don't
  pad excessively," not "touch the banner exactly."
- **Measure the banner's solid background box, not just the visible text** —
  on that same video, `448` was *still* flagged as overlapping ("被って
  る", "上の黒のところと被ってる"). The mistake: the banner text ("ボトル
  フリップtop4") sits inside a black background rectangle that extends
  well below the text's own visible bottom edge (~343px) before the actual
  video frame content starts (~419px) — the pink pixels' bottom is not the
  banner's real bottom. Scanning for "last bright pixel" only finds the
  text; scanning for "last near-black-flat pixel before real image texture
  resumes" (i.e. where actual photo/video content begins, checked at
  several x columns across the ribbon's footprint) finds the true edge.
  `start_center_y = 521` (419 + 77 + ~25px margin) was needed, not `448`.
  When a screenshot complaint persists after one fix, don't just nudge the
  same number further — re-measure the banner boundary itself; the first
  measurement may have been reading the wrong feature (text vs. background
  box).

### Labels (the "5位 夫婦" style telop text)

- Font: **Zen Kaku Gothic New Bold** (Google Font — angular/"kaku", not
  rounded/"maru"; fetch via
  `https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@700`
  → follow the `src: url(...)` in the returned CSS to the actual `.ttf` on
  `fonts.gstatic.com`). Rejected alternatives, for reference: Kosugi Maru /
  M PLUS Rounded 1c (too round — explicitly rejected), Dela Gothic One (too
  heavy), Noto Sans CJK Bold (too plain/technical), IPAGothic (too thin).
- Size 62px, outline width 3 (thin black outline — 7 was flagged as too
  thick/heavy). White fill.
- **Left edge of every label must line up in a straight column** —
  compensate per-string, not a fixed draw x: `tx = label_x - textbbox(txt)[0]`
  (different starting characters have different left-side-bearing, so
  drawing all labels at the same nominal x without this correction produces
  a visibly wobbly left edge — this was flagged explicitly).
- `label_x = 160` (close to the icon column — moved in from an earlier
  `235`, which read as too far right/disconnected from the icons).
- Vertical center of each label = the same row center as its icon
  (`row_centers[n]`), computed via `textbbox` top/bottom of the actual
  string, not a fixed reference glyph — keeps numerals and kanji visually
  centered against each other despite different glyph metrics.

### Reveal animation

- Countdown order: rank **6→1** (or **5→1**), i.e. the *last*/lowest rank
  is revealed first, right when the video starts, and 1st place is revealed
  last, at the final segment — standard suspense-countdown structure.
- Each label's reveal is triggered at the exact start time of its
  corresponding segment in the final (post black-insert) timeline.
- **Typewriter effect**: characters appear one at a time over `TYPE_DUR =
  0.4s`, preceded by a blinking `|` cursor (toggle every 0.12s) while typing.
- **Dim on pass**: once the *next* rank's reveal starts, the previous
  label's alpha drops from 255 to `DIM_ALPHA = 90` (stays visible, just
  de-emphasized) and stays there — it does not disappear. The icon next to
  it stays fully opaque throughout (see above).

### Rendering approach

Render the whole animated overlay as a transparent-background video first
(this is not a single static PNG — it changes over time), then composite
once onto the base video:

```
ffmpeg -y -f rawvideo -pixel_format rgba -video_size 1080x1920 \
  -framerate 30 -i - -c:v qtrle -an overlay.mov   # fed frame-by-frame from a PIL loop piped via stdin

ffmpeg -y -i base_video.mp4 -i overlay.mov \
  -filter_complex "[0:v][1:v]overlay=0:0:format=auto" \
  -c:v libx264 -crf 22 -preset veryfast -c:a copy out.mp4
```

Always render one static composite preview (paste the overlay's first/a
mid-timeline frame onto an extracted video frame) and send that before
spending time on the full animated render — cheap iteration loop for
position/size/font feedback before committing to the ~1 fps-per-second PIL
frame-loop render time.

## Workflow: picking specific clips out of a longer source video via screenshots

The user often has a long (60-90s) raw compilation (no black inserts, no
ranking banner — just a compilation account's watermark/caption burned in)
and wants only a handful of clips from it pulled out and reassembled with
the usual black insert between them. They identify which clips by sending
phone screenshots (frames from the video, sometimes with the phone UI/volume
slider still visible) rather than timestamps.

1. Load the source video and build a 1fps contact sheet (grid of thumbnails
   with timestamps) to get a rough sense of how many distinct clips/people
   are in it and roughly where they fall.
2. Run scene-cut detection to get real segment boundaries:
   `ffmpeg -i in.mp4 -filter:v "select='gt(scene,0.3)',showinfo" -f null -`
   (lower the threshold, e.g. 0.12-0.15, if segments feel too coarse —
   distinct short reaction clips cut faster than the omnibus videos this
   file mostly documents).
3. For each screenshot the user sends, match it to a segment by content
   (caption text burned into the screenshot, person/scene, on-screen
   objects), then narrow to the exact start/end with fine-grained frame
   extraction (`fps=10` or `fps=20` over just that candidate window) and a
   quick visual grid — don't trust a single 1fps sample per screenshot,
   short clips (well under 1s) can fall entirely between two 1fps samples
   and get missed (this happened once: a ~2.5s clip near the 55s mark was
   invisible at 1fps because the sampled frames landed just before/after
   it — re-scanning at 0.1-0.5s resolution around the region the user
   pointed to found it immediately).
4. If a screenshot doesn't match anywhere in the video after a full scan,
   say so explicitly and ask whether it's from a different source video —
   don't guess a "close enough" segment. If the user insists it's in there
   ("最後の方にあるよ" / "it's near the end"), don't re-run the same 1fps
   scan — go straight to a fine-grained (0.5s or better) scan of the region
   they pointed to.
5. Once all requested segments have confirmed `(start, end)` times, build
   one `ffmpeg -filter_complex` that does `trim`/`atrim` on the source for
   each selected segment **in the order the user listed/sent them**, with
   the black insert clip (`trim=start=0.1:end=0.6`, scaled/padded to the
   source's aspect — see the black-insert workflow above) between every
   pair, then `concat`. This does not need to preserve segments that were
   skipped — only the picked clips + insert clips go into the timeline.
6. Sanity-check the built video's total duration against
   `sum(segment durations) + n_inserts * 0.5` before sending — a mismatch
   means a trim boundary was off. Pull a check frame at each splice point
   to confirm the right content lines up before delivering.
