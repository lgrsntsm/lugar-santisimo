import { filterSongs } from './filter.mjs';
import { groupLinks } from './links.mjs?v=media3';
const $ = selector => document.querySelector(selector);
let songs = [], category = '';
function shuffle(input) {
  const list = [...input];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}
const colors = ['#56644f', '#a87956', '#5c536b', '#6b3545', '#657982'];
const initials = text => text.split(/\s+/).slice(0, 2).map(word => word[0]).join('');
function element(tag, className, text) { const e = document.createElement(tag); if (className) e.className = className; if (text !== undefined) e.textContent = text; return e; }
function showLinks(song) {
  $('#dialog-title').textContent = `🧾 Título: ${song.titulo || 'Sin información encontrada'}`;
  $('#dialog-artists').textContent = `🎙️ Intérprete: ${song.interpretes.map(a => a.nombre).filter(Boolean).join(' · ') || 'Sin información encontrada'}`;
  $('#dialog-links').replaceChildren();
  const groups = groupLinks(song.enlaces);
  for (const [type, heading] of [['audio', '🎹 Audio:'], ['video', '⏯️ Video:'], ['letra', '🔡 Letra:']]) {
    const section = element('section', 'detail-section');
    const h = element('h3', 'detail-heading', heading); h.id = `detail-${type}`; section.setAttribute('aria-labelledby', h.id); section.append(h);
    for (const link of groups[type]) {
      const a = element('a', 'platform-link'); a.href = link.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      const label = element('span'); label.append(element('strong', '', link.plataforma || 'Abrir enlace'));
      a.append(label, element('span', '', '↗')); section.append(a);
    }
    if (!groups[type].length) section.append(element('p', 'detail-empty', 'Sin información encontrada.'));
    $('#dialog-links').append(section);
  }
  const report = element('a', 'report-link report-song', '¿Enlace roto?');
  const options = [['audio', 'Audio'], ['video', 'Video'], ['letra', 'Letra']]
    .flatMap(([type, name]) => groups[type].map((link, index) => `${name} ${index + 1}: ${link.plataforma} — ${link.url}`))
    .join('\n');
  report.href = `mailto:lgrsntsm@gmail.com?subject=${encodeURIComponent('Lugar Santísimo · Reportar enlace roto')}&body=${encodeURIComponent(`Canción: ${song.titulo}\n\nIndicá qué enlace no funciona:\n${options}\n\nEnlace roto (sección y número o plataforma): `)}`;
  report.setAttribute('aria-label', `Reportar un enlace roto de ${song.titulo}`);
  $('#dialog-links').append(report);
  $('#song-dialog').showModal();
}
function render() {
  const list = filterSongs(songs, { query: $('#search').value, category, sort: $('#sort').value });
  $('#songs').replaceChildren(); $('#empty').hidden = list.length > 0;
  $('#results-count').textContent = `${list.length} ${list.length === 1 ? 'canción' : 'canciones'}`;
  for (const song of list) {
    const index = songs.indexOf(song);
    const card = element('article', 'song-card');
    card.addEventListener('click', event => { if (!event.target.closest('button, a')) showLinks(song); });
    const body = element('div', 'song-body'); const title = element('h3'); const openTitle = element('button', 'song-title', song.titulo); openTitle.type = 'button'; openTitle.addEventListener('click', () => showLinks(song)); title.append(openTitle, element('span', 'song-separator', ' | '), element('span', 'song-inline-artist', song.interpretes.map(a => a.nombre).join(' · '))); body.append(element('span', 'song-tag', song.categorias.map(c => c.nombre).join(' / ')), title);
    const bottom = element('div', 'song-bottom'); const listen = element('button', 'read-button'); listen.type = 'button';
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('d', 'M12 5v15M12 5C8 2 3 4 3 4v14s5-2 9 2c4-4 9-2 9-2V4s-5-2-9 1Z'); icon.append(path);
    listen.append(icon, element('span', '', 'Leer')); listen.setAttribute('aria-label', `Leer enlaces de ${song.titulo}`); listen.addEventListener('click', () => showLinks(song));
    bottom.append(listen); if (song.enlaces.some(link => link.oficial)) bottom.append(element('span', 'official', 'Enlace oficial'));
    body.append(bottom); card.append(body); $('#songs').append(card);
  }
}
function selectCategory(id) { category = id; for (const b of $('#categories').children) b.setAttribute('aria-pressed', b.dataset.category === id); render(); }
$('#categories').addEventListener('click', event => { const button = event.target.closest('button[data-category]'); if (button) selectCategory(button.dataset.category); });
$('#search').addEventListener('input', render); $('#sort').addEventListener('change', render);
$('#reset').addEventListener('click', () => { $('#search').value = ''; selectCategory(''); $('#search').focus(); });
$('#close-dialog').addEventListener('click', () => $('#song-dialog').close());
$('#song-dialog').addEventListener('click', event => { if (event.target === $('#song-dialog')) { const box = event.target.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.target.close(); } });
async function load() {
  $('#load-error').hidden = true; $('#empty').hidden = true; $('#songs').setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('./catalogo.json', { cache: 'no-cache' }); if (!response.ok) throw new Error('Catálogo no disponible');
    const catalog = await response.json(); if (catalog.schema_version !== 1 || !Array.isArray(catalog.canciones)) throw new Error('Catálogo incompatible');
    songs = shuffle(catalog.canciones);
    const categories = new Map(songs.flatMap(song => song.categorias.map(c => [c.id, c.nombre])));
    $('#categories').querySelectorAll('button:not([data-category=""])').forEach(button => button.remove());
    for (const [id, name] of categories) { const b = element('button', '', name); b.type = 'button'; b.dataset.category = id; b.setAttribute('aria-pressed', 'false'); $('#categories').append(b); }
    render();
  } catch { $('#load-error').hidden = false; $('#songs').replaceChildren(); $('#results-count').textContent = 'Catálogo no disponible'; }
  finally { $('#songs').setAttribute('aria-busy', 'false'); }
}
$('#retry').addEventListener('click', load); load();
