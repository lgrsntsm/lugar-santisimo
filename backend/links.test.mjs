import test from 'node:test';
import assert from 'node:assert/strict';
import { groupLinks } from '../docs/links.mjs';
test('hasta tres audios y tres videos independientes con oficiales primero', () => {
  const links = ['audio', 'video'].flatMap(tipo => Array.from({ length: 5 }, (_, i) => ({ tipo, oficial: i === 4, url: `https://example.com/${tipo}/${i}` })));
  const groups = groupLinks(links);
  for (const type of ['audio', 'video']) { assert.equal(groups[type].length, 3); assert.equal(groups[type][0].oficial, true); }
});
test('no mezcla videos con audios o letras; conserva orden de fuentes oficiales', () => {
  const links = [{ tipo: 'video', oficial: true, url: 'https://example.com/interprete' }, { tipo: 'video', oficial: true, url: 'https://example.com/sello' }];
  assert.deepEqual(groupLinks(links).audio, []); assert.deepEqual(groupLinks(links).letra, []);
  assert.equal(groupLinks(links).video[0].url, links[0].url);
});
test('descarta duplicados y URLs inválidas antes de aplicar el límite', () => {
  const valid = { tipo: 'audio', url: 'https://example.com/audio' };
  const groups = groupLinks([valid, valid, { tipo: 'audio', url: 'javascript:alert(1)' }, { tipo: 'audio', url: 'https://user:secret@example.com' }]);
  assert.equal(groups.audio.length, 1);
});
