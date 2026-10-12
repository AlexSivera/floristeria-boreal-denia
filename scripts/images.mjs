// Prepara las imágenes de la web a partir de raw/ (no se publica).
// Cada foto recibe un recorte, un etalonaje común (día / noche / real) y varias anchuras webp.
// Salida: src/assets/img/<nombre>-<ancho>.webp  ·  Uso: npm run images
import sharp from 'sharp';
import fs from 'node:fs/promises';

const OUT = 'src/assets/img';

// ratio: recorte final (ancho/alto) · foco: punto 0–1 hacia el que se desplaza el recorte
// grade: day (luz mediterránea cálida) · night (velas) · real (fotos del negocio, unificadas)
const FOTOS = {
  // — Stock provisional (Unsplash) —
  'hero-ranunculo':   { src: 'stock/hero-ranunculo.jpg', ratio: 4 / 5.6, foco: [0.55, 0.42], grade: 'day', sizes: [480, 760, 1100, 1500] },
  'jarron-sol':       { src: 'stock/jarron-sol.jpg', ratio: 4 / 5, foco: [0.5, 0.5], grade: 'day', sizes: [480, 800, 1200] },
  'buganvilla-muro':  { src: 'stock/buganvilla-muro.jpg', ratio: 16 / 9, foco: [0.5, 0.5], grade: 'day', sizes: [800, 1400, 2000] },
  'ramo-kraft':       { src: 'stock/ramo-kraft.jpg', ratio: 4 / 5, foco: [0.62, 0.5], grade: 'day', sizes: [480, 800] },
  'manos-tulipanes':  { src: 'stock/manos-tulipanes.jpg', ratio: 4 / 5, foco: [0.55, 0.5], grade: 'day', sizes: [480, 800] },
  'ramo-oscuro':      { src: 'stock/ramo-oscuro.jpg', ratio: 3 / 2, foco: [0.5, 0.5], grade: 'night', sizes: [800, 1400, 2000] },
  'mesa-velas':       { src: 'stock/mesa-velas.jpg', ratio: 3 / 2, foco: [0.5, 0.5], grade: 'night', sizes: [800, 1400, 2000] },
  'banquete-palmeras':{ src: 'stock/banquete-palmeras.jpg', ratio: 4 / 5, foco: [0.5, 0.6], grade: 'night', sizes: [600, 1000, 1500] },
  'ramo-novia':       { src: 'stock/ramo-novia.jpg', ratio: 4 / 5, foco: [0.5, 0.55], grade: 'night', sizes: [480, 800, 1200] },

  // — Fotos reales de Boreal (Google Maps, Bodas.net, Instagram) —
  'rotulo':           { src: 'real/maps-rotulo.png', ratio: 1.2, foco: [0.56, 0.5], grade: 'real', sizes: [480, 730] },
  'fachada':          { src: 'real/maps-fachada.jpg', ratio: 3 / 4, foco: [0.5, 0.5], grade: 'real', sizes: [480, 800, 1200] },
  'interior':         { src: 'real/maps-interior.jpg', ratio: 4 / 5, foco: [0.78, 0.5], grade: 'real', sizes: [480, 720] },
  'centro-tienda':    { src: 'real/maps-centro.jpg', ratio: 4 / 5, foco: [0.5, 0.55], grade: 'real', sizes: [480, 800] },
  'navidad-interior': { src: 'real/ig-navidad-interior.jpg', ratio: 4 / 5, foco: [0.5, 0.5], grade: 'real', sizes: [480] },
  'boda-pasillo':     { src: 'real/bodas-aisle2.png', ratio: 4 / 5, foco: [0.42, 0.5], grade: 'real', sizes: [480, 800, 1000] },
  'boda-centro-montgo':{ src: 'real/bodas-centerpiece.png', ratio: 4 / 3, foco: [0.5, 0.5], grade: 'real', sizes: [480, 800, 1200] },
  'boda-arco-puerto': { src: 'real/bodas-archport1.png', ratio: 4 / 3, foco: [0.5, 0.5], grade: 'real', sizes: [480, 800, 1200] },
  'boda-peonias':     { src: 'real/bodas-peonies.png', ratio: 1, foco: [0.42, 0.55], grade: 'real', sizes: [480, 800, 1100] },
  'boda-arco-mar':    { src: 'real/bodas-archsea.png', ratio: 4 / 5, foco: [0.55, 0.5], grade: 'real', sizes: [480, 800] },
  'boda-noche':       { src: 'real/bodas-night.png', ratio: 4 / 3, foco: [0.5, 0.5], grade: 'real', sizes: [480, 800] },
  'boda-velas':       { src: 'real/bodas-candles.png', ratio: 4 / 3, foco: [0.5, 0.6], grade: 'real', sizes: [480, 800] },
  'boda-playa-ig':    { src: 'real/ig-arco-playa.jpg', ratio: 9 / 16, foco: [0.5, 0.5], grade: 'real', sizes: [360] },
  'boda-boho':        { src: 'real/maps-boho.jpg', ratio: 4 / 5, foco: [0.5, 0.5], grade: 'real', sizes: [480, 800] },
};

