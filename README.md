# Invitación · Cumple de Samu 🦴

Invitación web con temática de la Edad de Piedra (Piedradura): contador regresivo, mapa con "¿Cómo llego?", confirmación por WhatsApp y botón para agendar.

Sitio estático (HTML + CSS + JS), sin dependencias ni build.

## Estructura

```
index.html          → contenido de la invitación
css/styles.css      → estilos, paleta y responsive (colores en :root)
js/main.js          → contador, WhatsApp, calendario (datos en CONFIG)
assets/img/         → fotos (samu.jpg)
assets/gifs/        → GIFs e imágenes decorativas
vercel.json         → configuración de Vercel
```

## Ver en local

Abrir `index.html` en el navegador, o con XAMPP: `http://localhost/Cumple_Samu_Victorio/`

## Subir a GitHub + Vercel

1. Crear un repo vacío en GitHub (ej. `cumple-samu`).
2. En esta carpeta:
   ```
   git add .
   git commit -m "Primera versión de la invitación"
   git remote add origin https://github.com/TU-USUARIO/cumple-samu.git
   git push -u origin main
   ```
3. En vercel.com → **Add New → Project** → importar el repo → Framework: **Other** → Deploy.
4. Con la URL final, reemplazar `https://TU-PROYECTO.vercel.app` en `index.html` (meta `og:image`) para que WhatsApp muestre la foto al compartir.

Cada `git push` a `main` vuelve a publicar automáticamente.

## Agregar GIFs

Copiar el archivo a `assets/gifs/` y usar la clase `deco`, por ejemplo dentro de una sección:

```html
<img class="deco deco--right" src="assets/gifs/dino.gif" alt="" aria-hidden="true">
```
