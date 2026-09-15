// Renderiza la página de detalle de un proyecto. No hace falta tocarlo.
(function () {
  const C = window.CONFIG || {};
  const P = window.PROYECTOS || [];
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  $$("[data-brand]").forEach(el => (el.textContent = C.nombre));
  $$("[data-email]").forEach(a => (a.href = "mailto:" + C.email));
  if (C.cta) { $$("[data-cta-title]").forEach(e => e.textContent = C.cta.titulo); $$("[data-cta-sub]").forEach(e => e.textContent = C.cta.sub); }

  const slug = new URLSearchParams(location.search).get("p");
  const idx = P.findIndex(p => p.slug === slug);
  const proj = P[idx];

  if (!proj) { location.href = "index.html"; return; }

  document.title = `${proj.name} · ${C.nombre}`;
  $("[data-cat]").textContent = `${proj.categoria} · ${proj.anio || ""}`.trim().replace(/·\s*$/, "");
  $("[data-title]").textContent = proj.name;
  $("[data-sub]").textContent = proj.subtitulo || "";

  $("#desc").innerHTML =
    (proj.descripcion || []).map(t => `<p>${t}</p>`).join("") +
    `<div class="taglist">${(proj.tags || []).map(t => `<span class="chip dark">${t}</span>`).join("")}</div>`;

  // Galería
  const imgs = proj.imagenes.map(f => `assets/proyectos/${proj.slug}/${f}`);
  const gal = $("#gallery");

  if (proj.layout === "carrusel") {
    // ----- Carrusel grande (primeras N imágenes) + resto en rejilla -----
    const n = proj.carrusel || imgs.length;   // cuántas van en el carrusel
    const carImgs = imgs.slice(0, n);
    const restImgs = imgs.slice(n);
    gal.className = "carrusel";
    gal.innerHTML = `
      <div class="car-stage">
        <button class="car-arrow car-prev" aria-label="Anterior">‹</button>
        <div class="car-track">${carImgs.map((src, i) =>
          `<img src="${src}" alt="${proj.name} ${i + 1}" loading="${i < 2 ? "eager" : "lazy"}" class="${i === 0 ? "on" : ""}">`).join("")}</div>
        <button class="car-arrow car-next" aria-label="Siguiente">›</button>
      </div>
      <div class="car-dots">${carImgs.map((_, i) => `<button class="${i === 0 ? "on" : ""}" data-d="${i}" aria-label="Ir a ${i + 1}"></button>`).join("")}</div>
      ${restImgs.length ? `<div class="gallery car-extra">${restImgs.map((src, i) =>
        `<img src="${src}" alt="${proj.name} extra ${i + 1}" loading="lazy" data-i="${n + i}">`).join("")}</div>` : ""}`;

    // lightbox para las imágenes de abajo
    if (restImgs.length) {
      const lb = $("#lb"), lbImg = $("#lbImg");
      const closeLb = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
      gal.querySelector(".car-extra").addEventListener("click", e => {
        if (!e.target.dataset.i) return;
        lbImg.src = imgs[+e.target.dataset.i];
        lb.classList.add("open"); document.body.style.overflow = "hidden";
      });
      $("#lbClose").onclick = closeLb;
      $("#lbPrev").style.display = $("#lbNext").style.display = "none";
      lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
      document.addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });
    }

    const slides = [...gal.querySelectorAll(".car-track img")];
    const dots = [...gal.querySelectorAll(".car-dots button")];
    let cur = 0;
    const go = (n) => {
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("on", i === cur));
      dots.forEach((d, i) => d.classList.toggle("on", i === cur));
    };
    gal.querySelector(".car-prev").onclick = () => go(cur - 1);
    gal.querySelector(".car-next").onclick = () => go(cur + 1);
    dots.forEach(d => d.onclick = () => go(+d.dataset.d));
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") go(cur - 1);
      if (e.key === "ArrowRight") go(cur + 1);
    });
    // swipe táctil
    let x0 = null;
    gal.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
    gal.addEventListener("touchend", e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1);
      x0 = null;
    });
    return; // sin lightbox en modo carrusel
  }

  // ----- Galería masonry (por defecto) -----
  gal.innerHTML = imgs.map((src, i) =>
    `<img src="${src}" alt="${proj.name} ${i + 1}" loading="lazy" data-i="${i}">`).join("");

  // Navegación anterior / siguiente
  const prev = P[(idx - 1 + P.length) % P.length];
  const next = P[(idx + 1) % P.length];
  const pa = $("#prev"), na = $("#next");
  pa.href = `proyecto.html?p=${prev.slug}`; pa.querySelector(".big").textContent = prev.name;
  na.href = `proyecto.html?p=${next.slug}`; na.querySelector(".big").textContent = next.name;

  // Lightbox
  const lb = $("#lb"), lbImg = $("#lbImg");
  let cur = 0;
  const open = (i) => { cur = i; lbImg.src = imgs[i]; lb.classList.add("open"); document.body.style.overflow = "hidden"; };
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  const go = (d) => { cur = (cur + d + imgs.length) % imgs.length; lbImg.src = imgs[cur]; };

  $("#gallery").addEventListener("click", e => { if (e.target.dataset.i) open(+e.target.dataset.i); });
  $("#lbClose").onclick = close;
  $("#lbPrev").onclick = () => go(-1);
  $("#lbNext").onclick = () => go(1);
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });
})();
