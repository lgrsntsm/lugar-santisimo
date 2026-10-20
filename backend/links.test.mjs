import test from 'node:test';
import assert from 'node:assert/strict';
import { groupLinks } from '../docs/links.mjs';
test('audios oficiales de YouTube Spotify y YouTube Music van antes que Apple', () => {
  const urls = ['https://music.apple.com/song/1', 'https://music.youtube.com/watch?v=1', 'https://open.spotify.com/track/1', 'https://www.youtube.com/watch?v=1'];
  const groups = groupLinks(urls.map(url => ({ tipo: 'audio', oficial: true, url })));
  assert.deepEqual(groups.audio.map(l => new URL(l.url).hostname), ['www.youtube.com', 'open.spotify.com', 'music.youtube.com']);
});
test('la prioridad de plataforma conserva primero las fuentes oficiales', () => {
  const groups = groupLinks([{ tipo: 'audio', oficial: false, url: 'https://www.youtube.com/watch?v=1' }, { tipo: 'audio', oficial: true, url: 'https://music.apple.com/song/1' }]);
  assert.equal(groups.audio[0].oficial, true);
});
test('Letra excluye videos mal clasificados y conserva páginas de texto', () => {
  const groups = groupLinks([
    { tipo: 'letra', oficial: true, url: 'https://www.youtube.com/watch?v=CSd-I2LUGv0' },
    { tipo: 'letra', url: 'https://youtu.be/CSd-I2LUGv0' },
    { tipo: 'letra', url: 'https://vimeo.com/12345' },
    { tipo: 'letra', url: 'https://example.com/lyric.mp4' },
    { tipo: 'letra', url: 'https://www.cifraclub.com/marcos-witt/renuevame/letra/' },
  ]);
  assert.equal(groups.letra.length, 1);
  assert.equal(new URL(groups.letra[0].url).hostname, 'www.cifraclub.com');
});
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
