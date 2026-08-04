const canvas = document.getElementById('stage');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

const TOTAL_DURATION = 17000;
window.TOTAL_DURATION = TOTAL_DURATION;
window.__ANIME_DONE__ = false;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (t) => Math.max(0, Math.min(1, t));
const easeInOut = (t) => t * t * (3 - 2 * t);

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lerpColor(c1, c2, t) {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  const r = Math.round(lerp(a[0], b[0], t));
  const g = Math.round(lerp(a[1], b[1], t));
  const bl = Math.round(lerp(a[2], b[2], t));
  return `rgb(${r},${g},${bl})`;
}

const petals = [];
for (let i = 0; i < 45; i++) {
  petals.push({
    x: Math.random() * W,
    y: -Math.random() * H * 2,
    r: 4 + Math.random() * 5,
    speed: 25 + Math.random() * 25,
    sway: 20 + Math.random() * 30,
    swaySpeed: 0.5 + Math.random() * 0.7,
    phase: Math.random() * Math.PI * 2,
    spin: Math.random() * Math.PI * 2,
    spinSpeed: (Math.random() - 0.5) * 2,
  });
}

function drawSky(t) {
  const skyT = easeInOut(clamp01(t / 6000));
  const top = lerpColor('#0b1026', '#8fd3ff', skyT);
  const bottom = lerpColor('#2a2f6d', '#eaf6ff', skyT);
  const g = ctx.createLinearGradient(0, 0, 0, H * 0.85);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  if (skyT < 0.9) {
    ctx.save();
    ctx.globalAlpha = 1 - skyT;
    ctx.fillStyle = '#ffffff';
    const stars = [[80, 60], [200, 120], [340, 40], [500, 90], [640, 50],
                   [760, 130], [900, 70], [1040, 100], [1150, 45], [1200, 150],
                   [420, 160], [980, 160]];
    for (const [sx, sy] of stars) {
      ctx.beginPath();
      ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  const bodyY = lerp(650, 110, easeInOut(clamp01(t / 6500)));
  const bodyColor = lerpColor('#f5f3ce', '#ffd558', skyT);
  ctx.save();
  ctx.shadowColor = bodyColor;
  ctx.shadowBlur = lerp(10, 40, skyT);
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.arc(1000, bodyY, 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawMountains() {
  ctx.fillStyle = '#8fa3c9';
  ctx.beginPath();
  ctx.moveTo(0, 560);
  ctx.lineTo(180, 440);
  ctx.lineTo(360, 560);
  ctx.lineTo(560, 460);
  ctx.lineTo(760, 560);
  ctx.lineTo(760, 620);
  ctx.lineTo(0, 620);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#a9bbdd';
  ctx.beginPath();
  ctx.moveTo(500, 580);
  ctx.lineTo(720, 480);
  ctx.lineTo(940, 580);
  ctx.lineTo(1160, 490);
  ctx.lineTo(1280, 580);
  ctx.lineTo(1280, 630);
  ctx.lineTo(500, 630);
  ctx.closePath();
  ctx.fill();
}

function drawGround() {
  const g = ctx.createLinearGradient(0, 600, 0, H);
  g.addColorStop(0, '#8fd989');
  g.addColorStop(1, '#5fb35a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 600, W, H - 600);
}

function drawTree() {
  ctx.fillStyle = '#7a5230';
  ctx.fillRect(150, 400, 34, 230);
  const blobs = [[165, 360, 78], [110, 400, 55], [225, 400, 58], [165, 320, 55]];
  ctx.fillStyle = '#ffc1d9';
  for (const [bx, by, br] of blobs) {
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#ffaecb';
  ctx.beginPath();
  ctx.arc(150, 380, 30, 0, Math.PI * 2);
  ctx.arc(210, 350, 26, 0, Math.PI * 2);
  ctx.fill();
}

function updatePetals(elapsed, dt) {
  for (const p of petals) {
    p.y += p.speed * dt;
    p.x += Math.sin(elapsed / 1000 * p.swaySpeed + p.phase) * p.sway * dt;
    p.spin += p.spinSpeed * dt;
    if (p.y > H + 20) {
      p.y = -20 - Math.random() * 100;
      p.x = Math.random() * W;
    }
  }
}

function drawPetals() {
  ctx.fillStyle = '#ffc9de';
  for (const p of petals) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.spin);
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawCharacter(x, feetY, opts) {
  const { hair, dress, skin = '#ffe0bd', walkPhase, walking, talking,
          blink, waveAmount, style } = opts;

  const bob = walking ? Math.abs(Math.sin(walkPhase)) * 6 : 0;
  const headY = feetY - 150 - bob;
  const bodyTopY = headY + 42;
  const bodyBottomY = feetY - 40 - bob;

  ctx.save();
  ctx.translate(x, 0);

  const legSwing = walking ? Math.sin(walkPhase) * 14 : 0;
  ctx.strokeStyle = skin;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-14, bodyBottomY);
  ctx.lineTo(-14 + legSwing, feetY);
  ctx.moveTo(14, bodyBottomY);
  ctx.lineTo(14 - legSwing, feetY);
  ctx.stroke();

  ctx.fillStyle = dress;
  ctx.beginPath();
  ctx.moveTo(-34, bodyBottomY);
  ctx.lineTo(-24, bodyTopY);
  ctx.lineTo(24, bodyTopY);
  ctx.lineTo(34, bodyBottomY);
  ctx.closePath();
  ctx.fill();

  const armSwing = walking ? Math.sin(walkPhase + Math.PI) * 10 : 0;
  ctx.strokeStyle = dress;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(-26, bodyTopY + 8);
  if (waveAmount > 0) {
    const wx = -26 - 20;
    const wy = bodyTopY + 8 - 60 * waveAmount;
    ctx.lineTo(wx, wy);
  } else {
    ctx.lineTo(-30 + armSwing, bodyBottomY - 10);
  }
  ctx.moveTo(26, bodyTopY + 8);
  ctx.lineTo(30 - armSwing, bodyBottomY - 10);
  ctx.stroke();

  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(0, headY, 40, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffb3c6';
  ctx.beginPath();
  ctx.arc(-24, headY + 12, 7, 0, Math.PI * 2);
  ctx.arc(24, headY + 12, 7, 0, Math.PI * 2);
  ctx.fill();

  const eyeH = blink ? 1.5 : 12;
  for (const ex of [-16, 16]) {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(ex, headY + 2, 9, eyeH, 0, 0, Math.PI * 2);
    ctx.fill();
    if (!blink) {
      ctx.fillStyle = style.eyeColor;
      ctx.beginPath();
      ctx.ellipse(ex, headY + 4, 6, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.ellipse(ex, headY + 5, 3, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(ex + 2, headY, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.strokeStyle = '#a15c3a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  if (talking) {
    ctx.ellipse(0, headY + 22, 6, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#a15c3a';
    ctx.fill();
  } else {
    ctx.arc(0, headY + 16, 8, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
  }

  style.drawHair(ctx, headY, hair);

  ctx.restore();
}

function girlHair(ctx, headY, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, headY - 8, 42, Math.PI, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-40, headY + 30, 12, 34, -0.2, 0, Math.PI * 2);
  ctx.ellipse(40, headY + 30, 12, 34, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-14, headY - 30);
  ctx.quadraticCurveTo(0, headY - 46, 14, headY - 30);
  ctx.quadraticCurveTo(0, headY - 20, -14, headY - 30);
  ctx.fill();
}

function boyHair(ctx, headY, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, headY - 6, 41, Math.PI, 2 * Math.PI);
  ctx.fill();
  const spikes = [[-30, -8], [-12, -20], [8, -22], [26, -6], [-2, -14]];
  for (const [sx, sy] of spikes) {
    ctx.beginPath();
    ctx.moveTo(sx - 8, headY - 4);
    ctx.lineTo(sx, headY + sy - 22);
    ctx.lineTo(sx + 8, headY - 4);
    ctx.closePath();
    ctx.fill();
  }
}

function drawSpeechBubble(x, y, text, alpha) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = '28px "Hiragino Sans", "Noto Sans JP", sans-serif';
  const padX = 22, padY = 14;
  const metrics = ctx.measureText(text);
  const w = metrics.width + padX * 2;
  const h = 48;
  const bx = x - w / 2, by = y - h - 16;

  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2.5;
  roundRect(ctx, bx, by, w, h, 14);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - 10, by + h);
  ctx.lineTo(x, by + h + 14);
  ctx.lineTo(x + 10, by + h);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.stroke();

  ctx.fillStyle = '#222';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, by + h / 2 + 2);
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawTitle(text, alpha, y) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.fillRect(0, y - 46, W, 92);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 46px "Hiragino Sans", "Noto Sans JP", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, W / 2, y);
  ctx.restore();
}

const girlStyle = { eyeColor: '#7a4fbf', drawHair: girlHair };
const boyStyle = { eyeColor: '#3f7fbf', drawHair: boyHair };

const GIRL_START_X = -100, GIRL_END_X = 430;
const GIRL_WALK_START = 1500, GIRL_WALK_END = 5000;

const BOY_START_X = 1380, BOY_END_X = 760;
const BOY_WALK_START = 4000, BOY_WALK_END = 7500;

function isBlinking(elapsed, offset) {
  const cycle = (elapsed + offset) % 3000;
  return cycle > 2820;
}

let lastTime = null;

function frame(now) {
  if (window.__startTime === undefined) window.__startTime = now;
  const elapsed = now - window.__startTime;
  const dt = lastTime === null ? 0 : (now - lastTime) / 1000;
  lastTime = now;

  ctx.clearRect(0, 0, W, H);
  drawSky(elapsed);
  drawMountains();
  drawGround();
  drawTree();

  const girlT = easeInOut(clamp01((elapsed - GIRL_WALK_START) / (GIRL_WALK_END - GIRL_WALK_START)));
  const girlX = lerp(GIRL_START_X, GIRL_END_X, girlT);
  const girlWalking = elapsed >= GIRL_WALK_START && elapsed < GIRL_WALK_END;
  const girlTalking = elapsed >= 7800 && elapsed < 10500 && Math.floor(elapsed / 150) % 2 === 0;
  const girlWave = elapsed >= 13000 && elapsed < 16200
    ? Math.max(0, Math.sin((elapsed - 13000) / 300)) : 0;

  const boyT = easeInOut(clamp01((elapsed - BOY_WALK_START) / (BOY_WALK_END - BOY_WALK_START)));
  const boyX = lerp(BOY_START_X, BOY_END_X, boyT);
  const boyWalking = elapsed >= BOY_WALK_START && elapsed < BOY_WALK_END;
  const boyTalking = elapsed >= 10600 && elapsed < 13000 && Math.floor(elapsed / 150) % 2 === 0;
  const boyWave = elapsed >= 13000 && elapsed < 16200
    ? Math.max(0, Math.sin((elapsed - 13000) / 300 + Math.PI)) : 0;

  drawCharacter(girlX, 600, {
    hair: '#ff8fab', dress: '#ff6f91', skin: '#ffe0bd',
    walkPhase: elapsed / 130, walking: girlWalking,
    talking: girlTalking, blink: isBlinking(elapsed, 0),
    waveAmount: girlWave, style: girlStyle,
  });

  drawCharacter(boyX, 610, {
    hair: '#33395c', dress: '#4f86c6', skin: '#ffe0bd',
    walkPhase: elapsed / 130 + Math.PI, walking: boyWalking,
    talking: boyTalking, blink: isBlinking(elapsed, 900),
    waveAmount: boyWave, style: boyStyle,
  });

  updatePetals(elapsed, dt);
  drawPetals();

  if (elapsed >= 7800 && elapsed < 10500) {
    const a = clamp01(Math.min(elapsed - 7800, 10500 - elapsed) / 300);
    drawSpeechBubble(girlX, 440, 'おはよう!', a);
  }
  if (elapsed >= 10600 && elapsed < 13000) {
    const a = clamp01(Math.min(elapsed - 10600, 13000 - elapsed) / 300);
    drawSpeechBubble(boyX, 450, 'おはよう、今日もいい天気だね', a);
  }

  const introAlpha = clamp01(Math.min(elapsed, 1800 - elapsed) / 600);
  if (elapsed < 2600) drawTitle('初めての朝', clamp01(introAlpha), 120);

  if (elapsed >= 15000) {
    const outroAlpha = clamp01((elapsed - 15000) / 800);
    drawTitle('また明日', outroAlpha, H - 100);
  }

  if (elapsed < TOTAL_DURATION) {
    requestAnimationFrame(frame);
  } else {
    window.__ANIME_DONE__ = true;
  }
}

requestAnimationFrame(frame);
