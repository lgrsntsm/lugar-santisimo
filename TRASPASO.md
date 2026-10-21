# Traspaso de Lugar Santísimo

Estado comprobado el 20 de octubre de 2026. Leer este archivo y `handoff/marcos-witt-pendientes.json` al continuar en otro chat. No contiene credenciales. Guardar este traspaso NO aprueba publicar las canciones pendientes.

## Objetivo

Crear un repositorio cristiano digital de canciones, con catálogo compacto, búsqueda, categorías y fichas que enlazan a plataformas externas. Google Sheets es la fuente editable manualmente; la web estática se publica en GitHub Pages. A futuro se desea sincronización automática con revisión y aprobación protegidas.

## Enlaces y ubicación

- Google Sheets: https://docs.google.com/spreadsheets/d/1sXncLci2gyc0VTvV8g8kuluwDeB05xRQEnx_XqJltBY/edit
- ID: `1sXncLci2gyc0VTvV8g8kuluwDeB05xRQEnx_XqJltBY`.
- GitHub: https://github.com/lgrsntsm/lugar-santisimo
- Web: https://lgrsntsm.github.io/lugar-santisimo/
- Última versión de la web antes de este traspaso: https://lgrsntsm.github.io/lugar-santisimo/?v=4b9f716
- Último commit de contenido web: `4b9f716d1d3de9340d6ebcb7d0ba8702c310f786` (conservar únicamente Renuévame). El commit de este traspaso será posterior y no cambia el catálogo público.
- Repositorio local: `C:/Users/usuario/.codex/.chatgpt-projects/g-p-6ad4bd3582588191b0d1590d7e373d4b/lugar-santisimo`.
- Proyecto local padre: `C:/Users/usuario/.codex/.chatgpt-projects/g-p-6ad4bd3582588191b0d1590d7e373d4b`. Su carpeta `sources/` es material sincronizado de solo lectura.
- Vista previa temporal: http://127.0.0.1:4173/ (solo esta computadora y mientras esté activo el servidor; no es alojamiento público ni un enlace transferible).

## Requisitos del usuario

- Diseño oscuro, compacto, parecido a una biblioteca de Spotify: una canción debajo de otra, encabezado mínimo, iconos redondos pequeños. Conservar el diseño actual.
- Marca: Lugar Santísimo. Frase: «El repositorio cristiano digital que estabas buscando.»
- Contacto arriba a la derecha: `lgrsntsm@gmail.com`, enlace `mailto:` que abre la aplicación de correo. No hay formulario ni servicio de envío.
- Sin favoritas por ahora. Botón «Leer», con libro, sin icono de reproducción ni contador de enlaces.
- Ficha con: 🧾 Título, 🎙️ Intérprete, 🎹 Audio, ⏯️ Video, 🔡 Letra.
- Hasta TRES audios y TRES videos por canción; son límites, no una obligación de rellenar opciones.
- Fuentes oficiales del intérprete primero. Priorizar versiones originales frente a acústicas, reediciones y colaboraciones nuevas; identificar las versiones y no afirmar «original» sin evidencia.
- Prioridad de plataformas de audio: YouTube, Spotify, YouTube Music; Apple Music al final si se incluye. No confundir prioridad de plataforma con evidencia de que una grabación sea la original.
- Letra contiene únicamente enlaces a páginas de letra escrita. Nunca videos, videolyrics, Spotify ni otros enlaces de audio. Un videolyric oficial puede estar en Video.
- Cuando no se confirmó una opción, mostrar «Sin información encontrada.» No inventar enlaces ni declarar que una fuente es oficial sin contrastarla.
- No almacenar, descargar ni alojar audio, video ni letras. Solo metadatos y URLs externas.
- Separar estado de revisión, publicación y aprobación. Obtener aprobación explícita del usuario antes de publicar contenido nuevo. No rellenar aprobaciones automáticamente ni interpretar este pedido de traspaso como aprobación del lote.
- No conectar nuevos servicios, automatizaciones o permisos sin autorización.
- El usuario habla español y prefiere explicaciones sencillas y acción autónoma dentro de lo autorizado.

