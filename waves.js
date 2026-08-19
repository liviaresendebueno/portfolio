const canvas = document.getElementById('liquidDivider');

if (canvas) {
  const ctx = canvas.getContext('2d');

  let W = 0;
  let H = 0;
  let DPR = 1;

  const layers = [
    {
      y: 95,
      thickness: 110,
      ampA: 16,
      ampB: 9,
      freqA: 0.010,
      freqB: 0.0045,
      speed: 0.75,
      phase: 0.2,
      alpha: 0.16,
      colors: ['#5B476D', '#9C84B4'],
      highlight: 'rgba(255,255,255,0.06)',
      blur: 0
    },
    {
      y: 125,
      thickness: 135,
      ampA: 22,
      ampB: 12,
      freqA: 0.0088,
      freqB: 0.0040,
      speed: 0.95,
      phase: 1.6,
      alpha: 0.28,
      colors: ['#B89BD2', '#DCC8EA'],
      highlight: 'rgba(255,255,255,0.10)',
      blur: 6
    },
    {
      y: 145,
      thickness: 240,
      ampA: 26,
      ampB: 15,
      freqA: 0.0078,
      freqB: 0.0036,
      speed: 1.15,
      phase: 3.0,
      alpha: 1,
      colors: ['#F4EAF8', '#FAF6FD'],
      highlight: 'rgba(255,255,255,0.20)',
      blur: 10
    }
  ];

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);

    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;

    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  window.addEventListener('resize', resize);
  resize();

  function getTopY(x, layer, t, sway) {
    return (
      layer.y +
      sway +
      Math.sin(x * layer.freqA + t * layer.speed + layer.phase) * layer.ampA +
      Math.cos(x * layer.freqB - t * layer.speed * 0.65 + layer.phase) * layer.ampB
    );
  }

  function getBottomY(x, layer, t, sway) {
    return (
      layer.y +
      layer.thickness +
      sway * 0.35 +
      Math.sin(x * (layer.freqA * 0.92) + t * (layer.speed * 0.88) + layer.phase + 1.6) * (layer.ampA * 0.62) +
      Math.cos(x * (layer.freqB * 1.12) - t * (layer.speed * 0.5) + layer.phase + 0.8) * (layer.ampB * 0.55)
    );
  }

  function traceSmoothLine(points, moveToStart = false) {
    if (!points.length) return;

    if (moveToStart) {
      ctx.moveTo(points[0].x, points[0].y);
    } else {
      ctx.lineTo(points[0].x, points[0].y);
    }

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];

      const mx = (p0.x + p1.x) / 2;
      const my = (p0.y + p1.y) / 2;

      ctx.quadraticCurveTo(p0.x, p0.y, mx, my);
    }

    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);
  }

  function drawLayer(layer, t) {
    const samples = Math.max(40, Math.floor(W / 28));

    const topPoints = [];
    const bottomPoints = [];

    // faz o conjunto inteiro “respirar”
    const sway = Math.sin(t * 0.9 + layer.phase) * 10;

    for (let i = 0; i <= samples; i++) {
      const x = (W / samples) * i;

      topPoints.push({
        x,
        y: getTopY(x, layer, t, sway)
      });

      bottomPoints.push({
        x,
        y: getBottomY(x, layer, t, sway)
      });
    }

    const bottomReversed = [...bottomPoints].reverse();

    const grad = ctx.createLinearGradient(
      0,
      layer.y - 25,
      0,
      layer.y + layer.thickness + 50
    );

    grad.addColorStop(0, layer.colors[0]);
    grad.addColorStop(1, layer.colors[1]);

    ctx.save();
    ctx.globalAlpha = layer.alpha;
    ctx.shadowColor = layer.colors[1];
    ctx.shadowBlur = layer.blur;

    ctx.beginPath();
    traceSmoothLine(topPoints, true);
    traceSmoothLine(bottomReversed, false);
    ctx.closePath();

    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // brilho na borda superior
    ctx.save();
    ctx.beginPath();
    traceSmoothLine(topPoints, true);
    ctx.strokeStyle = layer.highlight;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  function drawAmbientGlow(t) {
    const glowX = W * 0.72 + Math.sin(t * 0.4) * 40;
    const glowY = H * 0.35 + Math.cos(t * 0.55) * 10;

    const radial = ctx.createRadialGradient(
      glowX, glowY, 10,
      glowX, glowY, H * 0.55
    );

    radial.addColorStop(0, 'rgba(249,232,238,0.20)');
    radial.addColorStop(1, 'rgba(249,232,238,0)');

    ctx.save();
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function frame(ms) {
    const t = ms * 0.001;

    ctx.clearRect(0, 0, W, H);

    /* FUNDO DO DIVIDER
       Isso evita que o topo reto da próxima seção apareça
       por trás das waves */
    const bg = ctx.createLinearGradient(0, 0, 0, H);

    bg.addColorStop(0, 'rgba(86, 59, 112, 0)');
    bg.addColorStop(0.45, 'rgba(181, 145, 206, 0.18)');
    bg.addColorStop(0.75, '#F2E7F7');
    bg.addColorStop(1, '#FAF6FD');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    drawAmbientGlow(t);

    for (const layer of layers) {
      drawLayer(layer, t);
    }


    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}