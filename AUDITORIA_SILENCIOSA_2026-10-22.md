# Auditoría silenciosa de catálogo — 22/10/2026

**Estado:** primera pasada exploratoria concluida; **NO** auditoría exhaustiva de URL por URL. Sin cambios en `docs/catalogo.json`, sin publicar enlaces no comprobados. Fuente única GitHub (sin Sheets).

## Inventario revisado desde el catálogo

- 202 canciones en catálogo; 449 enlaces: 149 audio, 78 video, 116 letra, 106 acordes.
- 102 canciones tienen **un solo enlace**. Un enlace no implica error, pero requiere comprobar si existen fuentes alternativas.
- Intérpretes (IDs distintos): 24; seis históricos incorporados recientemente tienen 1 enlace por canción: Manuel Bonilla (6), Los Voceros de Cristo (10), Rabito (5), Nena Leal (6), Palabra en Acción (9), Stanislao Marino (6).
- Perfume de Alabanza: 68 fichas, 49 con un solo enlace. No confundir falta de Audio individual con falta total de acceso; algunos enlaces dirigidos al minuto del tema dentro de un álbum completo.
- En la ficha CAN-000159 «Es la hora del amor» consta `ENL-000483`, URL https://www.youtube.com/watch?v=KK2m4JnPnvc&t=3340s . La descripción del video efectivamente identifica el tema de 55:40 a 58:02. **Si la web muestra las cuatro secciones vacías, inspeccionar la capa de filtrado/renderizado**, no eliminar por defecto el enlace del JSON. El video proviene del canal «Ríos de Vida» presentado como Official Artist Channel en YouTube: https://www.youtube.com/watch?v=KK2m4JnPnvc
- Los conteos de enlaces incluyen solo los tipos tradicionales. Inspeccionar por separado enlaces de interés a álbumes y evitar atribución incorrecta a la grabación individual.

## Nuevas fuentes y pistas descubiertas

### Palabra en Acción y Juan Carlos Alvarado
1. **Sitio del intérprete asociado**: https://juancarlosalvarado.com/ — su biografía menciona expresamente la etapa Palabra en Acción con «El poderoso de Israel», «Santo es el Señor» y «Jehová es mi guerrero»; fuente primaria para la relación artística.
2. **Catálogo del artista en Amazon Music**: https://music.amazon.com/artists/B001NYAJYE/palabra-en-acci%C3%B3n — álbumes Digno De Alabar (1987), Jehová Es Mi Guerrero (1988), Glorificad a Jehová (1989), Santo Es El Señor (1990), Más Que Vencedor (1991), Así Es Él (1992), Quiero Ser Adorador (1994), Ahora Soy Libre (1995), En Todo Tiempo (En Vivo) (2002), Instrumental (2018) y Completos En Él (2026). No asumir que las fechas digitales son siempre originales.
3. Spotify, álbum individual: https://open.spotify.com/album/4akUR2cLa9bz7UfRelv8D8 — Más Que Vencedor, 16 pistas según listado, coacreditado a Juan Carlos Alvarado; derechos indicados como Palabra en Acción, bajo licencia Fuego Music / Adarga Entertainment. Extraer y verificar enlaces individuales por pista antes de incorporarlos.
4. Revisión cruzada de títulos: https://kworb.net/spotify/artist/1NWIpqck2zZ43JamLJgf6U_albums.html — catálogo comercial complementario, **no fuente de oficialidad**.

