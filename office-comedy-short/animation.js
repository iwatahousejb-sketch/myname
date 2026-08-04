const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const TOTAL_DURATION = 16800;
window.TOTAL_DURATION = TOTAL_DURATION;
window.__ANIME_DONE__ = false;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const easeInOut = (t) => t * t * (3 - 2 * t);

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawBackground() {
  const g = ctx.createLinearGradient(0, 0, 0, 600);
  g.addColorStop(0, '#9df0b8');
  g.addColorStop(1, '#79dba0');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, 600);

  ctx.fillStyle = '#5c5c5c';
  ctx.fillRect(0, 600, W, H - 600);
  ctx.fillStyle = '#4a4a4a';
  for (let x = -40; x < W; x += 80) {
    ctx.fillRect(x, 600, 2, H - 600);
  }

  ctx.fillStyle = '#63c98a';
  ctx.fillRect(628, 0, 24, 600);
  ctx.fillStyle = '#6b4a2f';
  ctx.fillRect(636, 470, 10, 130);
  ctx.fillStyle = '#3f9e63';
  const leafSpots = [[640, 460], [618, 430], [662, 420], [640, 390], [625, 360], [655, 355]];
  for (const [lx, ly] of leafSpots) {
    ctx.beginPath();
    ctx.ellipse(lx, ly, 22, 14, Math.random() * 0.4 - 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawDesk(cx) {
  ctx.fillStyle = '#f4c430';
  ctx.fillRect(cx - 210, 520, 420, 30);
  ctx.fillStyle = '#d4a71f';
  ctx.fillRect(cx - 210, 550, 420, 12);

  ctx.fillStyle = '#e8862b';
  roundRect(cx - 150, 430, 90, 100, 8);
  ctx.fill();

  ctx.fillStyle = '#9a9a9a';
  roundRect(cx - 20, 370, 130, 100, 6);
  ctx.fill();
  ctx.fillStyle = '#1c1c1c';
  ctx.fillRect(cx - 8, 385, 104, 68);
  ctx.fillStyle = '#7d7d7d';
  ctx.fillRect(cx + 20, 470, 40, 18);

  ctx.fillStyle = '#e5e5e5';
  roundRect(cx + 90, 445, 90, 62, 4);
  ctx.fill();
  ctx.fillStyle = '#1c1c1c';
  ctx.fillRect(cx + 96, 451, 78, 42);
  ctx.fillStyle = '#c9c9c9';
  ctx.fillRect(cx + 100, 505, 70, 8);

  ctx.fillStyle = '#e5c26b';
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(cx - 145 + i * 14, 500, 10, 16);
  }
}

function dogEars(cx, topY, flap) {
  ctx.fillStyle = '#c98a4b';
  ctx.beginPath();
  ctx.moveTo(cx - 70, topY + 10);
  ctx.quadraticCurveTo(cx - 100, topY + 60 + flap, cx - 55, topY + 90 + flap);
  ctx.quadraticCurveTo(cx - 60, topY + 30, cx - 40, topY);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 70, topY + 10);
  ctx.quadraticCurveTo(cx + 100, topY + 60 + flap, cx + 55, topY + 90 + flap);
  ctx.quadraticCurveTo(cx + 60, topY + 30, cx + 40, topY);
  ctx.closePath();
  ctx.fill();
}

function catEars(cx, topY) {
  ctx.fillStyle = '#9d9db0';
  ctx.beginPath();
  ctx.moveTo(cx - 75, topY + 30);
  ctx.lineTo(cx - 45, topY - 45);
  ctx.lineTo(cx - 20, topY + 15);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 75, topY + 30);
  ctx.lineTo(cx + 45, topY - 45);
  ctx.lineTo(cx + 20, topY + 15);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e7a9c2';
  ctx.beginPath();
  ctx.moveTo(cx - 60, topY + 22);
  ctx.lineTo(cx - 45, topY - 15);
  ctx.lineTo(cx - 33, topY + 12);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 60, topY + 22);
  ctx.lineTo(cx + 45, topY - 15);
  ctx.lineTo(cx + 33, topY + 12);
  ctx.closePath();
  ctx.fill();
}

