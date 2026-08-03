import { continueRender, delayRender, staticFile } from "remotion";

const waitForFonts = delayRender("Loading Noto Sans JP");

const weights: [string, number][] = [
  ["fonts/NotoSansJP-Regular.ttf", 400],
  ["fonts/NotoSansJP-Medium.ttf", 500],
  ["fonts/NotoSansJP-Bold.ttf", 700],
  ["fonts/NotoSansJP-Black.ttf", 900],
];

Promise.all(
  weights.map(([path, weight]) => {
    const font = new FontFace("Noto Sans JP", `url(${staticFile(path)})`, {
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
