export const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function filterSongs(songs, { query = '', category = '', favoritesOnly = false, favorites = new Set(), sort = 'original' } = {}) {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const list = songs.filter(song => {
    const haystack = normalize([song.titulo, ...song.interpretes.map(a => a.nombre), ...song.categorias.map(c => c.nombre)].join(' '));
    return words.every(word => haystack.includes(word)) && (!category || song.categorias.some(c => c.id === category)) && (!favoritesOnly || favorites.has(song.id));
  });
  if (sort === 'title') list.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
  if (sort === 'artist') list.sort((a, b) => a.interpretes[0].nombre.localeCompare(b.interpretes[0].nombre, 'es') || a.titulo.localeCompare(b.titulo, 'es'));
  return list;
}
