# Perfume de Alabanza — auditoría de discografía y enlaces
Actualizado: 22 de octubre de 2026. El catálogo vigente es `docs/catalogo.json` (GitHub); no utilizar Google Sheets.

## Orden y verificación
1. Fuente primaria o distribuidor: canal Ríos de Vida, Spotify/Apple/Amazon del artista, discografía comercial Qobuz con sello acreditado.
2. Recorrer cada producción y contrastar títulos con `docs/catalogo.json`.
3. Enlace por canción, no enlazar páginas generales de disco simulando ser un tema. Para conciertos históricos se aceptaron enlaces YouTube con `&t=SEGUNDOSs`, **identificados expresamente como segmento de álbum completo**. Comprobar que el punto de inicio corresponde al título.
4. Fuentes de terceros para Letra y Acordes al final, con coincidencia inequívoca y sin asumir oficialidad.
5. Nunca alojar audio, video, letra ni cifrados. No añadir campos a la ficha.

## Fuentes principales y repertorios
- Primer álbum, 1995, 14 pistas, Tengo Un Perfume: https://music.apple.com/us/album/tengo-un-perfume/1746361790
- Segundo álbum, 1996, 14 pistas, Rey Soberano / Al Rey Soberano: https://music.apple.com/us/album/rey-soberano/1819996414
- Tercer álbum histórico, 1998, Perfume de Alabanza 3, 12 pistas: video de Ríos de Vida https://www.youtube.com/watch?v=d3CZ7x4_QKM y discografía en Qobuz https://www.qobuz.com/be-nl/album/perfume-de-alabanza-3-perfume-de-alabanza/qbvcw08ta8vhb
- Todo Adoración, 2000, 14 pistas: https://music.amazon.com/albums/B0FMLC3XCS
- Anhelamos Conocerte, **grabación original de 2003**, 13 pistas según sello Top Studio Records: https://www.qobuz.com/be-nl/album/anhelamos-conocerte-perfume-de-alabanza/xoub0h1ghltra ; edición digital 2024: https://music.apple.com/us/album/anhelamos-conocerte/1750537131
- Ríos de Vida: 40 Años, 15 pistas. Edición citada como 2007 en Spotify/YouTube; Qobuz muestra fecha 1999 en otro catálogo. Hay **conflicto de metadatos de edición**, no inferir fecha única: https://www.youtube.com/watch?v=KK2m4JnPnvc ; https://www.qobuz.com/be-nl/album/rios-de-vida-40-anos-la-iglesia-en-culto-de-adoracion-perfume-de-alabanza/bnykxg4gn86kc
- Recopilación 20 Años, 2015, 15 pistas, contiene versiones y remasterizaciones de temas anteriores: https://www.qobuz.com/be-nl/album/perfume-20-anos-perfume-de-alabanza/ycanrgzl1fb0b
- Sencillo Ríos de Vida, 2022, colaboración con Música Cristiana, acreditado a Perfume de Alabanza: https://open.spotify.com/track/0C2xEmKweBf5hp8cxVIwXN (evitar dar por confirmada la originalidad/autorización del distribuidor de esta colaboración).

## Estado de la última publicación
Se agregaron 25 fichas y 36 enlaces en la revisión de octubre 2026 posterior al catálogo de 135 canciones; ahora se calculan siempre cantidades reales directamente desde el JSON. Los 27 enlaces de video históricos dirigidos a YouTube son accesos al minuto exacto dentro de un álbum completo, no videoclips autónomos. No se duplican canciones cuando reaparecen en recopilaciones.

## Pendientes reales para considerar «completo»
- Revisar con el titular del canal la oficialidad de las 2 publicaciones históricas; el canal se presenta como Ríos de Vida.
- Revisar lista de canciones individuales y variantes de **Al Rey Soberano**, incluyendo nombres alternativos «Sentado sobre tu nombre», «Sentado sobre tu trono», «Sentado sobre su trono», «Rey Soberano», «Al Rey Soberano», y «Que tu amor, oh Señor». Evitar mezclar grabaciones distintas o duplicar canciones por pequeñas diferencias ortográficas.
- Investigar todos los vídeos *individuales* del canal, no únicamente álbumes completos.
- Investigar cada uno de los 16 temas históricos sin URL de audio individual en 1998 y Ríos de Vida 40 Años, y registrar un enlace por pista solo cuando se confirme.
- El repertorio de 2003 tiene 13/13 títulos incorporados en fichas con al menos un audio de plataforma, pero faltan otras plataformas y versiones.
- Buscar exhaustivamente Letras y Acordes en fuentes externas una vez revisado el material oficial. Muchas fichas aún carecen de estos dos tipos. No publicar letras/chords copiados.
- El indicador `oficial=true` de enlaces heredados precisa auditoría de procedencia; no asumir que todos los 100+ indicadores históricos están confirmados.
- No declarar discografía exhaustivamente completa mientras existan lanzamientos, colaboraciones o pistas oficiales sin auditar.

## Anotaciones
Las fichas del catálogo público solo muestran título, intérprete, categoría y las cuatro secciones Audio, Video, Letra y Acordes. Los detalles de discos y fechas quedan únicamente en esta auditoría interna, tal como pidió el usuario.
