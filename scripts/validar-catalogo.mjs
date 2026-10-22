// Validación del único catálogo oficial: docs/catalogo.json.
// Ejecutar: node scripts/validar-catalogo.mjs
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = fileURLToPath(new URL('../docs/catalogo.json', import.meta.url));
const catalog = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const fail = (where, message) => errors.push(where + ': ' + message);
const present = value => typeof value === 'string' && value.trim().length > 0;
const unique = (array, getKey, label, where) => {
  const seen = new Set();
  for (const item of array) {
    const key = getKey(item);
    if (seen.has(key)) fail(where, label + ' duplicado: ' + key);
    seen.add(key);
  }
};
const isHttps = raw => {
  try { const u = new URL(raw); return u.protocol === 'https:' && Boolean(u.hostname); }
  catch { return false; }
};

if (catalog.schema_version !== 1) fail('catálogo', 'schema_version debe ser 1');
if (!Array.isArray(catalog.canciones)) fail('catálogo', 'canciones debe ser un arreglo');
const songs = Array.isArray(catalog.canciones) ? catalog.canciones : [];
const songIDs = new Set(), linkIDs = new Set();
let links = 0;
for (const [index, song] of songs.entries()) {
  const where = 'canción ' + (song?.id || '#' + index);
  if (!song || typeof song !== 'object') { fail(where, 'objeto inválido'); continue; }
  if (!/^CAN-\d{6}$/.test(song.id || '')) fail(where, 'id inválido');
  if (songIDs.has(song.id)) fail(where, 'id de canción duplicado');
  songIDs.add(song.id);
  if (!present(song.titulo)) fail(where, 'falta título');
  if (!present(song.idioma)) fail(where, 'falta idioma');
  if (!Array.isArray(song.interpretes) || !song.interpretes.length) fail(where, 'falta intérprete');
  else {
    unique(song.interpretes, a => a.id, 'intérprete', where);
    for (const a of song.interpretes) {
      if (!/^INT-\d{6}$/.test(a.id || '') || !present(a.nombre) || !present(a.rol)) fail(where, 'intérprete inválido');
    }
  }
  if (!Array.isArray(song.categorias)) fail(where, 'categorías inválidas');
  else {
    unique(song.categorias, a => a.id, 'categoría', where);
    for (const a of song.categorias) {
      if (!/^CAT-\d{6}$/.test(a.id || '') || !present(a.nombre)) fail(where, 'categoría inválida');
    }
  }
  if (!Array.isArray(song.enlaces)) { fail(where, 'enlaces inválidos'); continue; }
  unique(song.enlaces, a => a.tipo + '|' + a.url, 'URL del mismo tipo', where);
  for (const link of song.enlaces) {
    links++;
    if (!/^ENL-\d{6}$/.test(link.id || '')) fail(where, 'id de enlace inválido');
    if (linkIDs.has(link.id)) fail(where, 'id de enlace duplicado: ' + link.id);
    linkIDs.add(link.id);
    if (!isHttps(link.url)) fail(where, 'URL debe ser HTTPS: ' + link.url);
    if (!['audio', 'video', 'letra', 'acordes'].includes(link.tipo)) fail(where, 'tipo de enlace no permitido: ' + link.tipo);
    if (!present(link.plataforma)) fail(where, 'falta plataforma');
    if (typeof link.oficial !== 'boolean') fail(where, 'oficial debe ser true o false');
  }
}

if (catalog.albumes_interes !== undefined && !Array.isArray(catalog.albumes_interes)) fail('catálogo', 'albumes_interes debe ser un arreglo');
const artistIDs = new Set(songs.flatMap(s => (s.interpretes || []).map(a => a.id)));
const albums = Array.isArray(catalog.albumes_interes) ? catalog.albumes_interes : [];
unique(albums, a => a.id, 'id de álbum', 'albumes_interes');
unique(albums, a => a.interprete_id + '|' + a.url, 'enlace por intérprete', 'albumes_interes');
for (const a of albums) {
  if (!/^ALB-\d{6}$/.test(a.id || '')) fail('albumes_interes', 'ID inválido');
  if (!artistIDs.has(a.interprete_id)) fail('albumes_interes', 'intérprete inexistente: ' + a.interprete_id);
  if (!present(a.titulo) || !present(a.plataforma)) fail('albumes_interes', 'falta título o plataforma');
  if (!['video', 'mp3'].includes(a.formato)) fail('albumes_interes', 'solo videos o MP3 de álbumes completos');
  if (!isHttps(a.url)) fail('albumes_interes', 'URL HTTPS inválida: ' + a.url);
}

if (errors.length) {
  console.error('El catálogo NO supera la validación (' + errors.length + ' errores):');
  for (const e of errors) console.error(' - ' + e);
  process.exitCode = 1;
} else {
  console.log('Catálogo válido: ' + songs.length + ' canciones y ' + links + ' enlaces. Ningún ID o URL por tipo duplicados.');
}
