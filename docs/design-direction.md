# Dirección artística — "Ramos para hoy, bodas para siempre"

## Concepto
Boreal vive dos vidas: el mostrador de la Avenida de València, a pleno sol, donde se hacen ramos para hoy; y las bodas, que empiezan cuando cae la tarde y se encienden las velas. La web hace ese recorrido: **empieza de día y anochece al entrar en bodas**, y vuelve a amanecer para decirte cómo llegar a la tienda.

No es una metáfora decorativa: es la estructura real del negocio (dos clientes, dos ritmos) convertida en luz.

## Personalidad
Romántica pero no cursi; artesana y de barrio, con firma de autor. Cercana como las reseñas ("trato exquisito", "manos de oro").

## Paleta
- `--papel` #F2ECE1 — crema cálido (día)
- `--salvia` #8E9E86 / `--salvia-oscuro` #4F5E4B — el verde de la fachada real
- `--buganvilla` #A8285E — el magenta del arco de flores de la puerta; solo acentos
- `--tinta` #1F231E — texto de día
- `--noche` #121611 / `--vela` #E9C994 — capítulo bodas
El cambio día→noche interpola fondo y texto con el scroll.

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
5. **Anochecer** al llegar a bodas.
6. **Estado de apertura en vivo** calculado con el horario publicado.

## Interacción y movimiento
Revelados suaves por opacidad/desplazamiento corto; imagen del índice que sigue al cursor (solo puntero fino); interpolación de color en el anochecer. Todo desactivado con `prefers-reduced-motion`.

## Botones
Rectángulo sólido de esquinas apenas redondeadas (2 px) con flecha; enlaces secundarios subrayados. En móvil, barra fija inferior: Llamar · WhatsApp · Cómo llegar.