## Estado actual comprobado

- Web pública: UNA canción, «Renuévame», Marcos Witt (`CAN-000006`).
- Los cinco registros iniciales de otros artistas permanecen en Sheets como `retirada`; no eliminarlos ni reactivarlos accidentalmente.
- Último pedido de contenido: incorporar las canciones más icónicas de Marcos Witt respetando las reglas anteriores.
- Se prepararon 31 canciones adicionales, IDs `CAN-000007` a `CAN-000037`. Con Renuévame suman una selección de 32, no una discografía exhaustiva.
- Nuevas canciones en Sheets: revisión `aprobada`, publicación `borrador`, aprobación del usuario `pendiente`. Campos de aprobador y evidencia de aprobación vacíos. La fórmula de exportación solo habilita Renuévame.
- Hay 94 enlaces nuevos: las 31 nuevas tienen audio oficial de Spotify y una página de letra escrita; algunas también audio oficial de YouTube y/o video del canal oficial. Se identifican álbumes y versiones. En 16 fichas nuevas no se confirmó un video adecuado; esto es una tarea pendiente, no una afirmación de que no exista.
- Jesús salva incluye a Un Corazón como invitado, contrastado en Spotify.
- La vista previa local de las 32 se revisó: búsqueda sin tildes, fichas Gracias/Tu fidelidad/Jesús salva, grupos de enlaces y aspecto móvil.
- Las comprobaciones de datos verificaron 31 borradores, 94 enlaces nuevos, límites de enlaces, letra de texto, Spotify en cada ficha nueva y que el exportador de producción sigue dejando solo Renuévame.
- No se modificó `docs/catalogo.json` para incorporar los borradores. La selección de 32 NO está publicada y NO tiene aprobación explícita.
- Última pregunta al usuario: «¿Publico esta selección?» Todavía no respondió afirmativamente; pidió este traspaso.

## Canciones preparadas

Tu fidelidad; Gracias; Temprano yo te buscaré; Yo te busco; Dios de pactos; Enciende una luz; Hermoso eres; Cuán bello es el Señor; Poderoso; Sobrenatural; Dios imparable; En los montes, en los valles; Somos el pueblo de Dios; Al estar aquí; Amante de ti Señor; Tu mirada; Mas el Dios de toda gracia; Quiero levantar mis manos; Levántate; Al que es digno; Un adorador; Sana nuestra tierra; Jesús salva; Mi pan, mi luz; Has cambiado mi lamento; Dios ha sido fiel; Tu amor por mí; Exáltate; Escucharte hablar; Dios ha sido bueno; Si puedes creer.

## Sheets: estructura y rangos usados

La planilla tiene hojas normalizadas y validaciones existentes. Leer los valores vigentes, encabezados y destinos antes de cualquier escritura; no pegar encima de fórmulas, validaciones ni cambios posteriores del usuario.

| Hoja | ID interno | Columnas / estado |
|---|---:|---|
| Canciones | 101 | A:M. 37 registros + encabezado, filas 2:38; nuevas filas 8:38. |
| Intérpretes | 102 | A:E. 6 registros + encabezado. Marcos Witt INT-000003; Un Corazón INT-000004. |
| Categorías | 103 | A:C. CAT-000001 Adoración, CAT-000002 Gratitud, CAT-000003 Fe, CAT-000004 Confianza. Clasificación editorial. |
| Canción-Categoría | 104 | A:C. Filas 1:38; relaciones nuevas CCA-000007:CCA-000037. |
| Canción-Intérprete | 105 | A:E. Filas 1:42; relaciones nuevas CIN-000010:CIN-000041. |
| Enlaces | 106 | A:J. Filas 1:110; enlaces nuevos ENL-000016:ENL-000109. |

También existen Guía, reportes de enlaces rotos, búsquedas, resúmenes, estadísticas y diccionario. Las hojas de seguimiento no implican que la web esté registrando eventos automáticamente.

