const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const TOTAL_DURATION = 10500;
window.TOTAL_DURATION = TOTAL_DURATION;
window.__ANIME_DONE__ = false;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function blinkAmount(elapsed, offset, period) {
  const cycle = (elapsed + offset) % period;
  const win = 160;
  if (cycle > win) return 1;
  const t = cycle / win;
  return 1 - Math.sin(t * Math.PI);
}

function drawBackground(elapsed) {
  const g = ctx.createLinearGradient(0, 0, 0, 520);
  g.addColorStop(0, '#a8ddf5');
  g.addColorStop(1, '#e7f6ff');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, 520);

  ctx.save();
  ctx.fillStyle = '#fff6c9';
  ctx.shadowColor = '#fff2a8';
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(1100, 100, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#ffffff';
  const clouds = [[180, 90, 40], [240, 100, 30], [130, 110, 28], [780, 70, 34], [840, 85, 26]];
  for (const [cx, cy, cr] of clouds) {
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  const g2 = ctx.createLinearGradient(0, 480, 0, H);
  g2.addColorStop(0, '#9adf7f');
  g2.addColorStop(1, '#6fc25d');
  ctx.fillStyle = g2;
  ctx.fillRect(0, 480, W, H - 480);

  ctx.fillStyle = '#6b4a2f';
  ctx.fillRect(940, 250, 26, 250);
  const blobs = [[953, 220, 80], [900, 250, 55], [1000, 250, 55], [953, 175, 55]];
  ctx.fillStyle = '#6fbf6a';
  for (const [bx, by, br] of blobs) {
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#8a5a34';
  roundRect(760, 470, 220, 22, 6);
  ctx.fill();
  ctx.fillRect(775, 492, 16, 60);
  ctx.fillRect(945, 492, 16, 60);
}

function drawEyes(cx, eyeY, blink, look) {
  for (const ex of [-30, 30]) {
    const h = 12 * blink;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.ellipse(cx + ex, eyeY, 10, Math.max(h, 1), 0, 0, Math.PI * 2);
    ctx.fill();
    if (blink > 0.15) {
      ctx.fillStyle = '#2b2b2b';
      ctx.beginPath();
      ctx.ellipse(cx + ex + look, eyeY + 2 * blink, 5.5, Math.max(h * 0.7, 1), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(cx + ex + look + 2, eyeY - 3 * blink, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawMouth(cx, mouthY, openAmount, smileBase) {
  ctx.strokeStyle = '#2b2b2b';
  ctx.lineWidth = 3;
  if (openAmount > 0.08) {
    ctx.fillStyle = '#7a3b3b';
    ctx.beginPath();
    ctx.ellipse(cx, mouthY, 9, 4 + openAmount * 9, 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(cx, mouthY - 4, 11, (0.15 - smileBase * 0.05) * Math.PI, (0.85 + smileBase * 0.05) * Math.PI);
    ctx.stroke();
  }
}

function dogEars(cx, topY) {
  ctx.fillStyle = '#c98a4b';
  ctx.beginPath();
  ctx.moveTo(cx - 68, topY + 8);
  ctx.quadraticCurveTo(cx - 98, topY + 55, cx - 52, topY + 85);
  ctx.quadraticCurveTo(cx - 58, topY + 26, cx - 38, topY - 2);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 68, topY + 8);
  ctx.quadraticCurveTo(cx + 98, topY + 55, cx + 52, topY + 85);
  ctx.quadraticCurveTo(cx + 58, topY + 26, cx + 38, topY - 2);
  ctx.closePath();
  ctx.fill();
}

function catEars(cx, topY) {
  ctx.fillStyle = '#9d9db0';
  ctx.beginPath();
  ctx.moveTo(cx - 74, topY + 28);
  ctx.lineTo(cx - 44, topY - 44);
  ctx.lineTo(cx - 20, topY + 14);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 74, topY + 28);
  ctx.lineTo(cx + 44, topY - 44);
  ctx.lineTo(cx + 20, topY + 14);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#e7a9c2';
  ctx.beginPath();
  ctx.moveTo(cx - 59, topY + 20);
  ctx.lineTo(cx - 44, topY - 16);
  ctx.lineTo(cx - 32, topY + 11);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx + 59, topY + 20);
  ctx.lineTo(cx + 44, topY - 16);
  ctx.lineTo(cx + 32, topY + 11);
  ctx.closePath();
  ctx.fill();
}

function drawCat(x, baseY, opts) {
  const { tilt, bob, walkPhase, walking, armWave, mouthOpen, blink, sitting } = opts;

  ctx.save();
  ctx.translate(x, bob);
  ctx.rotate(tilt);

  const legLift = walking ? Math.abs(Math.sin(walkPhase)) * 14 : 0;
  const legSwingL = walking ? Math.sin(walkPhase) * 22 : 0;
  const legSwingR = walking ? Math.sin(walkPhase + Math.PI) * 22 : 0;

  if (!sitting) {
    ctx.fillStyle = '#9d9db0';
    roundRect(-46 + legSwingL * 0.3, baseY - 30 - legLift * 0.3, 30, 46, 12);
    ctx.fill();
    roundRect(16 + legSwingR * 0.3, baseY - 30, 30, 46, 12);
    ctx.fill();
  }

  ctx.fillStyle = '#b8b8c9';
  ctx.beginPath();
  ctx.moveTo(-135, baseY - 15);
  ctx.quadraticCurveTo(-135, baseY - 220, 0, baseY - 230);
  ctx.quadraticCurveTo(135, baseY - 220, 135, baseY - 15);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f2f2f6';
  ctx.beginPath();
  ctx.ellipse(0, baseY - 55, 74, 58, 0, 0, Math.PI);
  ctx.fill();

  const armSwingL = walking ? Math.sin(walkPhase + Math.PI) * 16 : 0;
  ctx.strokeStyle = '#b8b8c9';
  ctx.lineWidth = 25;
  ctx.lineCap = 'round';
  const armY = baseY - 95;
  ctx.beginPath();
  ctx.moveTo(-120, armY);
  if (armWave > 0) {
    ctx.lineTo(-150, armY - 70 * armWave + Math.sin(Date.now() / 60) * 6 * armWave);
  } else {
    ctx.lineTo(-135 + armSwingL, armY + 20);
  }
  ctx.moveTo(120, armY);
  ctx.lineTo(135 - armSwingL, armY + 20);
  ctx.stroke();

  catEars(0, baseY - 205);
  ctx.strokeStyle = 'rgba(80,80,90,0.6)';
  ctx.lineWidth = 2;
  for (const dy of [-6, 4, 14]) {
    ctx.beginPath();
    ctx.moveTo(-38, baseY - 132 + dy);
    ctx.lineTo(-92, baseY - 136 + dy);
    ctx.moveTo(38, baseY - 132 + dy);
    ctx.lineTo(92, baseY - 136 + dy);
    ctx.stroke();
  }

  drawEyes(0, baseY - 153, blink, 0);

  ctx.fillStyle = '#e58fae';
  ctx.beginPath();
  ctx.ellipse(0, baseY - 122, 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  drawMouth(0, baseY - 108, mouthOpen, 0.5);

  ctx.restore();
}

function drawDog(x, baseY, opts) {
  const { bob, blink, lookUp, holdingBook } = opts;

  ctx.save();
  ctx.translate(x, bob);
  ctx.rotate(lookUp * -0.05);

  ctx.fillStyle = '#e3a857';
  ctx.beginPath();
  ctx.moveTo(-140, baseY);
  ctx.quadraticCurveTo(-140, baseY - 200, 0, baseY - 210);
  ctx.quadraticCurveTo(140, baseY - 200, 140, baseY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fff3dd';
  ctx.beginPath();
  ctx.ellipse(0, baseY - 40, 76, 58, 0, 0, Math.PI);
  ctx.fill();

  if (holdingBook > 0) {
    ctx.save();
    ctx.translate(0, baseY - 70);
    ctx.rotate(-0.15 + lookUp * 0.25);
    ctx.fillStyle = '#e8f0ff';
    roundRect(-46, -34, 92, 68, 4);
    ctx.fill();
    ctx.strokeStyle = '#4f7fc4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(0, 30);
    ctx.stroke();
    ctx.strokeStyle = '#9fb8dd';
    ctx.lineWidth = 2;
    for (const ly of [-14, -2, 10, 22]) {
      ctx.beginPath();
      ctx.moveTo(-38, ly);
      ctx.lineTo(-8, ly);
      ctx.moveTo(8, ly);
      ctx.lineTo(38, ly);
      ctx.stroke();
    }
    ctx.restore();
  }

  ctx.strokeStyle = '#e3a857';
  ctx.lineWidth = 24;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-100, baseY - 90);
  ctx.lineTo(-55, baseY - 120 + lookUp * 10);
  ctx.moveTo(100, baseY - 90);
  ctx.lineTo(55, baseY - 120 + lookUp * 10);
  ctx.stroke();

  dogEars(0, baseY - 195);

  drawEyes(0, baseY - 130 + lookUp * 6, blink, 0);

  ctx.fillStyle = '#2b2b2b';
  ctx.beginPath();
  ctx.ellipse(0, baseY - 98 + lookUp * 6, 10, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  drawMouth(0, baseY - 86 + lookUp * 6, 0, 0.6 + lookUp * 0.4);

  ctx.restore();
}

function drawSpeechBubble(x, y, text, pop) {
  if (pop <= 0) return;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(pop, pop);
  ctx.translate(-x, -y);
  ctx.font = '32px "Hiragino Sans", "Noto Sans JP", sans-serif';
  const padX = 28, padY = 16;
  const w = ctx.measureText(text).width + padX * 2;
  const h = 58;
  const bx = x - w / 2, by = y - h - 20;

  ctx.fillStyle = 'rgba(255,255,255,0.97)';
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 3;
  roundRect(bx, by, w, h, 18);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 12, by + h);
  ctx.lineTo(x, by + h + 18);
  ctx.lineTo(x + 12, by + h);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.97)';
  ctx.fill();
  ctx.strokeStyle = '#222';
  ctx.stroke();

  ctx.fillStyle = '#1c1c1c';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, by + h / 2 + 2);
  ctx.restore();
}

function popAmount(elapsed, start, holdEnd, end) {
  if (elapsed < start || elapsed > end) return 0;
  if (elapsed < start + 300) return easeOutBack(clamp01((elapsed - start) / 300));
  if (elapsed > holdEnd) return clamp01(1 - (elapsed - holdEnd) / (end - holdEnd));
  return 1;
}

const CAT_START_X = -150, CAT_STOP_X = 660;
const WALK_START = 300, WALK_END = 3200;

function frame(now) {
  if (window.__startTime === undefined) window.__startTime = now;
  const elapsed = now - window.__startTime;

  ctx.clearRect(0, 0, W, H);
  drawBackground(elapsed);

  const idleBobDog = Math.sin(elapsed / 900) * 4;
  const dogLookUp = clamp01((elapsed - 3900) / 500);
  const dogBlink = blinkAmount(elapsed, 300, 2600);

  drawDog(260, 560, {
    bob: idleBobDog, blink: dogBlink, lookUp: dogLookUp, holdingBook: 1,
  });

  const walkT = easeOutCubic(clamp01((elapsed - WALK_START) / (WALK_END - WALK_START)));
  const catX = elapsed < WALK_END ? lerp(CAT_START_X, CAT_STOP_X, walkT) : CAT_STOP_X;
  const walking = elapsed >= WALK_START && elapsed < WALK_END - 150;
  const walkPhase = elapsed / 110;
  const idleBobCat = walking ? 0 : Math.sin((elapsed - WALK_END) / 850) * 3;
  const settleT = clamp01((elapsed - (WALK_END - 150)) / 400);
  const tilt = walking
    ? Math.sin(walkPhase) * 0.03
    : (elapsed >= 7000 && elapsed < 9800 ? Math.sin((elapsed - 7000) / 260) * 0.05 * clamp01((9800 - elapsed) / 400) : 0);

  const waveAmount = elapsed >= 3700 && elapsed < 6600
    ? Math.max(0, Math.sin((elapsed - 3700) / 260)) * clamp01((6600 - elapsed) / 500)
    : 0;

  const catTalking1 = elapsed >= 4200 && elapsed < 6600;
  const catTalking2 = elapsed >= 7000 && elapsed < 9600;
  const mouthOpenCat = (catTalking1 || catTalking2)
    ? 0.3 + 0.3 * Math.sin(elapsed / 65) : 0;
  const catBlink = blinkAmount(elapsed, 900, 3100);

  drawCat(catX, 560, {
    tilt, bob: idleBobCat - (1 - easeOutCubic(settleT)) * 0 , walkPhase, walking,
    armWave: waveAmount, mouthOpen: Math.max(0, mouthOpenCat), blink: catBlink,
    sitting: false,
  });

  const bubble1 = popAmount(elapsed, 4200, 6200, 6700);
  drawSpeechBubble(catX, 340, 'こんにちは!', bubble1);

  const bubble2 = popAmount(elapsed, 7000, 9300, 9800);
  drawSpeechBubble(catX, 340, 'なにしてるの?', bubble2);

  if (elapsed < TOTAL_DURATION) {
    requestAnimationFrame(frame);
  } else {
    window.__ANIME_DONE__ = true;
  }
}

requestAnimationFrame(frame);