// Velo cálido en "soft-light": acerca la temperatura de fuentes distintas
const VELO = { day: [244, 226, 198, 0.22], night: [255, 196, 120, 0.16], real: [242, 222, 196, 0.26] };

async function preparar({ src, ratio, foco: [fx, fy], grade }) {
  const base = sharp(`raw/${src}`).rotate();
  const { width: w, height: h } = await base.metadata();
  let cw = w, ch = Math.round(w / ratio);
  if (ch > h) { ch = h; cw = Math.round(h * ratio); }
  const left = Math.round(Math.max(0, Math.min(w - cw, fx * w - cw / 2)));
  const top = Math.round(Math.max(0, Math.min(h - ch, fy * h - ch / 2)));
  let img = sharp(`raw/${src}`).rotate().extract({ left, top, width: cw, height: ch }).removeAlpha();

  const [r, g, b, a] = VELO[grade];
  const velo = await sharp({ create: { width: cw, height: ch, channels: 4, background: { r, g, b, alpha: a } } }).png().toBuffer();
  if (grade === 'real') img = img.modulate({ saturation: 0.88 }).linear(0.94, 8); // blacks algo levantados, menos saturación de móvil
  if (grade === 'day') img = img.modulate({ saturation: 0.94 });
  if (grade === 'night') img = img.modulate({ saturation: 0.9, brightness: 0.96 });
  const buf = await img.composite([{ input: velo, blend: 'soft-light' }]).toBuffer();
  return { buf, cw };
}

await fs.mkdir(OUT, { recursive: true });
const informe = [];
for (const [nombre, def] of Object.entries(FOTOS)) {
  const { buf, cw } = await preparar(def);
  const hechos = [];
  for (const w of def.sizes) {
    if (w > cw * 1.05) continue; // nunca ampliar
    const q = def.grade === 'real' ? 76 : 72;
    await sharp(buf).resize({ width: w }).sharpen({ sigma: 0.5 }).webp({ quality: q, effort: 6 }).toFile(`${OUT}/${nombre}-${w}.webp`);
    hechos.push(w);
  }
  if (!hechos.length) { // foto pequeña: se exporta a su tamaño
    await sharp(buf).webp({ quality: 80, effort: 6 }).toFile(`${OUT}/${nombre}-${cw}.webp`);
    hechos.push(cw);
  }
  informe.push(`${nombre}: ${hechos.join(', ')}  (ratio ${def.ratio.toFixed(3)})`);
}
await fs.writeFile(`${OUT}/sizes.json`, JSON.stringify(Object.fromEntries(
  await Promise.all(Object.keys(FOTOS).map(async (n) => {
    const files = (await fs.readdir(OUT)).filter((f) => f.startsWith(n + '-') && /^\d+\.webp$/.test(f.slice(n.length + 1)));
    return [n, { ratio: FOTOS[n].ratio, widths: files.map((f) => +f.slice(n.length + 1, -5)).sort((a, b) => a - b) }];
  }))
), null, 2));
console.log(informe.join('\n'));
