// Renderiza la home a partir de CONFIG y PROYECTOS. No hace falta tocarlo.
(function () {
  const C = window.CONFIG || {};
  const P = window.PROYECTOS || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const set = (sel, val) => $$(sel).forEach(el => (el.textContent = val));

  // Datos personales
  set("[data-brand]", C.nombre);
  set("[data-headline]", C.headline);
  set("[data-bio]", C.bio);
  set("[data-status]", C.estado);
  set("[data-about-1]", (C.sobre || [])[0] || "");
  set("[data-about-2]", (C.sobre || [])[1] || "");
  set("[data-year]", new Date().getFullYear());
  if (C.cta) { set("[data-cta-title]", C.cta.titulo); set("[data-cta-sub]", C.cta.sub); }

  $$("[data-email]").forEach(a => (a.href = "mailto:" + C.email));
  $$("[data-behance]").forEach(a => (a.href = C.behance));
  $$("[data-linkedin]").forEach(a => (a.href = C.linkedin));
  const photo = $("[data-hero-photo]");
  if (photo) photo.alt = C.nombre;
  document.title = `${C.nombre} · ${C.rol}`;

  // Skills
  const sk = $("[data-skills]");
  if (sk) sk.innerHTML = (C.skills || []).map(s => `<span class="chip">${s}</span>`).join("");

  // Software
  const sw = $("[data-software]");
  if (sw) sw.innerHTML = (C.software || []).map(s => `<div>${Array.isArray(s) ? s[0] : s}</div>`).join("");

  // Grid de trabajos
  const grid = $("#works");
  if (grid) {
    grid.innerHTML = P.map(p => {
      const cover = `assets/proyectos/${p.slug}/${p.imagenes[0]}`;
      const chips = (p.tags || []).slice(0, 2).map(t => `<span class="chip">${t}</span>`).join("");
      const encuadre = p.encuadre ? ` style="--encuadre:${p.encuadre}"` : "";
      return `<a class="card" href="proyecto.html?p=${p.slug}"${encuadre}>
        <img src="${cover}" alt="${p.name}" loading="lazy">
        <div class="card-meta"><h3>${p.name}</h3><div class="chips">${chips}</div></div>
      </a>`;
    }).join("");
  }
})();