function drawMascot(cx, baseY, cfg) {
  const { species, bodyColor, bellyColor, eyeState, armLift, lean,
          sweat, blush, mouth, earFlap } = cfg;

  ctx.save();
  ctx.translate(cx + lean * 18, 0);
  const bob = Math.sin(Date.now() * 0) * 0;

  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.moveTo(-140, baseY);
  ctx.quadraticCurveTo(-140, baseY - 210, 0, baseY - 220);
  ctx.quadraticCurveTo(140, baseY - 210, 140, baseY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = bellyColor;
  ctx.beginPath();
  ctx.ellipse(0, baseY - 40, 78, 60, 0, 0, Math.PI);
  ctx.fill();

  ctx.strokeStyle = bodyColor;
  ctx.lineWidth = 26;
  ctx.lineCap = 'round';
  const armY = baseY - 90;
  ctx.beginPath();
  ctx.moveTo(-125, armY);
  ctx.lineTo(-150, armY - 40 * armLift);
  ctx.moveTo(125, armY);
  ctx.lineTo(150, armY - 40 * (species === 'cat' ? 0 : armLift * 0.3));
  ctx.stroke();

  if (species === 'dog') {
    dogEars(0, baseY - 205, earFlap);
  } else {
    catEars(0, baseY - 200);
    ctx.strokeStyle = 'rgba(80,80,90,0.6)';
    ctx.lineWidth = 2;
    for (const dy of [-6, 4, 14]) {
      ctx.beginPath();
      ctx.moveTo(-40, baseY - 118 + dy);
      ctx.lineTo(-95, baseY - 122 + dy);
      ctx.moveTo(40, baseY - 118 + dy);
      ctx.lineTo(95, baseY - 122 + dy);
      ctx.stroke();
    }
  }

  const eyeY = baseY - 140;
  for (const ex of [-32, 32]) {
    if (eyeState === 'closed') {
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(ex, eyeY, 9, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#fff';
      const h = eyeState === 'narrow' ? 6 : 13;
      ctx.beginPath();
      ctx.ellipse(ex, eyeY, 11, h, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2b2b2b';
      ctx.beginPath();
      ctx.ellipse(ex, eyeY + (eyeState === 'narrow' ? 0 : 2), 6, h * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      if (eyeState !== 'narrow') {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ex + 2, eyeY - 3, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  if (blush) {
    ctx.fillStyle = 'rgba(255,140,160,0.7)';
    ctx.beginPath();
    ctx.arc(-55, baseY - 118, 10, 0, Math.PI * 2);
    ctx.arc(55, baseY - 118, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = species === 'dog' ? '#2b2b2b' : '#e58fae';
  ctx.beginPath();
  ctx.ellipse(0, baseY - 108, species === 'dog' ? 10 : 6, species === 'dog' ? 7 : 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#2b2b2b';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (mouth === 'open') {
    ctx.fillStyle = '#7a3b3b';
    ctx.ellipse(0, baseY - 88, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (mouth === 'wobble') {
    ctx.moveTo(-10, baseY - 88);
    ctx.quadraticCurveTo(0, baseY - 80, 10, baseY - 88);
  } else {
    ctx.arc(0, baseY - 96, 12, 0.1 * Math.PI, 0.9 * Math.PI);
  }
  ctx.stroke();

  if (sweat > 0) {
    ctx.save();
    ctx.globalAlpha = sweat;
    ctx.fillStyle = '#7fd1ff';
    ctx.beginPath();
    ctx.moveTo(60, baseY - 190);
    ctx.quadraticCurveTo(72, baseY - 165, 60, baseY - 150);
    ctx.quadraticCurveTo(48, baseY - 165, 60, baseY - 190);
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();
}

function drawSpeechBubble(x, y, text, alpha, align) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = '30px "Hiragino Sans", "Noto Sans JP", sans-serif';
  const padX = 26, padY = 16;
  const w = ctx.measureText(text).width + padX * 2;
  const h = 54;
  const bx = align === 'left' ? x : x - w / 2;
  const by = y - h - 18;

  ctx.fillStyle = 'rgba(255,255,255,0.96)';
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3;
  roundRect(bx, by, w, h, 16);
  ctx.fill();
  ctx.stroke();

  const px = align === 'left' ? bx + 40 : x;
  ctx.beginPath();
  ctx.moveTo(px - 12, by + h);
  ctx.lineTo(px, by + h + 16);
  ctx.lineTo(px + 12, by + h);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.96)';
  ctx.fill();
  ctx.strokeStyle = '#222';
  ctx.stroke();

  ctx.fillStyle = '#1c1c1c';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, bx + w / 2, by + h / 2 + 2);
  ctx.restore();
}

function drawTitle(text, alpha, y) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, y - 44, W, 88);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 42px "Hiragino Sans", "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, W / 2, y);
  ctx.restore();
}

function drawCaption(text, alpha) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = 'bold 46px "Hiragino Sans", "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center';
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#fff';
  ctx.lineJoin = 'round';
  ctx.strokeText(text, W / 2, H - 40);
  ctx.fillText(text, W / 2, H - 40);
  ctx.restore();
}

function fadeWindow(elapsed, start, end, fadeMs) {
  if (elapsed < start || elapsed > end) return 0;
  return clamp01(Math.min(elapsed - start, end - elapsed) / fadeMs);
}

let lastTime = null;

function frame(now) {
  if (window.__startTime === undefined) window.__startTime = now;
  const elapsed = now - window.__startTime;
  lastTime = now;

  ctx.clearRect(0, 0, W, H);
  drawBackground();
  drawDesk(380);
  drawDesk(900);

  const dogStretch = fadeWindow(elapsed, 800, 3400, 300) > 0;
  const dogArmLift = elapsed >= 800 && elapsed < 3400
    ? 0.6 + 0.4 * Math.sin(elapsed / 200) : (elapsed >= 10200 && elapsed < 10600 ? Math.random() : 0.1);
  const dogLean = elapsed >= 3400 && elapsed < 3900
    ? easeInOut(clamp01((elapsed - 3400) / 500)) : (elapsed >= 3900 ? 1 : 0);
  const dogEarFlap = elapsed >= 3900 && elapsed < 4300 ? Math.sin((elapsed - 3900) / 60) * 10 : 0;
  const dogSweat = elapsed >= 7000 ? clamp01((elapsed - 7000) / 400) * (elapsed < 13600 ? 1 : 1 - clamp01((elapsed - 13600) / 400)) : 0;
  const dogBlush = elapsed >= 13200;
  const dogEyeState = elapsed >= 13200 ? 'closed' : (elapsed >= 3900 && elapsed < 4300 ? 'closed' : 'normal');
  const dogMouth = elapsed >= 7400 && elapsed < 10200
    ? (Math.floor(elapsed / 150) % 2 === 0 ? 'open' : 'normal')
    : (elapsed >= 13200 ? 'wobble' : 'normal');

  drawMascot(380, 560, {
    species: 'dog', bodyColor: '#e3a857', bellyColor: '#fff3dd',
    eyeState: dogEyeState, armLift: dogStretch ? dogArmLift : (elapsed >= 10200 && elapsed < 10600 ? dogArmLift : 0.1),
    lean: -dogLean, sweat: dogSweat, blush: dogBlush, mouth: dogMouth,
    earFlap: dogEarFlap,
  });

  const catNotice = elapsed >= 3900;
  const catEyeState = elapsed >= 4200 && elapsed < 13600 ? 'narrow' : 'normal';
  const catArmLift = elapsed >= 10600 && elapsed < 13200 ? 0.2 : 0.05;
  const catMouth = elapsed >= 10600 && elapsed < 13200 && Math.floor(elapsed / 150) % 2 === 0 ? 'open' : 'normal';

  drawMascot(900, 560, {
    species: 'cat', bodyColor: '#b8b8c9', bellyColor: '#f2f2f6',
    eyeState: catEyeState, armLift: catArmLift, lean: catNotice ? -0.15 : 0,
    sweat: 0, blush: false, mouth: catMouth, earFlap: 0,
  });

  const introA = fadeWindow(elapsed, 0, 2600, 500);
  drawTitle('定時退社チャレンジ', introA, 110);

  const c1 = fadeWindow(elapsed, 900, 3400, 250);
  if (c1 > 0) drawSpeechBubble(380, 350, 'よし…終わった…!', c1, 'center');

  const c2 = fadeWindow(elapsed, 4300, 7000, 250);
  if (c2 > 0) drawSpeechBubble(900, 350, 'え、もう帰るの?', c2, 'center');

  const c3 = fadeWindow(elapsed, 7400, 10200, 250);
  if (c3 > 0) drawSpeechBubble(300, 320, 'い、いや!今から本気出す!', c3, 'left');

  const c4 = fadeWindow(elapsed, 10700, 13200, 250);
  if (c4 > 0) drawSpeechBubble(900, 350, '…画面、"退勤"って出てるけど', c4, 'center');

  if (elapsed >= 800 && elapsed < 3400) drawCaption('よし、終わったから先に上がろう', 1);
  if (elapsed >= 4300 && elapsed < 7000) drawCaption('気づかれた', 1);
  if (elapsed >= 7400 && elapsed < 10200) drawCaption('とっさに嘘をつく', 1);
  if (elapsed >= 10700 && elapsed < 13200) drawCaption('速攻でバレていた', 1);

  const outroA = elapsed >= 13800 ? clamp01((elapsed - 13800) / 800) : 0;
  drawTitle('今日も定時退社失敗', outroA, H - 100);

  if (elapsed < TOTAL_DURATION) {
    requestAnimationFrame(frame);
  } else {
    window.__ANIME_DONE__ = true;
  }
}

requestAnimationFrame(frame);
