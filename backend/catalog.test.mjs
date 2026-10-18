import test from 'node:test';
import assert from 'node:assert/strict';
import { SCHEMA, compile } from './catalog.mjs';

function fixture() {
  const data = Object.fromEntries(Object.entries(SCHEMA).map(([name, columns]) => [name, [[...columns]]]));
  const add = (name, row) => data[name].push(SCHEMA[name].map(c => row[c] ?? ''));
  add('Canciones', { cancion_id: 'CAN-000001', titulo: 'Prueba', idioma: 'es', estado_revision: 'aprobada', estado_publicacion: 'publicada', aprobacion_usuario: 'aprobada', aprobado_por: 'Usuario', aprobado_en: 46000, referencia_aprobacion: 'Autorización de prueba', notas_internas: 'PRIVADO' });
  add('Intérpretes', { interprete_id: 'INT-000001', nombre: 'Intérprete', notas_internas: 'PRIVADO' });
  add('Categorías', { categoria_id: 'CAT-000001', nombre: 'Adoración' });
  add('Canción-Categoría', { relacion_id: 'CCA-000001', cancion_id: 'CAN-000001', categoria_id: 'CAT-000001' });
  add('Canción-Intérprete', { relacion_id: 'CIN-000001', cancion_id: 'CAN-000001', interprete_id: 'INT-000001', rol: 'principal', orden: 1 });
  for (const [id, official, priority] of [['ENL-000001', false, 1], ['ENL-000002', true, 9]]) add('Enlaces', { enlace_id: id, cancion_id: 'CAN-000001', url: `https://example.com/${id}`, plataforma: 'Otra', tipo_contenido: 'video', es_oficial: official, prioridad: priority, estado_enlace: 'activo' });
  return data;
}
function approved(data) { const r = compile(data); return { [r.pending[0].id]: r.pending[0].hash }; }
test('una planilla vacía produce catálogo vacío', () => {
  const data = Object.fromEntries(Object.entries(SCHEMA).map(([name, cols]) => [name, [cols]]));
  assert.deepEqual(compile(data), { catalog: { schema_version: 1, canciones: [] }, pending: [] });
});
test('publicada sin hash de la versión no sale al catálogo', () => {
  assert.equal(compile(fixture()).catalog.canciones.length, 0);
  assert.equal(compile(fixture()).pending.length, 1);
});
test('aprobada exporta solo campos públicos y pone oficiales primero', () => {
  const data = fixture(); const r = compile(data, approved(data));
  assert.equal(r.catalog.canciones.length, 1);
  assert.equal(r.catalog.canciones[0].enlaces[0].id, 'ENL-000002');
  assert(!JSON.stringify(r.catalog).includes('PRIVADO'));
  assert(!JSON.stringify(r.catalog).includes('aprobado_por'));
});
test('cambios en canción, intérprete, categoría o enlace invalidan la aprobación', () => {
  for (const [sheet, column] of [['Canciones', 'titulo'], ['Intérpretes', 'nombre'], ['Categorías', 'nombre'], ['Enlaces', 'url']]) {
    const data = fixture(); const approvals = approved(data);
    data[sheet][1][SCHEMA[sheet].indexOf(column)] = column === 'url' ? 'https://example.com/nueva' : 'Cambio';
    assert.equal(compile(data, approvals).pending.length, 1);
    assert.equal(compile(data, approvals).catalog.canciones.length, 0);
  }
});
test('retirar una canción evita exportarla aunque conserve el hash', () => {
  const data = fixture(); const approvals = approved(data);
  data.Canciones[1][4] = 'retirada';
  assert.equal(compile(data, approvals).catalog.canciones.length, 0);
});
test('bloquea publicación sin autorización documentada', () => {
  const data = fixture(); data.Canciones[1][5] = 'pendiente';
  assert.throws(() => compile(data), /aprobación explícita/);
});
test('bloquea IDs duplicados y referencias huérfanas', () => {
  const data = fixture(); data.Canciones.push([...data.Canciones[1]]);
  assert.throws(() => compile(data), /duplicado/);
  const other = fixture(); other['Canción-Categoría'][1][2] = 'CAT-999999';
  assert.throws(() => compile(other), /inexistente/);
});
test('bloquea URLs peligrosas y casillas como texto', () => {
  const data = fixture(); data.Enlaces[1][2] = 'javascript:alert(1)';
  assert.throws(() => compile(data), /URL inválida/);
  const other = fixture(); other.Enlaces[1][5] = 'FALSE';
  assert.throws(() => compile(other), /Casilla oficial/);
});
test('encabezados reordenados se reconocen por nombre', () => {
  const data = fixture(); const approvals = approved(data);
  data.Canciones = data.Canciones.map(row => [...row].reverse());
  assert.equal(compile(data, approvals).catalog.canciones.length, 1);
});