Encabezados de las seis tablas: ver `backend/catalog.mjs`, exportación `SCHEMA`. No cambiar sus nombres. Los IDs son únicos e inmutables. Fechas en serial numérico de Google Sheets; 2026-10-20 corresponde a 46315. `Canciones!M2` contiene fórmula matricial de aptitud de exportación: NO sobrescribir la columna M ni su derrame. Las casillas sin registros pueden devolver `false`; filtrar filas por ID para preparar capturas.

## Arquitectura y archivos del repositorio

- `docs/`: sitio servido por Pages, rama `main`, fuente `/docs`. Nunca cambiar la fuente a la raíz del repositorio.
- `docs/index.html`, `library.css`: interfaz actual. Hay CSS antiguos (`styles.css`, `list.css`) que no son la hoja activa.
- `docs/app.mjs`: carga `catalogo.json` sin caché, búsqueda y modal.
- `docs/filter.mjs`: búsqueda, categorías y orden. Puede conservar código de favoritas sin que exista esa función en la interfaz.
- `docs/links.mjs`: agrupa fuentes, máximos 3+3, prioridad de plataformas y filtro de letra.
- `docs/catalogo.json`: catálogo aprobado que sirve el navegador. Hoy contiene Renuévame.
- `backend/catalog.mjs`: valida estructura, referencias, estados, HTTPS, tipos, aprobación y hash de versión exacta. Solo exporta metadatos públicos; excluye notas y evidencias.
- `backend/cli.mjs`: `preview` escribe una revisión privada; `build` genera `build/catalogo.json` si no hay versiones pendientes. No publica por sí solo.
- `backend/*test.mjs`: pruebas existentes de catálogo, filtros y enlaces.
- `backend/ejemplo-vacio.json`, `backend/package.json`: ejemplo y metadatos del backend. No hay dependencia de paquetes para ejecutar los módulos.
- `handoff/marcos-witt-pendientes.json`: copia recuperable de los 31 borradores, 94 enlaces y relaciones/maestros necesarios, sin notas internas ni aprobaciones. No es un archivo para copiar sobre `docs/catalogo.json`, ni una captura completa para el CLI. Reconciliar con Sheets vigente.
- `.gitignore`: excluye `private/`, `build/`, `.env*`, credenciales y paquetes.

La sincronización automática todavía NO está habilitada. El adaptador de Sheets es de solo lectura y necesita autorización de Google configurada por separado; no exponerla al navegador. Los cambios manuales en Sheets no llegan solos al sitio. No hay base de datos servida, API de escritura, carga de archivos, correo saliente ni captura web de búsquedas/reportes activa.

## Cómo continuar

1. Leer este traspaso y el JSON del lote; inspeccionar Sheets y el repositorio actuales. No duplicar los 31 registros existentes.
2. Si el usuario quiere completar fuentes, buscar videos oficiales faltantes y grabaciones originales; contrastar canción, intérprete, versión y plataforma. Añadir alternativas útiles sin superar los máximos. No almacenar letras completas durante la investigación.
3. Mostrar/reconstruir una vista previa revisable y pedir la aprobación explícita que sigue pendiente. Si el usuario cambia el lote, revisar la versión modificada.
4. Solo tras aprobación: actualizar en las canciones autorizadas los estados, aprobador, fecha y evidencia verdadera del chat. Mantener las cinco canciones retiradas fuera del catálogo.
5. Leer las seis tablas vigentes, generar captura privada y ejecutar el exportador. Obtener los hashes de la versión exacta y registrar solo los aprobados. Un hash detecta cambios pero no autentica por sí solo al usuario.
6. El manifiesto local existente que conserva la aprobación de Renuévame es `private/aprobaciones-original-spotify.json`. No se subió al repositorio: en otra computadora habrá que recuperar la autorización por el flujo de revisión, sin inventar evidencias ni autorizar automáticamente canciones.
7. Ejecutar comprobaciones apropiadas y revisar 32 canciones si se aprobó todo el lote; no asumir ese total si hubo cambios. Copiar solamente `build/catalogo.json` aprobado a `docs/catalogo.json`.
8. Confirmar el cambio y subirlo a GitHub. Verificar Pages, el commit servido, el catálogo real y la vista móvil; contemplar caché de HTML/recursos. Guardar captura de revisión si se opera la interfaz.
9. Más adelante, y solo si el usuario lo retoma: automatización con aprobación protegida, reportes de enlaces rotos y estadísticas/búsquedas. No están implementados como servicios de producción.

