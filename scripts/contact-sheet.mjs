// Hoja de contactos para revisar fotos de raw/: node scripts/contact-sheet.mjs <dir> <out.jpg> [cols] [size]
import sharp from 'sharp'; import fs from 'node:fs';
const [dir, out, cols='4', size='420'] = process.argv.slice(2);
const files = fs.readdirSync(dir).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();
const S=+size, C=+cols, R=Math.ceil(files.length/C);
const comps = await Promise.all(files.map(async (f,i)=>{
  const img = await sharp(`${dir}/${f}`).resize(S,S,{fit:'contain',background:'#222'}).toBuffer();
  const label = Buffer.from(`<svg width="${S}" height="28"><rect width="100%" height="100%" fill="#000"/><text x="6" y="20" font-size="18" fill="#fff" font-family="sans-serif">${f}</text></svg>`);
  return [{input:img,left:(i%C)*S,top:Math.floor(i/C)*(S+28)},{input:label,left:(i%C)*S,top:Math.floor(i/C)*(S+28)+S}];
}));
await sharp({create:{width:C*S,height:R*(S+28),channels:3,background:'#111'}}).composite(comps.flat()).jpeg({quality:80}).toFile(out);
console.log(files.length,'images');
