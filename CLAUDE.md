# myname — video editing preferences

This repo is used to track personal preferences for recurring Claude Code
video-editing requests (TikTok/Reels-style "omnibus" compilation videos).
No app code lives here; this file just records how to redo past requests
without re-deriving them from scratch.

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
7. Long ffmpeg renders (>2min) must run with `run_in_background: true` —
   the foreground Bash timeout is 2 minutes.

## "Ranking" overlay graphic (medals 1-3 + plain numbers 4-6)

A recurring ask: overlay a vertical ranking list (like the "Top 6" style
compilation videos use) on the left edge of the frame, generated with PIL
since there's no color-emoji font available — draw it as vector shapes
instead of using 🥇🥈🥉 glyphs.

Design, tuned over several iterations against reference screenshots the
user provided (final agreed values, in 1080x1920 canvas coordinates):

- `x_c = 90` — horizontal center of the whole column (left edge of frame,
  clear of any title banner text that spans the top).
- `start_y = 395` — top of the first ribbon. Must clear the black/pink
  title banner that these compilation videos burn in at the top (check the
  actual banner's bottom edge per-video; ~373px was the measured value for
  the reference video, so 395 left a clean margin).
- Medal diameter `D = 82`, ribbon width `Rw = 52` (`D*0.635`), ribbon
  height `Rh = 36` (`D*0.44`).
- Number glyph height ≈ 70px (DejaVu Sans Bold, size 96 hits this;
  height/fontsize ≈ 0.73 for that font, useful for retuning).
- Medal ring/fill/highlight/number colors: gold
  `(225,140,10)/(255,193,30)/(255,224,120)/(185,100,5)`, silver
  `(150,150,155)/(205,205,210)/(232,232,235)/(120,120,125)`, bronze
  `(150,85,35)/(205,120,55)/(225,165,110)/(120,55,15)`. Ribbon: light blue
  `(74,150,235)` on the left tail, dark blue `(18,82,165)` on the right
  tail, meeting at a point below the ribbon (draw as two triangles, not a
  rectangle — that's what reads as a "medal ribbon" rather than a flag).
- Numbers 4/5/6: plain bold white text with a soft black outline (8-way
  offset stamp at low alpha) for legibility over any footage.
- Spacing: `gap = 20` between every element (ribbon+medal unit, or number
  line) **except** the gap between the plain numbers 4→5 and 5→6, which the
  user asked to be a bit larger: `gap_numbers = 32`. All gaps must be
  perfectly uniform within their category — mismatched spacing was flagged
  and had to be fixed.
- The medal diameter and the number glyph height should be close to each
  other (medal only slightly larger, ratio ~0.85), not wildly different —
  this was explicitly requested to match a reference the user sent.

To re-render: build the PNG overlay at 1080x1920 (transparent background),
then `ffmpeg -i video.mp4 -i overlay.png -filter_complex "[0:v][1:v]overlay=0:0:format=auto" -c:v libx264 -crf 26 -preset veryfast -c:a copy out.mp4`.

Always render a single still-frame composite preview (paste overlay PNG
onto one extracted video frame) and send that first before spending time
on a full video re-render — cheaper iteration loop for size/position
feedback.
