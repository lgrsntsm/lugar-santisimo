// Conservar el orden editorial entre fuentes oficiales: el intérprete va primero
// en el catálogo exportado, seguido por las fuentes alternativas.
export function isTextLyricsUrl(value) {
  let url;
  try { url = new URL(value); } catch { return false; }
  if (url.protocol !== 'https:' || url.username || url.password) return false;
  const host = url.hostname.toLowerCase();
  const mediaHosts = ['youtube.com', 'youtube-nocookie.com', 'youtu.be', 'vimeo.com', 'dailymotion.com', 'dai.ly', 'tiktok.com', 'spotify.com', 'music.apple.com', 'soundcloud.com'];
  return !mediaHosts.some(domain => host === domain || host.endsWith(`.${domain}`)) && !/\.(mp4|webm|mov|m4v|mp3|m4a|ogg|wav|m3u8)$/i.test(url.pathname);
}
export function groupLinks(links = []) {
  const groups = { audio: [], video: [], letra: [] };
  const seen = new Set();
  for (const link of [...links].sort((a, b) => Number(b.oficial === true) - Number(a.oficial === true))) {
    if (!Object.hasOwn(groups, link.tipo)) continue;
    let url;
    try { url = new URL(link.url); } catch { continue; }
    if (url.protocol !== 'https:' || url.username || url.password) continue;
    if (link.tipo === 'letra' && !isTextLyricsUrl(url.href)) continue;
    const key = `${link.tipo}:${url.href}`;
    if (seen.has(key)) continue;
    seen.add(key);
    groups[link.tipo].push({ ...link, url: url.href });
  }
  groups.audio.sort((a, b) => Number(b.oficial === true) - Number(a.oficial === true) || audioPlatformOrder(a) - audioPlatformOrder(b));
  groups.audio = groups.audio.slice(0, 3);
  groups.video = groups.video.slice(0, 3);
  return groups;
}

function audioPlatformOrder(link) {
  let host = '';
  try { host = new URL(link.url).hostname.toLowerCase(); } catch { return 3; }
  if (host === 'music.youtube.com') return 2;
  if (host === 'youtu.be' || host === 'youtube.com' || host.endsWith('.youtube.com')) return 0;
  if (host === 'spotify.com' || host.endsWith('.spotify.com')) return 1;
  if (host === 'music.apple.com') return 4;
  return 3;
}
