import { createHash } from 'node:crypto';

export const SPREADSHEET_ID = '1sXncLci2gyc0VTvV8g8kuluwDeB05xRQEnx_XqJltBY';
export const SCHEMA = {
  Canciones: ['cancion_id', 'titulo', 'idioma', 'estado_revision', 'estado_publicacion', 'aprobacion_usuario', 'aprobado_por', 'aprobado_en', 'referencia_aprobacion', 'creado_en', 'actualizado_en', 'notas_internas', 'apta_exportacion'],
  'Intérpretes': ['interprete_id', 'nombre', 'tipo', 'url_oficial', 'notas_internas'],
  'Categorías': ['categoria_id', 'nombre', 'descripcion'],
  'Canción-Categoría': ['relacion_id', 'cancion_id', 'categoria_id'],
  'Canción-Intérprete': ['relacion_id', 'cancion_id', 'interprete_id', 'rol', 'orden'],
  Enlaces: ['enlace_id', 'cancion_id', 'url', 'plataforma', 'tipo_contenido', 'es_oficial', 'prioridad', 'estado_enlace', 'verificado_en', 'notas_internas'],
};
const prefixes = ['CAN', 'INT', 'CAT', 'CCA', 'CIN', 'ENL'];
const text = value => typeof value === 'string' && value.trim() !== '';
const requireValue = (condition, message) => { if (!condition) throw new Error(message); };
export function https(value) {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && !/\s/.test(value); }
  catch { return false; }
}
export function parseSnapshot(snapshot) {
  const tables = {};
  for (const [index, [name, columns]] of Object.entries(SCHEMA).entries()) {
    const grid = snapshot[name];
    requireValue(Array.isArray(grid) && Array.isArray(grid[0]), `Falta hoja o encabezado: ${name}`);
    const headers = grid[0];
    requireValue(new Set(headers).size === headers.length, `Encabezados duplicados: ${name}`);
    requireValue(columns.every(c => headers.includes(c)), `Esquema incompleto: ${name}`);
    const rows = grid.slice(1).filter(row => row.some(v => v !== '' && v !== null && v !== undefined && v !== false));
    const ids = new Set();
    tables[name] = rows.map((row, offset) => {
      const obj = Object.fromEntries(headers.map((h, i) => [h, row[i] ?? '']));
      const id = obj[columns[0]];
      requireValue(new RegExp(`^${prefixes[index]}-[0-9]{6}$`).test(id), `${name}: ID inválido en registro ${offset + 1}`);
      requireValue(!ids.has(id), `${name}: ID duplicado ${id}`);
      ids.add(id);
      return obj;
    });
  }
  const songs = new Set(tables.Canciones.map(r => r.cancion_id));
  const artists = new Set(tables['Intérpretes'].map(r => r.interprete_id));
  const categories = new Set(tables['Categorías'].map(r => r.categoria_id));
  for (const name of ['Canción-Categoría', 'Canción-Intérprete', 'Enlaces']) {
    const pairs = new Set();
    for (const r of tables[name]) {
      requireValue(songs.has(r.cancion_id), `${name}: canción inexistente ${r.cancion_id}`);
      if (name === 'Enlaces') {
        requireValue(https(r.url), `URL inválida: ${r.enlace_id}`);
        requireValue(typeof r.es_oficial === 'boolean', `Casilla oficial inválida: ${r.enlace_id}`);
        requireValue(Number.isInteger(r.prioridad) && r.prioridad > 0, `Prioridad inválida: ${r.enlace_id}`);
        requireValue(['sin_verificar', 'activo', 'roto', 'restringido', 'retirado'].includes(r.estado_enlace), `Estado inválido: ${r.enlace_id}`);
      } else {
        const target = name === 'Canción-Categoría' ? r.categoria_id : r.interprete_id;
        requireValue((name === 'Canción-Categoría' ? categories : artists).has(target), `${name}: referencia inexistente ${target}`);
        const pair = JSON.stringify([r.cancion_id, target, r.rol ?? '']);
        requireValue(!pairs.has(pair), `${name}: relación duplicada`);
        pairs.add(pair);
        if (name === 'Canción-Intérprete') {
          requireValue(['principal', 'invitado', 'autor', 'compositor'].includes(r.rol), `Rol inválido: ${r.relacion_id}`);
          requireValue(Number.isInteger(r.orden) && r.orden > 0, `Orden inválido: ${r.relacion_id}`);
        }
      }
    }
  }
  for (const r of [...tables['Intérpretes'], ...tables['Categorías']]) requireValue(text(r.nombre), 'Nombre vacío en catálogo relacionado');
  return tables;
}
export function compile(snapshot, approvals = {}) {
  const t = parseSnapshot(snapshot);
  const pending = [];
  const publicSongs = [];
  for (const s of t.Canciones) {
    requireValue(['pendiente', 'en_revision', 'aprobada', 'rechazada'].includes(s.estado_revision), `Revisión inválida: ${s.cancion_id}`);
    requireValue(['borrador', 'publicada', 'retirada'].includes(s.estado_publicacion), `Publicación inválida: ${s.cancion_id}`);
    requireValue(['pendiente', 'aprobada', 'revocada'].includes(s.aprobacion_usuario), `Aprobación inválida: ${s.cancion_id}`);
    if (s.estado_publicacion !== 'publicada') continue;
    requireValue(s.estado_revision === 'aprobada' && s.aprobacion_usuario === 'aprobada' && text(s.aprobado_por) && typeof s.aprobado_en === 'number' && Number.isFinite(s.aprobado_en) && s.aprobado_en > 0 && text(s.referencia_aprobacion), `Falta aprobación explícita documentada: ${s.cancion_id}`);
    requireValue(text(s.titulo) && text(s.idioma), `Título o idioma vacío: ${s.cancion_id}`);
    const interpretes = t['Canción-Intérprete'].filter(r => r.cancion_id === s.cancion_id)
      .sort((a, b) => a.orden - b.orden || a.relacion_id.localeCompare(b.relacion_id)).map(r => {
        const a = t['Intérpretes'].find(a => a.interprete_id === r.interprete_id);
        return { id: a.interprete_id, nombre: a.nombre, rol: r.rol };
      });
    const categorias = t['Canción-Categoría'].filter(r => r.cancion_id === s.cancion_id).map(r => {
      const c = t['Categorías'].find(c => c.categoria_id === r.categoria_id);
      return { id: c.categoria_id, nombre: c.nombre };
    }).sort((a, b) => a.id.localeCompare(b.id));
    const enlaces = t.Enlaces.filter(r => r.cancion_id === s.cancion_id && r.estado_enlace === 'activo')
      .sort((a, b) => Number(b.es_oficial) - Number(a.es_oficial) || a.prioridad - b.prioridad || a.enlace_id.localeCompare(b.enlace_id))
      .map(r => ({ id: r.enlace_id, url: r.url, plataforma: r.plataforma, tipo: r.tipo_contenido, oficial: r.es_oficial }));
    requireValue(interpretes.length && categorias.length && enlaces.length, `Faltan intérpretes, categorías o enlaces activos: ${s.cancion_id}`);
    const song = { id: s.cancion_id, titulo: s.titulo, idioma: s.idioma, interpretes, categorias, enlaces };
    const approval = { por: s.aprobado_por, fecha: s.aprobado_en, referencia: s.referencia_aprobacion };
    const hash = createHash('sha256').update(JSON.stringify({ song, approval })).digest('hex');
    if (approvals[s.cancion_id] !== hash) pending.push({ id: s.cancion_id, hash, contenido: song, motivo: 'Requiere aprobación de esta versión exacta' });
    else publicSongs.push(song);
  }
  return { catalog: { schema_version: 1, canciones: publicSongs }, pending };
}

// Adaptador de solo lectura. No crea cuentas, permisos ni automatizaciones.
export async function readGoogleSheets(token) {
  requireValue(text(token), 'Falta GOOGLE_ACCESS_TOKEN. No pegues el token en el chat.');
  const query = new URLSearchParams({ valueRenderOption: 'UNFORMATTED_VALUE', majorDimension: 'ROWS' });
  for (const [name, columns] of Object.entries(SCHEMA)) query.append('ranges', `'${name}'!A1:${String.fromCharCode(64 + columns.length)}`);
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?${query}`, {
    headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000),
  });
  requireValue(response.ok, `Google Sheets devolvió HTTP ${response.status}; no se generó catálogo.`);
  const body = await response.json();
  requireValue(body.spreadsheetId === SPREADSHEET_ID && body.valueRanges?.length === Object.keys(SCHEMA).length, 'Respuesta incompleta de Google Sheets');
  return Object.fromEntries(Object.keys(SCHEMA).map((name, i) => [name, body.valueRanges[i].values ?? []]));
}
