# Lugar Santísimo

Sitio público: https://lugarsantisimo.com.ar  
Repositorio: https://github.com/lgrsntsm/lugar-santisimo

## Fuente única de datos: GitHub

**Desde el 21/10/2026, Google Sheets queda fuera del flujo de trabajo.** No se necesita acceder a Sheets, sincronizar, exportar ni mantener una planilla paralela.

- **Catálogo maestro y publicado:** `docs/catalogo.json`.
- **Sitio:** `docs/index.html`, `docs/app.mjs`, `docs/library.css` y demás archivos de `docs/`.
- **Alojamiento:** GitHub Pages desde `main` y la carpeta `/docs`.
- **Dominio:** https://lugarsantisimo.com.ar.
- **Historial y recuperación:** commits e historial de GitHub. No reescribir la historia.
- **Sin almacenamiento multimedia:** solo nombres, intérpretes, categorías y enlaces externos a Audio, Video, Letra y Acordes.

## Regla editorial prioritaria: profundidad antes que volumen

**Regla expresa y aclarada por el usuario (22/10/2026): conseguir la MAYOR cantidad posible de canciones, PERO con investigación exhaustiva y enlaces bien documentados.** Cantidad y calidad son objetivos simultáneos: nunca usar el alcance de la búsqueda como excusa para reducir artificialmente el repertorio, ni la cantidad como excusa para una investigación superficial. Toda incorporación futura debe seguir este procedimiento:

1. **Identidad y fuentes primarias**: verificar la web auténtica del intérprete y sus canales, sellos y perfiles musicales oficiales. Documentar la procedencia y evitar atribuir falsamente covers, versiones o grabaciones de terceros.
2. **Discografía exhaustiva antes de declarar terminado al intérprete**: recopilar álbumes, EP, sencillos, discos históricos, colaboraciones, reediciones y repertorio que esté disponible; contrastar listas de pistas y evitar repetidos. Investigar profundamente cada pista en fuentes oficiales y enlazar sus distintas versiones identificadas.
3. **Barrido de las cuatro secciones por canción**: Audio (Spotify, YouTube Music, Apple Music, Amazon Music y otras), Video (videos oficiales y archivos auténticos), Letra y Acordes (fuentes primarias, después sitios especializados). Revisar **múltiples sitios por sección**, no detenerse al hallar el primer resultado. Nunca inventar enlaces ni copiar obras.
4. **Control de calidad previo a publicar**: validar título, intérprete, identidad de grabación, URL individual, disponibilidad, legitimidad del sello verde, duplicados y alcance de la búsqueda. **No publicar nuevas tandas que únicamente contienen una pista de audio por canción sin intentar completar el resto de las fuentes**. Una ausencia documentada tras una búsqueda real es distinta de no haber buscado.
5. **Amplitud con profundidad**: investigar todos los álbumes y todas las canciones detectadas de cada artista; ampliar continuamente el número total de canciones, sin limitar arbitrariamente los artistas o las épocas. Los hallazgos pendientes de verificación quedan en notas de investigación hasta que se confirmen sus fichas y enlaces. Registrar faltantes para próximas auditorías, sin afirmar que la discografía ya está terminada.
6. **No declarar «discografía completa»** hasta comprobar razonablemente la lista de obras y registrar qué grabaciones/enlaces siguen sin localizar; fuentes y fechas contradictorias se investigan y no se disimulan.
7. No añadir campos nuevos a la web: las fichas continúan únicamente con Audio, Video, Letra y Acordes, intérprete y etiquetas existentes.

**Auditoría de la situación heredada (22/10/2026, 202 canciones):** 102 canciones tienen un solo enlace; 103 cubren una sola sección; 114 no tienen letras; 115 no tienen acordes; 138 no tienen videos. Estas cifras son diagnóstico, **no prueba automática de que existan los recursos ausentes**. Las fichas heredadas pueden conservarse mientras se depuran, pero **no se deben usar como modelo de calidad para nuevas incorporaciones**. Completar y verificar lo existente mientras se sigue ampliando el universo de artistas y canciones de forma profunda, no superficial. No rellenar por cantidad, no poner sellos falsos, no cambiar URLs sin verificación.

## Cómo incorporar canciones

1. **Buscar primero el sitio oficial del intérprete**, y comprobar que pertenezca al artista. Desde allí identificar perfiles oficiales de streaming, canales de YouTube y sello/distribuidora.
2. **Investigar exhaustivamente las fuentes oficiales**, por álbum, sencillo y pista, diferenciando grabaciones originales, nuevas versiones y covers.
3. **Después** consultar fuentes complementarias de letras, acordes e himnos. El check verde se utiliza solo para fuentes oficiales realmente verificadas.
4. Buscar la canción y el artista existentes antes de crear nuevos registros. Evitar duplicados y reutilizar IDs. No añadir metadatos extra a la ficha.
5. Editar **únicamente `docs/catalogo.json`**, conservando `schema_version: 1` y los campos actuales.
6. Ejecutar la validación automática y comprobar cantidad de canciones, enlaces, URLs y versiones antes de declarar publicada la actualización.
7. Subir el cambio a GitHub. GitHub Pages publica el archivo actualizado; el usuario puede tener que recargar su navegador.

