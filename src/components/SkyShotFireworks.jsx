import React, { useEffect, useRef } from 'react';
import '../styles/SkyShotFireworks.css';

// Fiery Sivakasi Skyshot Palettes (Dominantly Red, Yellow, Orange with Glowing White Hot Cores)
const FIERY_PALETTES = [
  // 1. Classic Tri-Color Diwali Blast: Brilliant Red, Golden Yellow & Sizzling Orange
  [
    { color: '#ff2222', core: '#ff8888', weight: 0.35 }, // Crimson Red
    { color: '#ffd700', core: '#fff59d', weight: 0.35 }, // Pure Gold Yellow
    { color: '#ff7700', core: '#ffbb77', weight: 0.30 }  // Fiery Orange
  ],
  // 2. Golden Willow with Ruby Red Tips
  [
    { color: '#ffcc00', core: '#ffffff', weight: 0.40 }, // Golden Shimmer
    { color: '#ff1744', core: '#ff8a80', weight: 0.40 }, // Ruby Red
    { color: '#ff9100', core: '#ffe082', weight: 0.20 }  // Amber Orange
  ],
  // 3. Sizzling Orange & Yellow Sunset Fire
  [
    { color: '#ff5500', core: '#ffa726', weight: 0.40 }, // Deep Flame Orange
    { color: '#ffea00', core: '#ffffff', weight: 0.40 }, // Bright Electric Yellow
    { color: '#d50000', core: '#ff5252', weight: 0.20 }  // Intense Fire Red
  ],
  // 4. Crackling Golden Peony with Red Sparks
  [
    { color: '#ffd700', core: '#ffffff', weight: 0.45 }, // Shimmering Gold
    { color: '#ff3d00', core: '#ffab91', weight: 0.35 }, // Red-Orange Blaze
    { color: '#ffab00', core: '#ffe57f', weight: 0.20 }  // Warm Yellow Amber
  ]
];

const SkyShotFireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let launchIntervalId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    // Handle high-DPI crisp canvas sizing
    const handleResize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const rockets = [];
    const rocketTailSparks = [];
    const blastParticles = [];
    const blastFlashes = [];

    // Launch a realistic Sivakasi SkyShot from the bottom
    const launchSkyShot = () => {
      // Pick random horizontal launch point (15% to 85% of screen width)
      const startX = width * (0.15 + Math.random() * 0.7);
      const startY = height;

      // Explode at realistic upper sky heights (15% to 40% of screen height)
      const targetY = height * (0.15 + Math.random() * 0.25);
      const targetX = startX + (Math.random() - 0.5) * (width * 0.1);

      // Random fiery palette
      const palette = FIERY_PALETTES[Math.floor(Math.random() * FIERY_PALETTES.length)];

      rockets.push({
        x: startX,
        y: startY,
        startX,
        startY,
        targetX,
        targetY,
        vx: (targetX - startX) / 42,
        vy: -12 - Math.random() * 2.5, // High initial upward velocity
        palette,
        history: [],
        alive: true
      });
    };

    // Explode into a realistic spherical fireworks blast
    const explodeRocket = (rocket) => {
      // 1. Intense explosion center flash (illumination shockwave)
      blastFlashes.push({
        x: rocket.x,
        y: rocket.y,
        radius: 8,
        maxRadius: 45 + Math.random() * 20,
        alpha: 1,
        color: '#ffffff'
      });

      // 2. Generate 90 to 130 explosive fiery sparks (Red, Yellow, Orange)
      const particleCount = 95 + Math.floor(Math.random() * 35);
      const palette = rocket.palette;

      for (let i = 0; i < particleCount; i++) {
        // True 3D spherical distribution mapped to 2D
        const angle = Math.random() * Math.PI * 2;
        // Outer bursting stars vs inner crackling embers
        const speed = 2.5 + Math.pow(Math.random(), 0.8) * 7.5;

        // Weighted color selection from chosen fiery palette
        const rand = Math.random();
        let cumulative = 0;
        let chosenColor = palette[0];
        for (const item of palette) {
          cumulative += item.weight;
          if (rand <= cumulative) {
            chosenColor = item;
            break;
          }
        }

        blastParticles.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: chosenColor.color,
          coreColor: chosenColor.core,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.012, // Long lingering trails (1.5s - 2.5s)
          size: 2.2 + Math.random() * 1.8,
          trail: [],
          twinkle: Math.random() > 0.35, // Strobe / crackle effect
          gravity: 0.07 + Math.random() * 0.03, // Natural gravitational pull
          drag: 0.962 // Realistic air resistance
        });
      }
    };

    // Main animation rendering loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Additive blending for realistic fire & light luminosity
      ctx.globalCompositeOperation = 'lighter';

      // =========================================================
      // 1. UPDATE & DRAW FLASHES (EXPLOSION IMPACT)
      // =========================================================
      for (let i = blastFlashes.length - 1; i >= 0; i--) {
        const f = blastFlashes[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 245, 200, ${f.alpha})`;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.restore();

        f.radius += (f.maxRadius - f.radius) * 0.35;
        f.alpha -= 0.14;
        if (f.alpha <= 0) {
          blastFlashes.splice(i, 1);
        }
      }

      // =========================================================
      // 2. UPDATE & DRAW ASCENDING ROCKETS WITH FIERY TAIL
      // =========================================================
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];

        // Store rocket historical path
        r.history.push({ x: r.x, y: r.y });
        if (r.history.length > 8) r.history.shift();

        // --- Continuous Embers / Sparks Ejecting from Rocket Base (THE TAIL) ---
        // As rocket shoots up, 3 to 5 sparks drop down every frame
        for (let s = 0; s < 4; s++) {
          const sparkAngle = Math.PI / 2 + (Math.random() - 0.5) * 0.6; // Downward cone
          const sparkSpeed = 1.5 + Math.random() * 3.5;
          const colors = ['#ffffff', '#ffd700', '#ff8800', '#ff3300'];
          rocketTailSparks.push({
            x: r.x + (Math.random() - 0.5) * 3,
            y: r.y + Math.random() * 4,
            vx: Math.cos(sparkAngle) * sparkSpeed + r.vx * 0.2,
            vy: Math.sin(sparkAngle) * sparkSpeed,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: 0.04 + Math.random() * 0.05,
            size: 1.5 + Math.random() * 1.8
          });
        }

        // Draw ascending thrust flame streak (elongated rocket head & jet)
        ctx.save();
        if (r.history.length > 1) {
          ctx.beginPath();
          ctx.moveTo(r.history[0].x, r.history[0].y);
          for (let h = 1; h < r.history.length; h++) {
            ctx.lineTo(r.history[h].x, r.history[h].y);
          }
          ctx.strokeStyle = '#ffd700';
          ctx.lineWidth = 3.5;
          ctx.shadowColor = '#ff6a00';
          ctx.shadowBlur = 15;
          ctx.stroke();

          // White-hot center line
          ctx.beginPath();
          ctx.moveTo(r.history[0].x, r.history[0].y);
          for (let h = 1; h < r.history.length; h++) {
            ctx.lineTo(r.history[h].x, r.history[h].y);
          }
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.stroke();
        }

        // Rocket head (bright blazing projectile point)
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffcc00';
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.restore();

        // Physics update
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.15; // Gravity slows rocket as it nears explosion point

        // Check apex reached
        if (r.y <= r.targetY || r.vy >= 0) {
          explodeRocket(r);
          rockets.splice(i, 1);
        }
      }

      // =========================================================
      // 3. DRAW & UPDATE ROCKET TAIL SPARKS (FALLING BEHIND ASCENT)
      // =========================================================
      for (let i = rocketTailSparks.length - 1; i >= 0; i--) {
        const sp = rocketTailSparks[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.shadowColor = sp.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Spark physics
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.08; // Gravity
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          rocketTailSparks.splice(i, 1);
        }
      }

      // =========================================================
      // 4. DRAW & UPDATE BLAST PARTICLES (RED, YELLOW, ORANGE)
      // =========================================================
      for (let i = blastParticles.length - 1; i >= 0; i--) {
        const p = blastParticles[i];

        // Store past positions for weeping willow light streaks
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        ctx.save();

        // Draw realistic glowing light trail streak behind each star
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.75;
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.stroke();
        }

        // Crackling twinkle factor
        let currentAlpha = p.alpha;
        if (p.twinkle && Math.random() < 0.22) {
          currentAlpha = Math.max(0.1, p.alpha * 0.35); // Strobe flash
        }

        // Draw glowing particle star head
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();

        // White-hot incandescent core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = p.coreColor || '#ffffff';
        ctx.globalAlpha = currentAlpha * 0.9;
        ctx.fill();

        ctx.restore();

        // Realistic particle aerodynamics & gravity
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity; // Gravity gracefully curves sparks into falling cascades
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          blastParticles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Start render loop
    animationFrameId = requestAnimationFrame(render);

    // Initial blast after 400ms so user sees it right away
    const initialTimer = setTimeout(() => {
      launchSkyShot();
    }, 400);

    // Launch a new realistic SkyShot every 3 seconds (3000ms) infinitely
    launchIntervalId = setInterval(() => {
      if (!document.hidden) {
        launchSkyShot();
      }
    }, 3000);

    // Cleanup on unmount
    return () => {
      clearTimeout(initialTimer);
      clearInterval(launchIntervalId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="skyshot-canvas" aria-hidden="true" />;
};

export default SkyShotFireworks;
