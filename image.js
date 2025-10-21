import { createCanvas, loadImage } from 'canvas';

export default async function handler(req, res) {
  // === Parámetros desde la URL ===
  const text = decodeURIComponent(req.query.text || 'Texto por defecto');
  const x = parseFloat(req.query.x) || 400; // posición horizontal
  const y = parseFloat(req.query.y) || 300; // posición vertical
  const rotate = (parseFloat(req.query.rotate) || 0) * Math.PI / 180; // rotación en radianes
  const size = parseInt(req.query.size) || 60; // tamaño de fuente
  const color = req.query.color || 'white'; // color de texto

  // Imagen base (usa una URL pública, por ejemplo desde tu GitHub)
  const baseUrl = 'https://raw.githubusercontent.com/BenjiITEst/The-Youtube/main/ChatGPT%20Image%2019%20oct%202025%2C%2019_06_03.png';
  const base = await loadImage(baseUrl);

  // Crea el canvas del tamaño de la imagen base
  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext('2d');

  // Dibuja la imagen base
  ctx.drawImage(base, 0, 0);

  // === Configura el texto ===
  ctx.font = `bold ${size}px sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // === Aplica rotación y posición ===
  ctx.save();
  ctx.translate(x, y); // mueve el punto de origen
  ctx.rotate(rotate); // aplica rotación
  ctx.fillText(text, 0, 0); // dibuja el texto
  ctx.restore();

  // === Devuelve la imagen final ===
  res.setHeader('Content-Type', 'image/png');
  canvas.pngStream().pipe(res);
}
