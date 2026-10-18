import test from 'node:test';
import assert from 'node:assert/strict';
import { filterSongs } from '../docs/filter.mjs';
const songs = [
  { id: '1', titulo: 'Dios de imposibles', interpretes: [{ nombre: 'Un Corazón' }], categorias: [{ id: 'fe', nombre: 'Fe' }] },
  { id: '2', titulo: 'Salmo 23', interpretes: [{ nombre: 'Marco Barrientos' }], categorias: [{ id: 'confianza', nombre: 'Confianza' }] },
];
test('busca sin tildes y combina palabras de título e intérprete', () => assert.deepEqual(filterSongs(songs, { query: 'corazon imposibles' }).map(s => s.id), ['1']));
test('combina categoría y favoritas', () => assert.deepEqual(filterSongs(songs, { category: 'fe', favoritesOnly: true, favorites: new Set(['2']) }), []));
test('ordena sin modificar los datos originales', () => { assert.equal(filterSongs(songs, { sort: 'artist' })[0].id, '2'); assert.equal(songs[0].id, '1'); });
