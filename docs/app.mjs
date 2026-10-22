import { filterSongs } from './filter.mjs';
import { groupLinks } from './links.mjs?v=verified1';
const $ = selector => document.querySelector(selector);
let songs = [], category = '', currentPage = 1, albumsByArtist = new Map(), songsByArtist = new Map();
const PAGE_SIZE = 50;
const themeButton = $('#theme-toggle');
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
  themeButton.querySelector('.theme-toggle-label').textContent = dark ? 'Claro' : 'Oscuro';
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = dark ? '#121212' : '#f8f5ef';
}
themeButton.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  if (dark) document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  try { localStorage.setItem('lugar-santisimo-theme', dark ? 'dark' : 'light'); } catch (_) {}
  updateThemeButton();
});
updateThemeButton();
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

// ÁLBUMES COMPLETOS: repartir grupos de hasta tres sin repetir dentro de la ficha.
// Para N álbumes se distribuyen 3 por ficha y se reinicia la vuelta al agotar N.
function albumsForSong(song) {
  const result = [], used = new Set();
  for (const artist of song.interpretes) {
    const albums = albumsByArtist.get(artist.id) || [];
    const siblings = songsByArtist.get(artist.id) || [];
    const pos = siblings.findIndex(s => s.id === song.id);
    const start = (Math.max(0, pos) * 3) % (albums.length || 1);
    for (let j = 0; j < Math.min(3, albums.length); j++) {
      const album = albums[(start + j) % albums.length];
      if (!used.has(album.url)) {
        used.add(album.url);
        result.push(album);
      }
      if (result.length >= 3) return result;
    }
  }
  return result;
}
function renderDiscoveries(song) {
  const albums = albumsForSong(song);
  if (albums.length) {
    const section = element('section', 'detail-section interest-section');
    section.append(element('h3', 'detail-heading', '🔗 Enlaces de interés:'));
    for (const album of albums) {
      const a = element('a', 'interest-album');
      a.href = album.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.append(element('span', 'interest-album-title', album.titulo));
      a.append(element('span', 'interest-album-source', album.plataforma + ' ↗'));
      section.append(a);
    }
    $('#dialog-links').append(section);
  }
  const ids = new Set(song.interpretes.map(a => a.id));
  const candidates = songs.filter(s => s.id !== song.id && s.interpretes.some(a => ids.has(a.id)));
  if (!candidates.length) return;
  const section = element('section', 'detail-section recommendations-section');
  section.append(element('h3', 'detail-heading', '🎶 Más del artista:'));
  const list = element('div', 'recommended-songs');
  for (const suggested of shuffle(candidates).slice(0, 3)) {
    const b = element('button', 'recommended-song', suggested.titulo);
    b.type = 'button';
    b.setAttribute('aria-label', 'Abrir canción ' + suggested.titulo);
    b.addEventListener('click', () => showLinks(suggested));
    list.append(b);
  }
  section.append(list);
  $('#dialog-links').append(section);
}