Pruebas locales desde el repositorio: `node --test backend/catalog.test.mjs backend/filter.test.mjs backend/links.test.mjs`. Compilación: `node backend/cli.mjs preview captura.json aprobaciones.json` y luego `node backend/cli.mjs build captura.json aprobaciones.json`. Los archivos de entrada completos y aprobaciones deben permanecer privados. Servir la web por HTTP, no abrir `index.html` como archivo.

## Dominio NIC.ar

El dominio consultado es `lugarsantisimo.com.ar`. El usuario intentó delegarlo, recibió «nombre del host inválido» y decidió dejarlo para después. No asumir delegación DNS terminada, dominio conectado ni HTTPS personalizado configurado. La URL operativa del proyecto sigue siendo GitHub Pages. Si se retoma, verificar primero el estado real del dominio y las instrucciones actuales del proveedor.

## Archivos que existen solo en esta computadora

Rutas relativas al repositorio, ignoradas por Git y NO recuperables haciendo un clone:

- `private/snapshot-witt-borrador.json`: captura completa local del lote en Sheets.
- `private/snapshot-antes-witt.json`, `snapshot-solo-renuevame.json`, `snapshot-original-spotify.json`, `snapshot-prioridades.json`, `snapshot-letra-texto.json`, `snapshot-renuevame.json`, `snapshot-prueba.json`: capturas anteriores.
- `private/aprobaciones-original-spotify.json`, `aprobaciones-prioridades.json`, `aprobaciones-letra-texto.json`, `aprobaciones-renuevame.json`, `aprobaciones-prueba.json`: manifiestos históricos de hashes de aprobación; no son credenciales, pero no se publicaron.
- `private/revision.json`, `revision-prueba.json`: revisiones locales.
- `private/spotify-concert.json`, `spotify-adoracion.json`, `spotify-top.json`: metadatos de investigación de Spotify.
- `private/preview-witt.mjs` y `private/preview-witt/`: constructor y copia local de la vista previa de 32 canciones. No modifican estados ni aprobaciones; el constructor depende de la captura local y del manifiesto de Renuévame.
- `private/github.mjs`: ayudante local de consultas de GitHub que usa la sesión autorizada del equipo. No copiar credenciales ni depender de que esa sesión exista en otro equipo.
- `build/catalogo.json`: salida local del exportador, regenerable.

En la carpeta padre del repositorio hay capturas locales, tampoco subidas: `marcos-witt-vista-previa.jpg`, `solo-renuevame.jpg`, `renuevame-spotify.jpg`, `renuevame-corregida.jpg`, `renuevame-marcos-witt.jpg`, `lugar-santisimo-biblioteca.jpg`, `lugar-santisimo-compacta.jpg`, `lugar-santisimo-ficha.jpg`, `lugar-santisimo-frase.jpg`, `lugar-santisimo-lista.jpg`, `lugar-santisimo-publicada.jpg`.

Referencias de diseño aportadas en el chat y ubicadas fuera del repo: `C:/Users/usuario/Downloads/WhatsApp Image 2026-10-18 at 18.54.08.jpeg` (biblioteca de Spotify) y `C:/Users/usuario/AppData/Local/Temp/codex-clipboard-b42c93ef-a12f-4ef1-ac81-bd9968039a9b.png` (pantalla NIC.ar). Son rutas históricas; no se comprobó que sigan existiendo.

