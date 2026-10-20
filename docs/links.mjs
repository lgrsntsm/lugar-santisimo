// Solo mostrar medios de las plataformas prioritarias.
// Amazon y Apple Music permanecen en Sheets y catálogo para una etapa posterior.
export function isTextLyricsUrl(value) {
  let url;
  try { url = new URL(value); } catch { return false; }
  if (url.protocol !== 'https:' || url.username || url.password) return false;
  const host = url.hostname.toLowerCase();
  const mediaHosts = ['youtube.com', 'youtube-nocookie.com', 'youtu.be', 'vimeo.com', 'dailymotion.com', 'dai.ly', 'tiktok.com', 'spotify.com', 'music.apple.com', 'soundcloud.com'];
  return !mediaHosts.some(domain => host === domain || host.endsWith(`.${domain}`)) && !/\.(mp4|webm|mov|m4v|mp3|m4a|ogg|wav|m3u8)$/i.test(url.pathname);
}

function platform(url) {
  const h = url.hostname.toLowerCase();
  if (h === 'music.youtube.com') return 'youtube-music';
  if (h === 'youtube.com' || h.endsWith('.youtube.com') || h === 'youtu.be') return 'youtube';
  if (h === 'spotify.com' || h.endsWith('.spotify.com')) return 'spotify';
  return 'other';
}

export function groupLinks(links = []) {
  const groups = { audio: [], video: [], letra: [] };
  const seen = new Set();
  for (const link of links) {
    let url;
    try { url = new URL(link.url); } catch { continue; }
    if (url.protocol !== 'https:' || url.username || url.password) continue;
    const service = platform(url);
    let type = link.tipo;
    // Un enlace de vídeo normal de YouTube va siempre en Video,
    // aunque haya sido cargado erróneamente como audio.
    if (service === 'youtube' && (type === 'audio' || type === 'video')) type = 'video';
    if (service === 'youtube-music' && (type === 'audio' || type === 'video')) type = 'audio';
    if (service === 'spotify' && (type === 'audio' || type === 'video')) type = 'audio';
    if (type === 'audio' && !['youtube-music', 'spotify'].includes(service)) continue;
    if (type === 'video' && service !== 'youtube') continue;
    if (type === 'letra' && !isTextLyricsUrl(url.href)) continue;
    if (!Object.hasOwn(groups, type)) continue;
    const key = `${type}:${url.href}`;
    if (seen.has(key)) continue;
    seen.add(key);
    groups[type].push({ ...link, tipo: type, url: url.href });
  }
  const officialFirst = (a, b) => Number(b.oficial === true) - Number(a.oficial === true);
  groups.audio.sort((a, b) => officialFirst(a, b) || (platform(new URL(a.url)) === 'youtube-music' ? -1 : 0) - (platform(new URL(b.url)) === 'youtube-music' ? -1 : 0));
  groups.video.sort(officialFirst);
  groups.audio = groups.audio.slice(0, 3);
  groups.video = groups.video.slice(0, 3);
  return groups;
}
