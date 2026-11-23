/* =========================================================
   Animaciones propias de la Edad de Piedra
   - Dinosaurio bebé original (verde, placas naranjas, gorrito)
   - Pterodáctilos volando
   - Confeti con la paleta de la invitación
   Todos los dibujos son originales, hechos en SVG.
   ========================================================= */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Dibujos SVG ---------- */
const INK = "#3B2614";

function dinoSVG() {
  return `
<svg class="dino" viewBox="0 -12 220 182" aria-hidden="true" focusable="false">
  <g class="dino__bob">
    <!-- patas de atrás -->
    <rect class="dino__leg dino__leg--b" x="70" y="114" width="22" height="36" rx="10" fill="#4E9A3A" stroke="${INK}" stroke-width="4"/>
    <rect class="dino__leg dino__leg--a" x="118" y="114" width="22" height="36" rx="10" fill="#4E9A3A" stroke="${INK}" stroke-width="4"/>

    <!-- placas del lomo -->
    <g fill="#F28C28" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round">
      <path d="M56 82 L64 58 L80 74Z"/>
      <path d="M76 70 L88 44 L102 66Z"/>
      <path d="M98 64 L112 40 L124 66Z"/>
      <path d="M124 48 L132 26 L146 40Z"/>
    </g>

    <!-- contorno (debajo) -->
    <g fill="${INK}" stroke="${INK}" stroke-width="8" stroke-linejoin="round">
      <path class="dino__tail" d="M62 92 Q24 92 6 62 Q14 102 66 118 Z"/>
      <ellipse cx="100" cy="100" rx="50" ry="38"/>
      <ellipse cx="152" cy="60" rx="34" ry="30"/>
      <ellipse cx="180" cy="70" rx="26" ry="19"/>
    </g>
    <!-- relleno -->
    <g fill="#6CC24A">
      <path class="dino__tail" d="M62 92 Q24 92 6 62 Q14 102 66 118 Z"/>
      <ellipse cx="100" cy="100" rx="50" ry="38"/>
      <ellipse cx="152" cy="60" rx="34" ry="30"/>
      <ellipse cx="180" cy="70" rx="26" ry="19"/>
    </g>

    <!-- panza y manchitas -->
    <ellipse cx="110" cy="112" rx="30" ry="21" fill="#D4EE9A"/>
    <circle cx="78" cy="92" r="5" fill="#57A83A"/>
    <circle cx="92" cy="80" r="3.5" fill="#57A83A"/>
    <circle cx="70" cy="106" r="3" fill="#57A83A"/>

    <!-- bracito -->
    <ellipse cx="140" cy="104" rx="6" ry="11" transform="rotate(-35 140 104)" fill="#6CC24A" stroke="${INK}" stroke-width="3"/>

    <!-- cara -->
    <ellipse cx="170" cy="76" rx="7" ry="4.5" fill="#F28DB2" opacity=".75"/>
    <g class="dino__eye">
      <ellipse cx="158" cy="52" rx="10" ry="12" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <circle cx="161" cy="54" r="6" fill="${INK}"/>
      <circle cx="163.5" cy="51" r="2.2" fill="#fff"/>
    </g>
    <circle cx="199" cy="64" r="2.2" fill="${INK}"/>
    <path d="M176 80 Q189 90 202 76" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>

    <!-- patas de adelante -->
    <rect class="dino__leg dino__leg--a" x="82" y="118" width="24" height="36" rx="11" fill="#6CC24A" stroke="${INK}" stroke-width="4"/>
    <rect class="dino__leg dino__leg--b" x="128" y="116" width="24" height="36" rx="11" fill="#6CC24A" stroke="${INK}" stroke-width="4"/>

    <!-- gorrito de cumpleaños -->
    <g transform="rotate(-14 142 30)">
      <path d="M126 36 L142 -4 L158 34 Z" fill="#56B4E0" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M131 24 L153 22 M136 12 L148 11" stroke="#F28C28" stroke-width="4" stroke-linecap="round"/>
      <circle cx="142" cy="-4" r="6" fill="#FFF4DE" stroke="${INK}" stroke-width="3"/>
    </g>
  </g>
</svg>`;
}

function pteroSVG() {
  return `
<svg class="ptero" viewBox="0 -6 160 92" aria-hidden="true" focusable="false">
  <path class="ptero__wing ptero__wing--back" d="M82 50 Q72 10 30 4 Q56 34 66 58Z" fill="#9C4E1C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M62 56 L42 62 L62 62Z" fill="#E07B2C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <ellipse cx="84" cy="56" rx="24" ry="11" fill="#E07B2C" stroke="${INK}" stroke-width="3"/>
  <path d="M80 66 L76 76 M90 66 L88 76" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  <path d="M102 42 L82 28 L100 50Z" fill="#E07B2C" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M114 44 L150 50 L114 55Z" fill="#FFB25B" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="108" cy="48" r="10" fill="#E07B2C" stroke="${INK}" stroke-width="3"/>
  <circle cx="111" cy="46" r="2.6" fill="${INK}"/>
  <path class="ptero__wing ptero__wing--front" d="M90 52 Q88 8 50 0 Q70 32 74 60Z" fill="#F28C28" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
</svg>`;
}