function showLinks(song) {
  $('#dialog-title').textContent = `🧾 Título: ${song.titulo || 'Sin información encontrada'}`;
  $('#dialog-artists').textContent = `🎙️ Intérprete: ${song.interpretes.map(a => a.nombre).filter(Boolean).join(' · ') || 'Sin información encontrada'}`;
  const detailCategories = $('#dialog-categories');
  detailCategories.replaceChildren();
  for (const c of song.categorias || []) {
    const tag = element('button', 'song-category-chip', c.nombre);
    tag.type = 'button';
    tag.setAttribute('aria-label', `Ver todas las canciones de ${c.nombre}`);
    tag.addEventListener('click', () => {
      $('#song-dialog').close();
      $('#search').value = '';
      selectCategory(c.id);
      $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    detailCategories.append(tag);
  }
  detailCategories.hidden = !detailCategories.childElementCount;
  $('#dialog-links').replaceChildren();
  const groups = groupLinks(song.enlaces);
  for (const [type, heading] of [['audio', '🎹 Audio:'], ['video', '⏯️ Video:'], ['letra', '🔡 Letra:'], ['acordes', '🎸 Acordes:']]) {
    const section = element('section', 'detail-section');
    const h = element('h3', 'detail-heading', heading); h.id = `detail-${type}`; section.setAttribute('aria-labelledby', h.id); section.append(h);
    for (const link of groups[type]) {
      const item = element('div', 'platform-item');
      const a = element('a', 'platform-link'); a.href = link.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      const original = String(link.plataforma || '').trim();
      const parts = original.split(/\s*[·—]\s*/);
      const source = parts[0] || 'Abrir enlace';
      const detail = parts.slice(1).join(' · ');
      const title = song.titulo || 'Canción';
      const hasTitle = detail.toLocaleLowerCase('es').includes(title.toLocaleLowerCase('es'));
      const extra = detail && !hasTitle && !/^(letra|acordes?|audio|video|enlace oficial)$/i.test(detail) ? ' · ' + detail : '';
      const text = source + ' · ' + title + extra;
      const label = element('span', 'platform-label');
      label.append(element('strong', '', text));
      a.append(label, element('span', '', '↗'));
      item.append(a);
      if (link.oficial === true) {
        const verified = element('button', 'verified-link', '✓');
        verified.type = 'button';
        verified.setAttribute('aria-label', 'Mostrar información del enlace oficial');
        verified.setAttribute('aria-expanded', 'false');
        const tooltip = element('span', 'verified-tooltip', 'Link oficial');
        tooltip.setAttribute('role', 'tooltip');
        tooltip.hidden = true;
        verified.addEventListener('click', () => {
          const wasOpen = !tooltip.hidden;
          $('#dialog-links').querySelectorAll('.verified-tooltip').forEach(t => { t.hidden = true; });
          $('#dialog-links').querySelectorAll('.verified-link[aria-expanded]').forEach(b => b.setAttribute('aria-expanded', 'false'));
          tooltip.hidden = wasOpen;
          verified.setAttribute('aria-expanded', String(!wasOpen));
        });
        item.append(verified, tooltip);
      }
      section.append(item);
    }
    if (!groups[type].length) section.append(element('p', 'detail-empty', 'Sin información encontrada.'));
    $('#dialog-links').append(section);
  }
  renderDiscoveries(song);
  const report = element('button', 'report-link report-song', 'Presionar para reportar uno o varios enlaces rotos');
  report.type = 'button';
  report.setAttribute('aria-label', `Reportar enlaces rotos de ${song.titulo}`);
  const reportMessage = element('span', 'report-status');
  reportMessage.setAttribute('role', 'status');
  reportMessage.setAttribute('aria-live', 'polite');
  const storageKey = 'ls-broken-report-' + song.id;
  const getSaved = key => { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } };
  const reportedAt = getSaved(storageKey);
  if (typeof reportedAt === 'number' && Date.now() - reportedAt < 86400000) {
    report.textContent = 'Tu reporte ha sido enviado';
    report.disabled = true;
    report.classList.add('reported');
  }
  report.addEventListener('click', async () => {
    if (report.disabled) return;
    const now = Date.now();
    const recent = (getSaved('ls-broken-reports-history') || []).filter(t => typeof t === 'number' && now - t < 86400000);
    if (recent.length >= 5) {
      reportMessage.textContent = 'Alcanzaste el máximo de 5 reportes diarios. Gracias por ayudarnos.';
      return;
    }
    report.disabled = true;
    report.textContent = 'Enviando reporte…';
    reportMessage.textContent = '';
    try {
      const answer = await fetch('https://formsubmit.co/ajax/lgrsntsm@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Lugar Santísimo · Reporte de enlaces rotos',
          _captcha: 'false',
          _template: 'table',
          _url: 'https://lugarsantisimo.com.ar/',
          tipo: 'reporte_enlaces_rotos',
          cancion_id: song.id,
          titulo: song.titulo,
          interpretes: song.interpretes.map(a => a.nombre).join(' · '),
          cantidad_enlaces: song.enlaces.length,
          enlace_catalogo: 'https://lugarsantisimo.com.ar/',
          observacion: 'Un visitante indicó que uno o varios enlaces no funcionan; verificar antes de modificar nada.'
        })
      });
      const result = await answer.json();
      if (!answer.ok || (result.success !== true && result.success !== 'true')) throw new Error('Reporte no aceptado');
      localStorage.setItem(storageKey, String(now));
      localStorage.setItem('ls-broken-reports-history', JSON.stringify([...recent, now]));
      report.textContent = 'Tu reporte ha sido enviado';
      report.classList.add('reported');
      reportMessage.textContent = '';
    } catch (_) {
      report.textContent = 'Presionar para reportar uno o varios enlaces rotos';
      reportMessage.textContent = 'No pudimos enviar el reporte. Intentá nuevamente más tarde.';
      report.disabled = false;
    }
  });
  $('#dialog-links').append(report, reportMessage);
  const dialog = $('#song-dialog');
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
}
function render() {
  const list = filterSongs(songs, { query: $('#search').value, category, sort: $('#sort').value });
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  currentPage = Math.min(currentPage, pages);
  const visible = list.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  $('#songs').replaceChildren(); $('#empty').hidden = list.length > 0;
  $('#results-count').textContent = `${list.length} ${list.length === 1 ? 'canción' : 'canciones'}`;
  for (const song of visible) {
    const index = songs.indexOf(song);
    const card = element('article', 'song-card');
    card.addEventListener('click', event => { if (!event.target.closest('button, a')) showLinks(song); });
    const body = element('div', 'song-body'); const title = element('h3'); const openTitle = element('button', 'song-title', song.titulo); openTitle.type = 'button'; openTitle.addEventListener('click', () => showLinks(song)); title.append(openTitle); const heading = element('div', 'song-heading'); heading.append(title, element('p', 'song-artist-below', song.interpretes.map(a => a.nombre).join(' · '))); const cardTags = element('div', 'song-tag');
    for (const c of song.categorias || []) {
      const tag = element('button', 'song-category-chip', c.nombre);
      tag.type = 'button';
      tag.setAttribute('aria-label', `Filtrar canciones por ${c.nombre}`);
      tag.addEventListener('click', () => {
        $('#search').value = '';
        selectCategory(c.id);
        $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      cardTags.append(tag);
    }
    body.append(heading);
    const bottom = element('div', 'song-bottom');
    const listen = element('button', 'read-button'); listen.type = 'button';
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24'); icon.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M9 6.5a1 1 0 0 1 1.5-.86l9.1 5.5a1 1 0 0 1 0 1.72l-9.1 5.5A1 1 0 0 1 9 17.5z');
    icon.append(path);
    listen.append(icon);
    listen.setAttribute('aria-label', `Abrir enlaces de ${song.titulo}`);
    listen.title = 'Abrir canción';
    listen.addEventListener('click', () => showLinks(song));
    bottom.append(cardTags, listen);
    body.append(bottom); card.append(body); $('#songs').append(card);
  }
  renderPagination(list.length, pages);
}
function renderPagination(total, pages) {
  const nav = $('#pagination');
  nav.replaceChildren();
  nav.hidden = total <= PAGE_SIZE;
  if (nav.hidden) return;
  const go = page => {
    if (page < 1 || page > pages || page === currentPage) return;
    currentPage = page;
    render();
    $('#catalogo').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const make = (text, page, selected = false) => {
    const b = element('button', selected ? 'page-button is-current' : 'page-button', text);
    b.type = 'button'; b.disabled = selected;
    if (selected) b.setAttribute('aria-current', 'page');
    b.setAttribute('aria-label', selected ? `Página ${page}, actual` : `Ir a la página ${page}`);
    b.addEventListener('click', () => go(page));
    return b;
  };
  const prev = make('← Anterior', currentPage - 1);
  prev.disabled = currentPage === 1;
  nav.append(prev);
  const start = Math.max(1, Math.min(currentPage - 2, pages - 4));
  const end = Math.min(pages, start + 4);
  for (let n = start; n <= end; n++) nav.append(make(String(n), n, n === currentPage));
  const next = make('Siguiente →', currentPage + 1);
  next.disabled = currentPage === pages;
  nav.append(next);
  const summary = element('span', 'pagination-summary', `Mostrando ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, total)} de ${total}`);
  nav.append(summary);
}

function selectCategory(id) { currentPage = 1; category = id; for (const b of $('#categories').children) b.setAttribute('aria-pressed', b.dataset.category === id); render(); }
$('#categories').addEventListener('click', event => { const button = event.target.closest('button[data-category]'); if (button) selectCategory(button.dataset.category); });
$('#search').addEventListener('input', () => { currentPage = 1; render(); }); $('#sort').addEventListener('change', () => { currentPage = 1; render(); });
$('#reset').addEventListener('click', () => { $('#search').value = ''; selectCategory(''); $('#search').focus(); });
$('#close-dialog').addEventListener('click', () => $('#song-dialog').close());
$('#song-dialog').addEventListener('click', event => { if (event.target === $('#song-dialog')) { const box = event.target.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.target.close(); } });
async function load() {
  $('#load-error').hidden = true; $('#empty').hidden = true; $('#songs').setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('./catalogo.json', { cache: 'no-cache' }); if (!response.ok) throw new Error('Catálogo no disponible');
    const catalog = await response.json(); if (catalog.schema_version !== 1 || !Array.isArray(catalog.canciones)) throw new Error('Catálogo incompatible');
    songs = shuffle(catalog.canciones);
    songsByArtist = new Map();
    for (const song of songs) for (const artist of song.interpretes) {
      const entries = songsByArtist.get(artist.id) || [];
      entries.push(song);
      songsByArtist.set(artist.id, entries);
    }
    for (const list of songsByArtist.values()) list.sort((a,b) => a.id.localeCompare(b.id));
    albumsByArtist = new Map();
    for (const album of Array.isArray(catalog.albumes_interes) ? catalog.albumes_interes : []) {
      if (!album || !/^https:\/\//.test(album.url || '') || !['video', 'mp3'].includes(album.formato)) continue;
      if (!songsByArtist.has(album.interprete_id)) continue;
      const entries = albumsByArtist.get(album.interprete_id) || [];
      if (!entries.some(a => a.url === album.url)) entries.push(album);
      albumsByArtist.set(album.interprete_id, entries);
    }
    currentPage = 1;
    const categories = new Map(songs.flatMap(song => song.categorias.map(c => [c.id, c.nombre])));
    $('#categories').querySelectorAll('button:not([data-category=""])').forEach(button => button.remove());
    for (const [id, name] of categories) { const b = element('button', '', name); b.type = 'button'; b.dataset.category = id; b.setAttribute('aria-pressed', 'false'); $('#categories').append(b); }
    render();
  } catch { $('#load-error').hidden = false; $('#songs').replaceChildren(); $('#pagination').hidden = true; $('#results-count').textContent = 'Catálogo no disponible'; }
  finally { $('#songs').setAttribute('aria-busy', 'false'); }
}
$('#retry').addEventListener('click', load); load();
