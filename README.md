# Portfolio · Laura Maclina

Web estática, sin dependencias raras. Se aloja gratis en **GitHub Pages** y se
mantiene editando **dos archivos de texto**. No hace falta saber programar.

---

## 🗂️ Qué es cada cosa

```
index.html              → la home (no la tocas)
proyecto.html           → plantilla de detalle, sirve para TODOS los proyectos (no la tocas)
css/styles.css          → estilos. Colores y tipografías arriba del todo
js/config.js            → 👈 TUS DATOS: nombre, email, bio, skills, redes
js/projects.js          → 👈 TUS PROYECTOS: la lista de trabajos
js/main.js, detalle.js  → lógica (no la tocas)
assets/laura.jpg        → tu foto del hero (sustitúyela por la tuya)
assets/proyectos/<slug>/→ las imágenes de cada proyecto
```

Solo tocas **`js/config.js`**, **`js/projects.js`** y las carpetas de **`assets/`**.

---

## ➕ Añadir un proyecto nuevo

1. Crea una carpeta en `assets/proyectos/` con un nombre corto sin espacios,
   por ejemplo `assets/proyectos/nuevomarca/`.
2. Mete ahí las imágenes con nombres ordenados: `01.jpg`, `02.jpg`, `03.jpg`…
   **La `01` será la portada.**
3. Abre `js/projects.js` y **copia un bloque** `{ ... }` entero. Pégalo donde
   quieras que aparezca y cambia los datos:

```js
{
  "slug": "nuevomarca",
  "imagenes": ["01.jpg", "02.jpg", "03.jpg"],
  "name": "Nombre del proyecto",
  "categoria": "Branding",
  "subtitulo": "Lo que es en una línea",
  "tags": ["Branding", "Packaging"],
  "anio": "2025",
  "descripcion": [
    "Primer párrafo.",
    "Segundo párrafo."
  ]
}
```

> Opcional: si en la tarjeta de la home la portada sale mal recortada, añade
> `"encuadre": "top"` (o `"bottom"`, `"center 30%"`…) para elegir qué parte se ve.

> `slug` tiene que ser **igual** al nombre de la carpeta. Ojo con las comas
> entre bloques: cada `}` lleva una coma detrás menos el último.

## ➖ Quitar un proyecto

Borra su bloque `{ ... }` de `js/projects.js`. Ya está. (Puedes dejar la carpeta
de imágenes o borrarla, da igual.)

## 🔄 Reordenar

Mueve los bloques de sitio dentro de la lista. El orden de arriba a abajo es el
orden en que se ven.

## 🖼️ Cambiar tu foto / datos

- Foto del hero: sustituye `assets/laura.jpg` por otra imagen con **ese mismo nombre**.
- Nombre, email, bio, skills, redes: todo en `js/config.js`.

---

## 🚀 Publicarlo en GitHub Pages (gratis)

**Opción fácil, sin instalar nada (por la web de GitHub):**

1. Entra en <https://github.com> y crea una cuenta si no la tienes.
2. Botón **New repository**. Nombre: `portfolio` (o el que quieras). Marca
   **Public** y crea.
3. En el repo vacío → **uploading an existing file** → arrastra **todo el
   contenido de esta carpeta** (no la carpeta, sino lo de dentro: `index.html`,
   `css/`, `js/`, `assets/`…). **Commit changes**.
4. Ve a **Settings → Pages**. En *Branch* elige `main` y carpeta `/root`. Guarda.
5. Espera 1-2 min y recarga: arriba aparece tu URL pública
   `https://TUUSUARIO.github.io/portfolio/`. ¡Listo!

Cada vez que quieras actualizar algo, editas el archivo en GitHub (lápiz ✏️) o
vuelves a subir la carpeta, y la web se actualiza sola en un par de minutos.

**Opción con dominio propio:** en *Settings → Pages → Custom domain* puedes
poner tu propio dominio (ej. `lauramaclina.com`) si compras uno.

---

## 👀 Verlo en tu ordenador antes de subir

Abre una terminal en esta carpeta y ejecuta:

```bash
python3 -m http.server 8000
```

Luego abre <http://localhost:8000> en el navegador. (Abrir el `index.html`
haciendo doble clic también funciona, pero con el servidor va todo mejor.)
