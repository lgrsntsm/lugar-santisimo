import { filterSongs } from './filter.mjs';
const $ = selector => document.querySelector(selector);
let songs = [], category = '', favoritesOnly = false;
let favorites;
try { const stored = JSON.parse(localStorage.getItem('ls-favorites-v1') || '[]'); favorites = new Set(Array.isArray(stored) ? stored.filter(id => typeof id === 'string') : []); }
catch { favorites = new Set(); }
const colors = ['#56644f', '#a87956', '#5c536b', '#6b3545', '#657982'];
const initials = text => text.split(/\s+/).slice(0, 2).map(word => word[0]).join('');
function element(tag, className, text) { const e = document.createElement(tag); if (className) e.className = className; if (text !== undefined) e.textContent = text; return e; }
function updateCount() { $('#favorite-count').textContent = songs.filter(s => favorites.has(s.id)).length; }
function showLinks(song) {
  $('#dialog-title').textContent = song.titulo;
  $('#dialog-artists').textContent = song.interpretes.map(a => a.nombre).join(' · ');
  $('#dialog-links').replaceChildren();
  for (const [index, link] of song.enlaces.entries()) {
    let url; try { url = new URL(link.url); } catch { continue; }
    if (url.protocol !== 'https:' || url.username || url.password) continue;
    const a = element('a', 'platform-link'); a.href = url.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
    const label = element('span'); label.append(element('strong', '', link.plataforma || 'Abrir enlace'), element('small', '', `${link.oficial ? 'Fuente oficial' : 'Enlace externo'}${index ? ' · Alternativa' : ''}`));
    a.append(label, element('span', '', '↗')); $('#dialog-links').append(a);
  }
  $('#song-dialog').showModal();
}
function render() {
  const list = filterSongs(songs, { query: $('#search').value, category, favoritesOnly, favorites, sort: $('#sort').value });
  $('#songs').replaceChildren(); $('#empty').hidden = list.length > 0;
  $('#results-count').textContent = `${list.length} ${list.length === 1 ? 'canción' : 'canciones'}`;
  $('#favorites-note').hidden = !favoritesOnly;
  $('#favorites-tab').setAttribute('aria-pressed', favoritesOnly);
  for (const song of list) {
    const index = songs.indexOf(song);
    const card = element('article', 'song-card');
    const cover = element('div', 'song-cover'); cover.style.setProperty('--cover', colors[index % colors.length]);
    const decor = element('span', 'cover-monogram', initials(song.interpretes[0].nombre)); decor.setAttribute('aria-hidden', 'true');
    cover.append(element('span', 'cover-index', String(index + 1).padStart(2, '0')), decor, element('span', 'cover-caption', 'LUGAR SANTÍSIMO · SELECCIÓN INICIAL'));
    const favorite = element('button', 'favorite-button', favorites.has(song.id) ? '♥' : '♡'); favorite.type = 'button';
    favorite.setAttribute('aria-label', `${favorites.has(song.id) ? 'Quitar de' : 'Agregar a'} favoritas: ${song.titulo}`); favorite.setAttribute('aria-pressed', favorites.has(song.id));
    favorite.addEventListener('click', () => {
      const scroll = window.scrollY;
      if (favorites.has(song.id)) favorites.delete(song.id); else favorites.add(song.id);
      try { localStorage.setItem('ls-favorites-v1', JSON.stringify([...favorites])); }
      catch { $('#toast').hidden = false; $('#toast').textContent = 'No se pudieron guardar las favoritas. Se conservarán durante esta visita.'; }
      render(); window.scrollTo({ top: scroll, behavior: 'instant' });
      const replacement = [...document.querySelectorAll('.favorite-button')].find(button => button.dataset.song === song.id); replacement?.focus({ preventScroll: true });
    }); favorite.dataset.song = song.id; cover.append(favorite);
    const body = element('div', 'song-body'); body.append(element('span', 'song-tag', song.categorias.map(c => c.nombre).join(' / ')), element('h3', '', song.titulo), element('p', 'artists', song.interpretes.map(a => a.nombre).join(' · ')));
    const bottom = element('div', 'song-bottom'); const listen = element('button', 'listen'); listen.type = 'button'; listen.append(element('span', '', '▶'), document.createTextNode(`Escuchar${song.enlaces.length > 1 ? ` · ${song.enlaces.length} enlaces` : ''}`)); listen.setAttribute('aria-label', `Ver enlaces para escuchar ${song.titulo}`); listen.addEventListener('click', () => showLinks(song));
    bottom.append(listen); if (song.enlaces.some(link => link.oficial)) bottom.append(element('span', 'official', 'Enlace oficial'));
    body.append(bottom); card.append(cover, body); $('#songs').append(card);
  }
  updateCount();
}
function selectCategory(id) { category = id; for (const b of $('#categories').children) b.setAttribute('aria-pressed', b.dataset.category === id); render(); }
$('#categories').addEventListener('click', event => { const button = event.target.closest('button[data-category]'); if (button) selectCategory(button.dataset.category); });
$('#search').addEventListener('input', render); $('#sort').addEventListener('change', render);
$('#favorites-tab').addEventListener('click', () => { favoritesOnly = !favoritesOnly; render(); $('#catalogo').scrollIntoView(); });
$('#reset').addEventListener('click', () => { $('#search').value = ''; favoritesOnly = false; selectCategory(''); $('#search').focus(); });
$('#close-dialog').addEventListener('click', () => $('#song-dialog').close());
$('#song-dialog').addEventListener('click', event => { if (event.target === $('#song-dialog')) { const box = event.target.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.target.close(); } });
async function load() {
  $('#load-error').hidden = true; $('#empty').hidden = true; $('#songs').setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('./catalogo.json', { cache: 'no-cache' }); if (!response.ok) throw new Error('Catálogo no disponible');
    const catalog = await response.json(); if (catalog.schema_version !== 1 || !Array.isArray(catalog.canciones)) throw new Error('Catálogo incompatible');
    songs = catalog.canciones;
    const categories = new Map(songs.flatMap(song => song.categorias.map(c => [c.id, c.nombre])));
    $('#categories').querySelectorAll('button:not([data-category=""])').forEach(button => button.remove());
    for (const [id, name] of categories) { const b = element('button', '', name); b.type = 'button'; b.dataset.category = id; b.setAttribute('aria-pressed', 'false'); $('#categories').append(b); }
    render();
  } catch { $('#load-error').hidden = false; $('#songs').replaceChildren(); $('#results-count').textContent = 'Catálogo no disponible'; }
  finally { $('#songs').setAttribute('aria-busy', 'false'); }
}
$('#retry').addEventListener('click', load); load();