Los borradores actuales también están guardados en Google Sheets y su copia de metadatos en `handoff/`: el trabajo pendiente ya no depende únicamente de estos archivos locales. No incluir tokens, contraseñas, sesiones ni datos del administrador de credenciales en un traspaso.


## Actualización del catálogo — 20 de octubre de 2026 (posterior al traspaso original)

**Este apartado reemplaza las cifras antiguas de este documento.** El usuario autorizó expresamente actualizar enlaces de todas las canciones existentes e incorporar discografía de Jesús Adrián Romero sin solicitar un nuevo OK. La web es ahora clara/crema, subtítulo «Repositorio Cristiano digital», listado aleatorio, tarjetas redondeadas, «Acordes» después de «Letra».

- Fuente editable: la misma hoja Google Sheets indicada arriba. Para todo cambio editorial, actualizar `Canciones`, `Intérpretes`, relaciones y `Enlaces` en Sheets, y después sincronizar `docs/catalogo.json` en GitHub.
- Estado después del commit `3627009a6646bfa1b6d5ed71bf6597e6e5f93e1b`: **70 canciones públicas, 211 enlaces activos**; 32 Marcos Witt, 14 Perfume de Alabanza y 24 Jesús Adrián Romero. Los registros de ensayo retirados no se exportan.
- Se agregaron 23 enlaces de acordes de Cifra Club para Marcos Witt; se incorporaron más páginas de letras y acordes para Perfume de Alabanza.
- Jesús Adrián Romero: intérprete `INT-000010`, Spotify `https://open.spotify.com/artist/29SeiO68HQHBs7pDdWOvvX`. Se cargaron los 12 temas de **El aire de tu casa** (2005, `CAN-000052` a `CAN-000063`), y los 12 de **A sus pies** (2002, `CAN-000064` a `CAN-000075`), con enlaces de acordes/letras y varios Spotify de canción individual.
- Último `enlace_id` agregado: `ENL-000220` (Spotify Buscando refugio). Próximos IDs `CAN-000076`, `CCA-000076`, `CIN-000080`, `ENL-000221`. Comprobar rangos y máximos contra Sheets antes de usar.
- Pendientes prioritarios: revisar las 46 canciones anteriores en **todas** las nuevas fuentes (Spotify, YouTube Music, YouTube, Música.com, Cifra Club, LaCuerda, Cancioneros, Musixmatch, Director Creativo, Banana Cifras), comprobar títulos/intérpretes y no inventar enlaces; 7 temas de Perfume de Alabanza aún sin letra verificada al último chequeo. En los 24 nuevos de Jesús Adrián Romero faltan varios audios individuales, aunque todos tienen al menos letra o acordes. Seguir otras etapas de su discografía por discos, evitando duplicados y versiones instrumentales involuntarias.
- La función «¿Enlace roto?» en la página **todavía es mailto**, no un reporte automatizado. El usuario pidió checkbox por canción, cinco reportes/IP/día y registrar en Sheets; para el límite por IP y la escritura hace falta backend/autorización de despliegue. No declarar implementado.
- Los audios de Spotify y YouTube Music van primero; otros servicios como Apple Music y Amazon aparecen después. Los videos de YouTube van en Video y páginas de letra escrita en Letra. Una página de acordes puede aparecer tanto en Letra como Acordes solo cuando contenga texto de ambas funciones.
- No alojar audio/video/letras/acordes localmente, solo URLs externas.


## Premisas obligatorias de catalogación — decisión del usuario, octubre de 2026

