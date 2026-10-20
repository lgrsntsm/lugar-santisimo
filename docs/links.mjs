// Conservar el orden editorial entre fuentes oficiales: el intérprete va primero
// en el catálogo exportado, seguido por las fuentes alternativas.
export function groupLinks(links = []) {
  const groups = { audio: [], video: [], letra: [] };
  const seen = new Set();
  for (const link of [...links].sort((a, b) => Number(b.oficial === true) - Number(a.oficial === true))) {
    if (!Object.hasOwn(groups, link.tipo)) continue;
    let url;
    try { url = new URL(link.url); } catch { continue; }
    if (url.protocol !== 'https:' || url.username || url.password) continue;
    const key = `${link.tipo}:${url.href}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if ((link.tipo === 'audio' || link.tipo === 'video') && groups[link.tipo].length >= 3) continue;
    groups[link.tipo].push({ ...link, url: url.href });
  }
  return groups;
}