### Rabito
1. **Nueva fuente para descubrir repertorio y distinguir etapas**: https://www.buenamusica.com/rabito/discografia — registra lanzamientos 1973–2011 y distingue primeros discos seculares del repertorio cristiano. Contrastar año y contenido antes de añadir canciones.
2. **Catálogo Shazam**: https://www.shazam.com/artist/%2A/355932948/releases — álbumes, sencillos y ediciones 1972–2024; útil para localizar reediciones y singles sin trasladar automáticamente contenidos seculares.
3. **Fuente complementaria con 50 títulos**: https://musicascristianas.online/artistas/rabito/ — lista de repertorio para cruzar canción por canción; origen de videos indicado como publicaciones oficiales pero hay que comprobar cada enlace.
4. **Álbum completo con lista de canciones**: https://www.youtube.com/watch?v=qrV3g_V8FxM — BUILDING MUSIC (canal verificado) publicó Sinceridad, con once entradas, incluida una pista adicional de otro artista. No incluir pista extra como canción de Rabito; **no presumir que canal verificado = canal oficial de Rabito**.
5. Fuente histórica adicional de 6 álbumes: https://musicacristianavip.net/rabito/biografia/ . Distinguir discrepancias de número de discos/tracks con las fuentes anteriores, no considerar cifra absoluta.

### Perfume de Alabanza: comprobación de video histórico
YouTube, canal «Ríos de Vida» (presentado como canal oficial de artista), video Ríos de Vida 40 Años: https://www.youtube.com/watch?v=KK2m4JnPnvc ; descripción con 15 temas y marcas de tiempo. Confirmada correspondencia «Es la hora del amor» 00:55:40 y «Cristo amor de mis amores» 00:42:09. Esta fuente aporta video histórico legítimamente identificado, no necesita búsqueda genérica sin tiempo.

## Puntos de atención
- **No hubo comprobación HTTP individual de 449 enlaces**: ni debe declararse que estén vivos todos. La primera pasada comprobó consistencia del archivo y contrastó fuentes representativas en internet.
- En el sitio el problema descrito por el usuario en «Es la hora del amor» merece diagnóstico técnico: JSON incluye un video pero la ficha podría omitirlo por lógica de agrupación o clasificación. Hay que inspeccionar `docs/links.mjs` y `docs/app.mjs` si persiste.
- Reforzar búsqueda de fuentes nuevas por discográficas, ISRC, títulos alternativos, contratapas y canales históricos; priorizar artistas antiguos con fichas de un solo enlace.
- Criterio editorial de usuario: material cristiano evangélico/pentecostal; fuentes católicas pertinentes se pueden consultar, pero **excluir adventistas y mormones** de la investigación.
- No introducir enlaces a descargas posiblemente no autorizadas; un disco completo desde un canal de terceros requiere revisión de procedencia.

## Siguientes auditorías
- Cruzar pista por pista la discografía oficial y album tracklists contra JSON, especialmente Rabito y Palabra en Acción; sacar candidatos con prueba verificable y tipos de enlace.
- Releer links.mjs para detectar enlaces erróneamente invisibles y hacer pruebas de regresión.
- Continuar por Perfume de Alabanza (68), Los Voceros (10), Manuel Bonilla (6), Nena Leal (6), Stanislao Marino (6), después resto; no limitar a estos artistas ni repetir solo estas fuentes.

## Hallazgo técnico confirmado tras inspeccionar el código
- `docs/links.mjs` **excluye de la visualización todos los enlaces Apple Music y Amazon Music**, aunque `docs/catalogo.json` los almacene. Por tanto, una ficha puede tener un enlace de audio en GitHub y mostrar «Sin información encontrada» en la web. Esta es una causa concreta de fichas aparentemente vacías. Debe tomarse una decisión editorial sobre visibilidad de plataformas y revisar compatibilidad de las reglas antes de cambiar la interfaz.
- `docs/links.mjs` restringe los videos a YouTube y a un máximo de tres. Un enlace alternativo en otras plataformas no se muestra. Esto exige auditar cobertura **visible**, no solo cobertura del JSON.
- Recomendación: agregar un test automático que ejecute `groupLinks(song.enlaces)` sobre todas las canciones y marque cuáles quedan sin enlaces VISIBLES, además de listar los enlaces filtrados por plataforma. No se alteraron reglas ni enlaces públicos durante esta auditoría.
