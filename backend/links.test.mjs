import test from 'node:test';
import assert from 'node:assert/strict';
import { groupLinks } from '../docs/links.mjs';

test('YouTube va a Vídeo; Spotify y YouTube Music primero, otras plataformas también en Audio', () => {
  const groups = groupLinks([
    { tipo: 'audio', oficial: true, url: 'https://www.youtube.com/watch?v=video' },
    { tipo: 'audio', oficial: true, url: 'https://open.spotify.com/track/audio' },
    { tipo: 'audio', oficial: true, url: 'https://music.youtube.com/watch?v=audio' },
    { tipo: 'audio', oficial: false, url: 'https://music.amazon.com/tracks/alternative' },
    { tipo: 'audio', oficial: false, url: 'https://music.apple.com/song/alternative' },
  ]);
  assert.deepEqual(groups.audio.map(x => new URL(x.url).hostname), ['open.spotify.com', 'music.youtube.com', 'music.apple.com', 'music.amazon.com']);
  assert.deepEqual(groups.video.map(x => new URL(x.url).hostname), ['www.youtube.com']);
});

test('Corrige un video cargado por error como audio sin duplicarlo', () => {
  const url = 'https://www.youtube.com/watch?v=video';
  const groups = groupLinks([{ tipo: 'audio', url }, { tipo: 'video', url }]);
  assert.equal(groups.audio.length, 0);
  assert.equal(groups.video.length, 1);
});

test('La prioridad conserva primero las fuentes oficiales de la misma plataforma', () => {
  const groups = groupLinks([
    { tipo: 'audio', oficial: false, url: 'https://open.spotify.com/track/1' },
    { tipo: 'audio', oficial: true, url: 'https://open.spotify.com/track/2' },
  ]);
  assert.equal(groups.audio[0].oficial, true);
});

test('Letra excluye videos y mantiene páginas de texto escritas', () => {
  const groups = groupLinks([
    { tipo: 'letra', url: 'https://www.youtube.com/watch?v=video' },
    { tipo: 'letra', url: 'https://www.cifraclub.com/marcos-witt/renuevame/letra/' },
  ]);
  assert.equal(groups.letra.length, 1);
  assert.equal(new URL(groups.letra[0].url).hostname, 'www.cifraclub.com');
});

test('Todos los audios se muestran y los videos se limitan a tres', () => {
  const links = [
    ...Array.from({ length: 5 }, (_, i) => ({ tipo: 'audio', oficial: i === 4, url: `https://open.spotify.com/track/${i}` })),
    ...Array.from({ length: 5 }, (_, i) => ({ tipo: 'video', oficial: i === 4, url: `https://www.youtube.com/watch?v=${i}` })),
  ];
  const g = groupLinks(links);
  assert.equal(g.audio.length, 5);
  assert.equal(g.video.length, 3);
  assert.equal(g.audio[0].oficial, true);
  assert.equal(g.video[0].oficial, true);
});

test('Descarta duplicados, URLs inválidas y credenciales', () => {
  const valid = { tipo: 'audio', url: 'https://open.spotify.com/track/1' };
  const groups = groupLinks([valid, valid, { tipo: 'audio', url: 'javascript:alert(1)' }, { tipo: 'audio', url: 'https://user:secret@open.spotify.com/track/2' }]);
  assert.equal(groups.audio.length, 1);
});
