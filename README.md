# Boreal · Floristería en Dénia — demo web

Propuesta de web para Boreal, la floristería de José Antonio Moya en la Av. de València 8, Dénia.
Concepto: *Ramos para hoy, bodas para siempre* — la web pasa del tono claro de la tienda (un ramo) al tono oscuro de las bodas (la boda entera). Ver `docs/`.

## Uso

```bash
npm install        # solo hace falta sharp para regenerar imágenes
npm run images     # raw/ → src/assets/img (necesita raw/, que no está en el repo)
npm run dev        # build + servidor en http://localhost:4321
npm run check      # build + comprobaciones (recursos, anclas, alt, JSON-LD)
```

HTML, CSS y JS sin dependencias en `src/`. El build (`scripts/build.mjs`) expande `<img data-img="nombre">` a `srcset` con las tallas generadas y escribe `dist/`.
Se publica en GitHub Pages desde la rama `gh-pages` con `npm run deploy` (build + check + push de `dist/`).

## Pendiente de confirmar con el cliente
- Zona y condiciones del envío a domicilio.
- Permiso para usar las fotos de Bodas.net, Instagram y Facebook y las reseñas citadas.
- Una foto de José Antonio para la sección «La tienda».