Los nuevos IDs siguen `CAN-000000`, `INT-000000`, `CAT-000000` y `ENL-000000` (seis dígitos). Utilizar el siguiente identificador libre observado directamente en el JSON y comprobar unicidad. Cada enlace requiere `id`, `url`, `plataforma`, `tipo` y `oficial` booleano.

### Validación

Con Node.js 22 o superior, sin instalar paquetes:

```sh
node scripts/validar-catalogo.mjs
```

GitHub Actions también ejecuta la misma validación al modificar `docs/catalogo.json` en `main` o abrir una solicitud de cambios. Un chequeo fallido genera una alerta, pero GitHub Pages podría publicar igualmente un commit hecho directamente sobre `main`: **comprobar la validación antes de publicar**.

### Crecimiento futuro

Con miles de canciones, se puede dividir el catálogo en fragmentos y un índice de búsqueda sin cambiar la dirección de la web. Por ahora se mantiene un JSON único y el navegador presenta páginas de 50 canciones.

### Componentes históricos

`backend/` y `handoff/` conservan herramientas y capturas de etapas anteriores que dependían de Google Sheets. **Son material histórico, no el flujo activo, y no deben ejecutarse ni usarse para sobrescribir `docs/catalogo.json`.** El documento `TRASPASO.md` tiene notas de investigación y premisas adicionales; sus antiguas referencias a Sheets son obsoletas.

### Reportes de enlaces rotos

El sitio dispone de un botón de reporte con un toque. El servicio externo de entrega por email necesita confirmación/activación y verificación de recepción; **no suponer que los reportes funcionan hasta comprobarlo**. Cada aviso puede ser falso: verificar el destino antes de eliminar o cambiar el enlace. El límite del navegador no equivale a una restricción real por IP.

### Seguridad

El catálogo es público. `robots.txt` expresa preferencias de rastreo, pero no evita la extracción técnica. No publicar secretos, contraseñas ni tokens en este repositorio.


## Mapa ampliado de fuentes para búsquedas profundas — 22/10/2026

**Aplicar estas familias de fuentes como checklist de investigación, no como páginas generales que se publican directamente.** Buscar varias fuentes independientes y verificar el destino por canción, versión e intérprete. Documentar internamente las búsquedas fallidas para no repetirlas a ciegas.

**1. Identidad oficial antes de todo:** web auténtica de artista/grupo, sección de música/discografía, web del sello y editor, canales oficiales de YouTube/Topic (confirmando acreditación), perfiles enlazados desde canales auténticos, Apple Music, Spotify, Amazon Music, YouTube Music, Tidal y Deezer. Contrastar nombre del sello, derechos, grabación y fecha de la edición sin asumir que una página de plataforma sea automáticamente oficial.

