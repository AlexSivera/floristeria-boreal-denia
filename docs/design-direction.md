# Dirección artística — "Ramos para hoy, bodas para siempre"

## Concepto
Boreal hace dos tipos de encargo con la misma firma: **el ramo** que alguien necesita hoy y **la boda entera**, de la ceremonia al último centro de mesa. La web cambia de escala a mitad del recorrido: del tono claro de la tienda (papel, salvia, sol) al tono oscuro y cálido de las bodas (velas, mesas largas). La frase lo dice sin rodeos: «Para cualquier día, un ramo» → «Para vuestro gran día, la boda entera».

**Cambio respecto a la primera versión (12/10/2026):** el paso de claro a oscuro se planteó primero como día → tarde. Se descartó porque podía dar a entender que las bodas solo se atienden de noche o que no se puede llamar de día para reservar una. Ahora el cambio de color significa **escala y ocasión**, no hora. La tienda, el teléfono y el WhatsApp son los mismos para los dos.

## Personalidad
Romántica pero no cursi; artesana y de barrio, con firma de autor. Cercana como las reseñas ("trato exquisito", "manos de oro").

## Paleta
- `--papel` #F2ECE1 — crema cálido (día)
- `--salvia` #8E9E86 / `--salvia-oscuro` #4F5E4B — el verde de la fachada real
- `--buganvilla` #A8285E — el magenta del arco de flores de la puerta; solo acentos
- `--tinta` #1F231E — texto de día
- `--noche` #121611 / `--vela` #E9C994 — capítulo bodas
El cambio de escala (tienda → bodas) funde las imágenes con el scroll y releva la frase.

## Tipografía
- **Instrument Serif** (redonda + cursiva): titulares escalonados, la cursiva marca la palabra emocional.
- **Instrument Sans**: texto y UI.
- **DM Mono**: etiquetas de herbario (nombre botánico, número, origen de la foto), mínimo 12 px.

## Fotografía
Día: luz de ventana, sombras duras de sol, buganvilla, papel kraft. Noche: velas, mesas largas, palmeras iluminadas. Fotos reales de Boreal con un etalonaje común (menos saturación, negros levantados, velo cálido) y siempre etiquetadas como "Trabajo real". Stock solo para atmósfera, nunca presentado como trabajo propio.

## Elementos distintivos
1. **Arco** como recorte de las imágenes clave (eco de la puerta de flores).
2. **Etiquetas de herbario** en mono bajo las imágenes: Nº, nombre botánico, procedencia.
3. **Índice numerado** de encargos con imagen que aparece al pasar (escritorio) o miniatura (móvil).
4. **Tarjeta dedicatoria**: el visitante escribe la dedicatoria, elige ocasión y tonos, y la envía a la tienda por WhatsApp o email. Honesto: no hay backend; abre la app del usuario con el mensaje.
5. **Cambio de escala** al llegar a bodas: de un ramo a la boda entera, con la etiqueta «Tienda → Bodas y eventos».
6. **Estado de apertura en vivo** calculado con el horario publicado.

## Interacción y movimiento
Revelados suaves por opacidad/desplazamiento corto; imagen del índice que sigue al cursor (solo puntero fino); fundido de imágenes y relevo de frase en el cambio de escala. Todo desactivado con `prefers-reduced-motion`.

## Botones
Rectángulo sólido de esquinas apenas redondeadas (2 px) con flecha; enlaces secundarios subrayados. En móvil, barra fija inferior: Llamar · WhatsApp · Cómo llegar.