function drawArt() {
  document.querySelectorAll("[data-dino]").forEach((el) => (el.innerHTML = dinoSVG()));
  document.querySelectorAll("[data-ptero]").forEach((el) => (el.innerHTML = pteroSVG()));
}

/* ---------- Confeti ---------- */
const Confetti = (() => {
  const colors = ["#F28C28", "#1F5F99", "#56B4E0", "#FFF4DE", "#6CC24A", "#E2492F", "#FFB25B"];
  let canvas, ctx, raf = 0, w = 0, h = 0;
  let parts = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function setup() {
    if (canvas) return;
    canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    parts = parts.filter((p) => p.life-- > 0 && p.y < h + 40);

    for (const p of parts) {
      p.vx *= 0.985;
      p.vy = p.vy * 0.985 + 0.32;
      p.x += p.vx + Math.sin(p.tilt) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;
      p.tilt += 0.12;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.tilt)); // efecto de "papelito" girando
      ctx.fillStyle = p.color;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.5;
      const s = p.size;
      ctx.beginPath();
      if (p.shape === 0) ctx.rect(-s / 2, -s / 3, s, s * 0.66);
      else if (p.shape === 1) { ctx.moveTo(0, -s / 2); ctx.lineTo(s / 2, s / 2); ctx.lineTo(-s / 2, s / 2); ctx.closePath(); }
      else ctx.arc(0, 0, s / 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    raf = parts.length ? requestAnimationFrame(tick) : 0;
  }

  /** angle en grados: 0 = derecha, -90 = arriba */
  function burst({ x = window.innerWidth / 2, y = window.innerHeight / 2, count = 60, angle = -90, spread = 60, power = 14 } = {}) {
    if (reduceMotion) return;
    setup();
    for (let i = 0; i < count; i++) {
      const a = ((angle + (Math.random() - 0.5) * spread) * Math.PI) / 180;
      const v = power * (0.55 + Math.random() * 0.6);
      parts.push({
        x, y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        size: 7 + Math.random() * 7,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        tilt: Math.random() * Math.PI * 2,
        color: colors[i % colors.length],
        shape: i % 3,
        life: 240,
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }

  /** Dos cañones desde las esquinas de abajo */
  function cannons() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    const power = Math.min(22, 12 + h / 90);
    burst({ x: 0, y: h, angle: -62, spread: 30, count: 70, power });
    burst({ x: w, y: h, angle: -118, spread: 30, count: 70, power });
  }

  /** Lluvia desde arriba (para el día de la fiesta) */
  function rain() {
    burst({ x: Math.random() * window.innerWidth, y: -20, angle: 90, spread: 120, count: 30, power: 4 });
  }

  return { burst, cannons, rain };
})();

/* ---------- Dinosaurio de la portada (tocalo) ---------- */
function initDinoWalker() {
  const walker = document.getElementById("dino-walker");
  if (!walker) return;
  walker.hidden = false;

  const jump = walker.querySelector(".dino-walker__jump");
  const bubble = walker.querySelector(".dino-bubble");
  const frases = ["¡RAWR!", "¡Feliz cumple, Samu!", "¡Te espero!", "¡A festejar!", "¡Hay torta!", "¡Vení con hambre!"];
  let i = 0;
  let bubbleTimer;

  walker.addEventListener("click", () => {
    jump.classList.remove("is-jumping");
    void jump.offsetWidth;
    jump.classList.add("is-jumping");

    bubble.textContent = frases[i++ % frases.length];
    bubble.classList.add("is-visible");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove("is-visible"), 1800);

    const r = walker.getBoundingClientRect();
    Confetti.burst({ x: r.left + r.width / 2, y: r.top + r.height * 0.3, count: 45, spread: 80, power: 11 });
  });
}

/* ---------- Disparadores de confeti ---------- */
function initConfettiTriggers() {
  // Al abrir la invitación
  setTimeout(() => {
    if (window.scrollY < window.innerHeight / 2) Confetti.cannons();
  }, 1300);

  // La primera vez que se ve el contador
  const contador = document.getElementById("countdown");
  if (contador && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const r = contador.getBoundingClientRect();
        Confetti.burst({ x: r.left + r.width / 2, y: r.top, count: 60, spread: 110, power: 12 });
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(contador);
  }

  // Al confirmar por WhatsApp
  document.querySelectorAll("[data-wa]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const r = btn.getBoundingClientRect();
      Confetti.burst({ x: r.left + r.width / 2, y: r.top, count: 50, spread: 90, power: 11 });
    });
  });
}

/* ---------- Pausar animaciones cuando no se ven (ahorra batería) ---------- */
function initPauseOffscreen() {
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle("is-paused", !e.isIntersecting));
  });
  document.querySelectorAll(".hero, .trail, .footer").forEach((el) => io.observe(el));
}

/* ---------- API para main.js ---------- */
let partyTimer = 0;
window.Fiesta = {
  confetti: Confetti,
  // El día del cumple: llueve confeti cada tanto
  startParty() {
    if (partyTimer || reduceMotion) return;
    Confetti.rain();
    partyTimer = setInterval(Confetti.rain, 2500);
  },
  stopParty() {
    clearInterval(partyTimer);
    partyTimer = 0;
  },
};

drawArt();
initDinoWalker();
initConfettiTriggers();
initPauseOffscreen();