1. **Discografías completas:** cuando el usuario pide trabajar un intérprete, investigar su catálogo **completo**, no una selección de cinco temas exitosos. Avanzar por álbumes, sencillos, colaboraciones y versiones, contrastando catálogos, sin dar un lote parcial por terminado. Informar claramente qué cobertura está hecha y qué falta. No inventar pistas para llenar huecos.
2. **Todas las fuentes útiles por canción:** buscar individualmente Audio (Spotify, YouTube Music, Apple Music, Amazon Music), Video (YouTube), Letra y Acordes (Cifra Club, LaCuerda, Música.com, Musixmatch, Cancioneros, E-Chords, Chordify cuando aplique, sitios oficiales, etc.). Incorporar múltiples alternativas verificadas, sin limitar Letra/Acordes a un resultado, sin duplicados y distinguiendo versiones.
3. **Fuentes oficiales primero:** cada plataforma se investiga desde sitio, perfil, canal o distribuidor oficial comprobado. Priorizar grabaciones originales y etiquetar en vivo, covers y otras versiones. No deducir oficialidad solo por el dominio de Spotify/YouTube/Apple/Amazon ni por un canal Topic sin contrastar procedencia.
4. **Check verde de oficialidad:** en la web, enlaces con `oficial: true` reciben check circular verde y se ordenan primero en su sección. Este valor proviene de `Enlaces.es_oficial` de Sheets. Auditar los indicadores heredados gradualmente: no asumir que toda etiqueta histórica ha sido comprobada al mismo nivel. Los enlaces de terceros confiables siguen sin check.
5. **Sin agregar metadatos al sitio:** la ficha mantiene solo Audio, Video, Letra y Acordes. No añadir año, álbum, compositor ni nuevas columnas por iniciativa propia. Seguir alojando solo información y URL externas, nunca contenido musical.
6. **Consistencia de publicación:** Sheets es la fuente editable; GitHub `docs/catalogo.json` se actualiza después de aprobaciones. Reutilizar intérpretes y canciones existentes y validar concordancia de IDs/enlaces antes de declarar publicación completa.

Estas reglas reemplazan las antiguas menciones a publicar únicamente una selección icónica cuando el usuario ahora ha pedido discografías completas.


## Fuentes adicionales suministradas por el usuario (21/10/2026)

Estas 11 URLs se usarán para la investigación de links por canción, sin sumar metadatos ni alojar contenido ajeno:

- Himnos y Canciones: https://himnosycanciones.com/ — letras, himnos y acordes para diversos instrumentos.
- AcordesWeb: https://acordesweb.com/artista/musica-cristiana — canciones cristianas con acordes; comprobar intérprete individual.
- TuCuatro: https://tucuatro.com/es/cancion/genero/cristiana/ — letras y acordes para instrumentos.
- Notas y Acordes: https://notasyacordes.com/ — notas, acordes y PDF externos individuales.
- AcordesCristianos: https://www.acordescristianos.com/ — letras y acordes; comprobar páginas individuales.
- CanZion en YouTube: https://www.youtube.com/@CanZion1 — videos/audio; comprobar procedencia del canal y derechos de cada grabación.
- Textos Apostólicos: https://textosapostolicos.com/ — letras, acordes, himnos y coros.
- Himnos y Cánticos del Evangelio: https://www.himnosycanticosdelevangelio.org/himnos/ — himnario.
- Generación Pentecostal: https://www.generacionpentecostal.com/letras-de-canciones/ — letras (verificar URL antes de usar).
- Reawaken Hymns Español: https://www.reawakenhymns.com/espanol — himnos; página pendiente de revisión individual.
- Música.com cristiana: https://www.musica.com/letras.asp?letras=16677 — letras.

Criterio: abrir el enlace INDIVIDUAL por canción, validar artista, versión y destino, deduplicar por URL y tipo. Ninguna de estas fuentes recibe sello oficial automáticamente; el check verde requiere una fuente primaria demostrable (artista, sello, distribuidora autorizada). Mantener únicamente Audio, Video, Letra y Acordes. Nunca copiar letras, partituras, audio ni video al repositorio. Las fuentes son para búsqueda continua, no prueba de discografía completada.

- Cancioneros.com, sección Música Cristiana aportada por el usuario: https://www.cancioneros.com/letras/artista/49996/musica-cristiana — fuente candidata de letras para búsquedas por canción. La página no respondió a la comprobación web del 21/10/2026; verificar accesibilidad, autoría, canción e intérprete antes de publicar un enlace específico. No atribuir oficialidad ni check verde automáticamente.
