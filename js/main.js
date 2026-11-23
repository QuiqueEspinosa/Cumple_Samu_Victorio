/* =========================================================
   Invitación Cumple de Samu
   Todos los datos editables están en CONFIG.
   ========================================================= */

const CONFIG = {
  nombre: "Samu",
  // Hora de Argentina (UTC-3)
  inicio: "2026-12-20T12:30:00-03:00",
  fin: "2026-12-20T20:00:00-03:00",
  lugar: "El Refugio de Raquel",
  direccion: "Calle Alfonso XIII, entre 7 y 8, Pocito, San Juan",
  mapsUrl: "https://maps.app.goo.gl/gPdAPjoXLRQiAVHp7",
  mensajeWhatsapp: "¡Hola! Confirmo mi asistencia al cumple de Samu el domingo 20/12 🦴🎉",
};

const inicio = new Date(CONFIG.inicio);
const fin = new Date(CONFIG.fin);

document.documentElement.classList.remove("no-js");

/* ---------- Contador regresivo ---------- */
function initCountdown() {
  const box = document.getElementById("countdown");
  const message = document.getElementById("countdown-message");
  if (!box) return;

  const nums = {
    days: box.querySelector('[data-unit="days"]'),
    hours: box.querySelector('[data-unit="hours"]'),
    minutes: box.querySelector('[data-unit="minutes"]'),
    seconds: box.querySelector('[data-unit="seconds"]'),
  };

  const pad = (n) => String(n).padStart(2, "0");

  function setNum(el, value) {
    if (el.textContent === value) return;
    el.textContent = value;
    el.classList.remove("tick");
    void el.offsetWidth; // reinicia la animación
    el.classList.add("tick");
  }

  function showMessage(text) {
    box.hidden = true;
    message.hidden = false;
    message.textContent = text;
  }

  function update() {
    const now = Date.now();

    if (now >= fin.getTime()) {
      showMessage("¡Gracias por venir a festejar con Samu! 🦴");
      window.Fiesta?.stopParty();
      return false;
    }
    if (now >= inicio.getTime()) {
      showMessage("¡Hoy es el gran día! ¡La fiesta está en marcha! 🎉");
      window.Fiesta?.startParty(); // lluvia de confeti
      return true; // sigue revisando para pasar a "gracias"
    }

    const diff = Math.floor((inicio.getTime() - now) / 1000);
    setNum(nums.days, pad(Math.floor(diff / 86400)));
    setNum(nums.hours, pad(Math.floor((diff % 86400) / 3600)));
    setNum(nums.minutes, pad(Math.floor((diff % 3600) / 60)));
    setNum(nums.seconds, pad(diff % 60));
    return true;
  }

  if (update()) {
    const timer = setInterval(() => {
      if (!update()) clearInterval(timer);
    }, 1000);
  }
}

/* ---------- Links de WhatsApp con mensaje ---------- */
function initWhatsapp() {
  const text = encodeURIComponent(CONFIG.mensajeWhatsapp);
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = `https://wa.me/${a.dataset.wa}?text=${text}`;
  });
}

/* ---------- Agendar en calendario ---------- */
// Formato UTC que piden Google Calendar e .ics: 20261220T153000Z
const toCalDate = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

function initCalendar() {
  const titulo = `Cumple de ${CONFIG.nombre} 🦴`;
  const detalle = `¡Te esperamos en Piedradura! Ubicación: ${CONFIG.mapsUrl}`;
  const ubicacion = `${CONFIG.lugar}, ${CONFIG.direccion}`;

  const google = document.getElementById("btn-google-cal");
  if (google) {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: titulo,
      dates: `${toCalDate(inicio)}/${toCalDate(fin)}`,
      details: detalle,
      location: ubicacion,
    });
    google.href = `https://calendar.google.com/calendar/render?${params}`;
  }

  const icsBtn = document.getElementById("btn-ics");
  if (icsBtn) {
    icsBtn.addEventListener("click", () => {
      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Cumple Samu//ES",
        "BEGIN:VEVENT",
        `UID:cumple-samu-${toCalDate(inicio)}@invitacion`,
        `DTSTAMP:${toCalDate(new Date())}`,
        `DTSTART:${toCalDate(inicio)}`,
        `DTEND:${toCalDate(fin)}`,
        `SUMMARY:${titulo}`,
        `DESCRIPTION:${detalle}`,
        `LOCATION:${ubicacion.replace(/,/g, "\\,")}`,
        "BEGIN:VALARM",
        "TRIGGER:-P1D",
        "ACTION:DISPLAY",
        "DESCRIPTION:¡Mañana es el cumple de Samu!",
        "END:VALARM",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "cumple-samu.ics";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  }
}

/* ---------- Aparición suave al hacer scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Visor de fotos de la galería ---------- */
function initLightbox() {
  const dialog = document.getElementById("lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return; // navegador viejo: no pasa nada al tocar
  const img = dialog.querySelector("img");

  document.querySelectorAll("[data-full]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const thumb = btn.querySelector("img");
      img.src = btn.dataset.full;
      img.alt = thumb ? thumb.alt : "";
      dialog.showModal();
    });
  });

  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  // Tocar fuera de la foto también cierra
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
}

initCountdown();
initLightbox();
initWhatsapp();
initCalendar();
initReveal();