**2. Reconstrucción de discografías y música antigua:** MusicBrainz (https://musicbrainz.org/), Discogs (https://www.discogs.com/), catálogos de sellos históricos, carátulas y contracarátulas de discos, reediciones digitales, Qobuz (https://www.qobuz.com/), bases de identificadores ISRC/UPC cuando estén disponibles y archivos de colecciones. Estas fuentes son referencias para descubrir álbumes, artistas y pistas, NO son suficientes por sí solas para acreditar autoría, autenticidad o URL de audio. En artistas pentecostales históricos prestar atención a cintas, LP, casetes, conciertos, campañas, himnarios, compilaciones y alias de intérpretes.

**3. Audio/Video específicos:** comprobar cada pista en Spotify, YouTube Music, YouTube, Apple Music, Amazon Music y otras plataformas pertinentes; recorrer listados oficiales de temas, videos por fecha, listas oficiales, grabaciones en vivo, colaboraciones y nuevas ediciones. Un enlace que lleva al álbum completo no se publica como pista individual; se permite enlace con minuto exacto solamente si se identifica claramente como segmento del álbum/concierto y está comprobado su inicio.

**4. Letra y Acordes:** plataformas primarias y licenciadas SongSelect/CCLI (https://songselect.ccli.com/), Worship Together en español (https://www.worshiptogether.com/es/buscador-de-canciones/), Secuencias (https://www.secuencias.com/), PraiseCharts (https://www.praisecharts.com/), Proclaim Music (https://music.proclaim.logos.com/), además de Cifra Club, LaCuerda, Letras.com, Música.com, Musixmatch, Cancioneros.com, Himnos y Canciones, AcordesWeb, TuCuatro, Notas y Acordes, AcordesCristianos, Textos Apostólicos, Himnos y Cánticos del Evangelio, Generación Pentecostal y Reawaken Hymns. Algunos servicios requieren registro/pago: no suponer acceso a contenido restringido. Solo enlazar, nunca copiar partituras o letras. Cuando una página individual incluye letra Y cifrado, puede usarse en ambas secciones, distinguiendo los tipos.

**5. Verificación cruzada de obras y versiones:** nombres alternativos, acentos y títulos traducidos, «en vivo» vs. estudio, arreglos, covers, distintos artistas con igual canción, sello, álbum de origen y autor/compositor como datos de investigación internos (NO añadirlos como columnas/campos a la ficha pública). Almacenar únicamente títulos/intérpretes/categorías y las cuatro secciones públicas existentes.

**6. Auditoría de cobertura:** comprobar artista por artista: catálogo de lanzamientos descubierto y revisado; cantidad de pistas únicas; número de fichas existentes y faltantes; cobertura verificada por Audio/Video/Letra/Acordes; URLs rotas o inconsistentes; enlaces nuevos agregados. Repetir barridos complementarios de forma iterativa cuando nuevos sitios o grabaciones aparezcan. No equiparar «no encontré» con «no existe».

**Objetivo explícito: máxima cantidad sostenible de canciones bien documentadas.** No detener las incorporaciones por una cuota arbitraria (5, 10, 20 temas), pero tampoco declarar completa una investigación a la que le faltan discos o fuentes. Las fichas existentes se enriquecen en paralelo con nuevas incorporaciones.

### Descubrimiento CONTINUO de fuentes nuevas (obligatorio)

**No trabajar en un circuito cerrado de plataformas habituales.** Cada investigación de artista debe dedicar una fase separada a *encontrar fuentes no usadas previamente* mediante búsquedas por nombre alternativo, sello, época, país, álbum, LP, casete, referencia de catálogo, colaboraciones y versiones. Rastrear referencias encadenadas: un disco lleva a un sello, el sello a un catálogo, el catálogo a nuevos grupos, y las contratapas a autores y otras ediciones. Contrastar de forma independiente los hallazgos. No limitar el descubrimiento a Google, Spotify, Apple Music o YouTube.

Para artistas cristianos antiguos, ampliar la exploración a hemerotecas religiosas, bibliotecas eclesiásticas y universitarias, catálogos de archivos de grabaciones, sellos regionales, archivos de radios cristianas, coleccionistas documentados, fotografías de LP/casetes, revistas históricas y catálogos de editoriales de himnarios. **Ejemplos recién localizados que todavía deben investigarse por artista, no asumirse como fuentes de canciones específicas:**
- Fundación Gladys Palmera, archivo de discos y documentos musicales latinoamericanos: https://fundaciongladyspalmera.org/coleccion/
- Discografías por sellos históricos de gospel: https://www.bsnpubs.com/christian/index.html
- Biblioteca Universidad Adventista del Plata, investigación de discos cristianos históricos en Argentina: https://biblioteca.uap.edu.ar/2017/04/dos-revoluciones-en-la-musica-del-cap/
- Discografía del sello Producciones Cristianas Asociadas en Qobuz: https://www.qobuz.com/us-en/label/producciones-cristianas-asociadas/download-streaming-albums/1928825/page/2
- Catálogo original del músico Alejandro Alonso, con detalle de un LP de 1982: https://alejandroalonso.com/tienda/musica/cantico-de-libertad/
- Christian Music Archive, discografías históricas (incluye intérpretes hispanos): https://www.christianmusicarchive.com/

**Rutina de investigación, no repetición:** 1) fuentes oficiales y discografía existente; 2) fuentes nuevas descubiertas por pistas surgidas de la primera fase; 3) seguimiento de esas fuentes hacia nuevos sellos, álbumes e intérpretes; 4) comprobación de enlaces por canción; 5) auditoría de cobertura y siguientes huecos. Conservar un registro interno de fuentes nuevas, qué aportaron y qué no aportaron, y alternar estrategias en vez de relanzar siempre las mismas búsquedas. Las fuentes de archivos y terceros sirven para descubrir y contrastar; **no prueban por sí solas que una grabación sea oficial**.


## Enlaces de interés y Más del artista

- `docs/catalogo.json` incluye un arreglo opcional `albumes_interes`, separado de los enlaces individuales de canciones. Cada entrada contiene `id` (ALB-000001), `interprete_id`, `titulo`, `formato` (solo `video` o `mp3`), `url` y `plataforma`.
- **Exclusivamente álbumes completos** del artista, en video o MP3, no entrevistas, biografías, discografías escritas ni listas genéricas. Las fuentes de terceros deben identificarse sin insignia de oficialidad, y descartarse si hay indicios de distribución no autorizada.
- Se reparten automáticamente **hasta tres álbumes por canción**, rotando de a tres sobre la lista del intérprete en el catálogo. Un álbum puede repetirse en otras canciones para que los usuarios descubran el material, pero no en una misma ficha.
- **Más del artista** recomienda tres canciones al azar del mismo intérprete, distintas de la actual, y abre su ficha interna sin abandonar Lugar Santísimo. En artistas con menos de cuatro canciones mostrará menos de tres.
- Las secciones aparecen solo cuando existen recursos o sugerencias. No reemplazan Audio, Video, Letra y Acordes.
