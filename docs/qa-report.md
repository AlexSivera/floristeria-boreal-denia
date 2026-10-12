# QA — 12/10/2026

Pruebas ejecutadas con Playwright (Chromium) contra `dist/` servido en local. Capturas en `raw/qa/` (no publicadas).

## Técnico
- `npm run check`: todos los recursos locales existen, anclas internas y `aria-*` apuntan a ids existentes, todas las `img` con `alt`, `width` y `height`, JSON-LD válido, sin placeholders. **OK**
- Consola: 0 errores en móvil y escritorio.
- Primera carga ≈ 210 KB (HTML + CSS + JS + 3 fuentes + imagen del hero). Resto de imágenes en `lazy`, `srcset` con 2–4 anchuras webp.

## Responsive (sin overflow horizontal en ninguno)
320×640 · 360×760 · 375×667 · 390×844 · 414×896 · 768×1024 · 1024×768 · 1280×720 · 1440×900 · 1920×1080.
- 390×844: imagen, titular, entrada y botón "Encargar un ramo" visibles en la primera pantalla, por encima de la barra fija.
- 375×667 y 320×640: la CTA del hero queda bajo la barra fija; la barra (Llamar / WhatsApp / Cómo llegar) cubre la conversión.

## Funcional
- Menú móvil: abre, navega a la sección y se cierra.
- Tarjeta: chips, campos y dedicatoria actualizan la vista previa; el enlace de WhatsApp lleva el encargo completo y la fecha en texto ("martes, 20 de octubre"); `mailto` con asunto y cuerpo.
- Presupuesto de boda: mensaje con fecha, lugar, invitados e idea.
- Enlaces: `tel:+34615641086`, `tel:+34966420964`, `mailto:borealfloristas@hotmail.es`, `wa.me/34615641086`, Google Maps (cid de la ficha real), Instagram.
- Estado de apertura calculado en hora de Madrid; resalta el día actual en la tabla.
- Índice de encargos: imagen que sigue al cursor (solo puntero fino), colocada bien aunque se entre por scroll.
- Cuaderno de bodas: desplazamiento con dedo, flechas y teclado (← →).

## Accesibilidad
- `prefers-reduced-motion`: sin animaciones de entrada, el anochecer pasa a bloque estático con las dos frases visibles.
- Foco visible en enlaces, botones, chips y campos. Enlace "Saltar al contenido".
- Áreas táctiles ≥ 40 px salvo el logotipo (30 px de alto, pero ancho).

## No comprobado
- Safari/iOS real y Firefox (solo Chromium).
- Que el 615 641 086 tenga WhatsApp.
- Lighthouse (no ejecutado).
