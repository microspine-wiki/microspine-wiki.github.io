/* Intrinsic image sizes, so pages reserve space and do not jump while loading. */
import fs from 'node:fs';

function svgSize(text) {
  const tag = /<svg\b[^>]*>/i.exec(text)?.[0];
  if (!tag) return null;
  const attr = name => new RegExp(`\\b${name}="([^"]+)"`, 'i').exec(tag)?.[1];
  const box = attr('viewBox')?.trim().split(/[\s,]+/).map(Number);
  const width = parseFloat(attr('width'));
  const height = parseFloat(attr('height'));
  if (box?.length === 4 && box.every(Number.isFinite)) return {width: box[2], height: box[3]};
  if (Number.isFinite(width) && Number.isFinite(height)) return {width, height};
  return null;
}

function pngSize(buffer) {
  if (buffer.length < 24 || buffer.readUInt32BE(0) !== 0x89504e47) return null;
  return {width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20)};
}

function jpegSize(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let pos = 2;
  while (pos + 9 < buffer.length) {
    if (buffer[pos] !== 0xff) { pos += 1; continue; }
    const marker = buffer[pos + 1];
    // SOF0–SOF15, excluding DHT (C4), JPG (C8) and DAC (CC).
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return {height: buffer.readUInt16BE(pos + 5), width: buffer.readUInt16BE(pos + 7)};
    }
    pos += 2 + buffer.readUInt16BE(pos + 2);
  }
  return null;
}

function webpSize(buffer) {
  if (buffer.length < 30 || buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') return null;
  const kind = buffer.toString('ascii', 12, 16);
  if (kind === 'VP8X') return {width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3)};
  if (kind === 'VP8 ') return {width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff};
  if (kind === 'VP8L') {
    const bits = buffer.readUInt32LE(21);
    return {width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1};
  }
  return null;
}

const cache = new Map();

export function imageSize(file) {
  if (cache.has(file)) return cache.get(file);
  let size = null;
  try {
    const buffer = fs.readFileSync(file);
    size = /\.svg$/i.test(file) ? svgSize(buffer.toString('utf8'))
      : pngSize(buffer) ?? jpegSize(buffer) ?? webpSize(buffer);
  } catch { /* unreadable files are reported by the link checker */ }
  cache.set(file, size);
  return size;
}
