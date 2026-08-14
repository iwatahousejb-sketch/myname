import { continueRender, delayRender, staticFile } from "remotion";

const waitForFonts = delayRender("Loading fonts");

const weights: [string, string, number][] = [
  ["Noto Sans JP", "fonts/NotoSansJP-Regular.ttf", 400],
  ["Noto Sans JP", "fonts/NotoSansJP-Medium.ttf", 500],
  ["Noto Sans JP", "fonts/NotoSansJP-Bold.ttf", 700],
  ["Noto Sans JP", "fonts/NotoSansJP-Black.ttf", 900],
  ["Noto Serif JP", "fonts/NotoSerifJP-Regular.ttf", 400],
  ["Noto Serif JP", "fonts/NotoSerifJP-Medium.ttf", 500],
  ["Noto Serif JP", "fonts/NotoSerifJP-Bold.ttf", 700],
  ["Noto Serif JP", "fonts/NotoSerifJP-Black.ttf", 900],
];

Promise.all(
  weights.map(([family, path, weight]) => {
    const font = new FontFace(family, `url(${staticFile(path)})`, {
      weight: String(weight),
    });
    return font.load().then((loaded) => {
      document.fonts.add(loaded);
    });
  }),
)
  .then(() => continueRender(waitForFonts))
  .catch((err) => {
    console.error("Font loading failed", err);
    continueRender(waitForFonts);
  });
