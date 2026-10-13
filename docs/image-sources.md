# Fuentes de imágenes y brief fotográfico

Los originales están en `raw/`, que no se publica ni está en el repositorio. La salida optimizada está en `src/assets/img/` y se genera con `npm run images`, que aplica un etalonaje común (ver `scripts/images.mjs`).

**Para sustituir una foto**: deja el nuevo archivo en `raw/`, cambia la ruta `src` en `scripts/images.mjs` (mismo nombre de salida) y ejecuta `npm run images && npm run build`. Las proporciones están fijadas por el recorte, así que el diseño no se rompe.

## Fotos reales de Boreal

| Archivo | Sección | Origen | Notas |
|---|---|---|---|
| `fachada` | Hero «la puerta» (Nº 01), imagen OG | Google Maps, original 3024×4032 | La protagonista de la web. |
| `rotulo` | Visítanos (Nº 08) | Google Maps (fotograma de vídeo, 1080×608) | Se muestra entera para que se lea «Floristería Boreal · José Antonio Moya». |
| `logo` | Pie | Facebook /flores.borealdenia (portada) | Logotipo original en acuarela, sin etalonar. |
| `jose-ramo` | La tienda (Nº 02) | Instagram @borealfloristeria, portada del reel DH5ZQWfiRPj (720×1280) | José Antonio en la tienda con un ramo. |
| `jose-taller` | La tienda (Nº 03) | Instagram @borealfloristeria, portada del reel DG54hLZiHkm (720×1280) | Recortada por encima del subtítulo incrustado del reel. |
| `interior` | Encargos 02 | Google Maps, original 4032×2268 | |
| `centro-tienda` | Encargos 03 | Google Maps | |
| `navidad-interior` | Encargos 05 | Instagram @borealfloristeria (miniatura de 640 px) | Baja resolución: solo en tamaños pequeños. |
| `boda-acantilado`, `-mesa`, `-sillas`, `-flor` | Bodas Nº 06 y Cuaderno | Facebook /flores.borealdenia (720 px, recorte cuadrado de Facebook) | Boda frente al mar con arco de rosas melocotón y eucalipto. No se afirma el lugar. |
| `boda-pasillo`, `boda-peonias`, `boda-arco-puerto`, `boda-centro`, `boda-arco-mar`, `boda-velas` | Cuaderno | Galería de Bodas.net | Fotos de 2014 a 2018. |
| `boda-boho` | Cuaderno | Google Maps | |

Todas las fotos del cuaderno se recortan a 4:5 para que la tira sea uniforme.

No se usan las fotos de boda que otros perfiles etiquetan en Instagram (Sincronía Events, Sedka Novias), porque son de otros fotógrafos. Tampoco la foto de la novia que hay en Facebook (persona identificable).

**Fotos de José Antonio:** localizadas en Instagram con la sesión del usuario y descargadas desde la página pública de inserción de cada reel. Son fotogramas de vídeo de 720 px: en la sesión de fotos conviene hacerle un retrato de verdad.

## Stock provisional (Unsplash, licencia Unsplash: uso comercial gratuito, sin atribución obligatoria)

Todas están marcadas como «Ambiente» en la web. Ninguna se presenta como trabajo, local o equipo de Boreal.

| Archivo | Sección | Autor | URL |
|---|---|---|---|
| `ramo-kraft` | Encargos 01 | Anton Sidarau | https://unsplash.com/photos/VEt9cLO6Pdo |
| `manos-tulipanes` | Encargos 04 | SarahCreates | https://unsplash.com/photos/ZOicldC8tv0 |
| `jarron-sol` | Tarjeta | Renata Kurtveliieva-Berezhna | https://unsplash.com/photos/FBN1LgnvaxQ |
| `buganvilla-muro` | Cambio de escala (tienda) | Ola Noland | https://unsplash.com/photos/By-ReZ9uYMA |
| `ramo-oscuro` | Cambio de escala (bodas) | an.nemopo | https://unsplash.com/photos/3E74UmMK0Tc |
| `banquete-palmeras` | Bodas, presupuesto | Vidit Goswami | https://unsplash.com/photos/nBq1rdToEXY |

## Brief fotográfico si Boreal compra la web

Una jornada de sesión cubre casi todo. Luz natural, tonos cálidos y sombras de ventana; nada de fondo blanco de catálogo.

1. **Retrato de José Antonio** en el mostrador o en la puerta, trabajando un ramo. Vertical 4:5. Va en «La tienda».
2. **Fachada**: misma composición que la actual, con luz de última hora, la puerta abierta y sin coches. Vertical 3:4 para el hero.
3. **Manos atando un ramo** con papel kraft y cuerda, plano cerrado. Sustituye a `ramo-kraft` y `manos-tulipanes`.
4. **Interior** a primera hora, con las plantas ordenadas y la luz entrando.
5. **Tres ramos firmados** (un «detalle», un «mediano» y un «generoso») sobre la misma pared, para ilustrar los tamaños de la tarjeta.
6. **Bodas**: pedir a 2 o 3 parejas recientes las fotos de su fotógrafo, con permiso y crédito. Prioridad: ceremonia, ramo de novia y mesa de banquete. Sustituye a `banquete-palmeras` y sube la resolución del cuaderno (las fotos de Facebook son de 720 px).
7. **Navidad**: la fachada vestida, en horizontal.
