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

**Regla expresa del usuario (22/10/2026): no realizar barridos superficiales ni publicar fichas incompletas solo para aumentar el número de canciones.** La utilidad y la fidelidad de la información prevalecen sobre la cantidad. Toda incorporación futura debe seguir este procedimiento:

1. **Identidad y fuentes primarias**: verificar la web auténtica del intérprete y sus canales, sellos y perfiles musicales oficiales. Documentar la procedencia y evitar atribuir falsamente covers, versiones o grabaciones de terceros.
2. **Discografía exhaustiva antes de declarar terminado al intérprete**: recopilar álbumes, EP, sencillos, discos históricos, colaboraciones, reediciones y repertorio que esté disponible; contrastar listas de pistas y evitar repetidos. Investigar profundamente cada pista en fuentes oficiales y enlazar sus distintas versiones identificadas.
3. **Barrido de las cuatro secciones por canción**: Audio (Spotify, YouTube Music, Apple Music, Amazon Music y otras), Video (videos oficiales y archivos auténticos), Letra y Acordes (fuentes primarias, después sitios especializados). Revisar **múltiples sitios por sección**, no detenerse al hallar el primer resultado. Nunca inventar enlaces ni copiar obras.
4. **Control de calidad previo a publicar**: validar título, intérprete, identidad de grabación, URL individual, disponibilidad, legitimidad del sello verde, duplicados y alcance de la búsqueda. **No publicar nuevas tandas que únicamente contienen una pista de audio por canción sin intentar completar el resto de las fuentes**. Una ausencia documentada tras una búsqueda real es distinta de no haber buscado.
5. **Tratar un artista como trabajo en profundidad**: reservar tiempo para cubrir su repertorio y no saltar enseguida a otros artistas; si hay hallazgos incompletos, conservarlos en notas de investigación, no presentarlos como fichas finalizadas en el catálogo público.
6. **No declarar «discografía completa»** hasta comprobar razonablemente la lista de obras y registrar qué grabaciones/enlaces siguen sin localizar; fuentes y fechas contradictorias se investigan y no se disimulan.
7. No añadir campos nuevos a la web: las fichas continúan únicamente con Audio, Video, Letra y Acordes, intérprete y etiquetas existentes.

**Auditoría de la situación heredada (22/10/2026, 202 canciones):** 102 canciones tienen un solo enlace; 103 cubren una sola sección; 114 no tienen letras; 115 no tienen acordes; 138 no tienen videos. Estas cifras son diagnóstico, **no prueba automática de que existan los recursos ausentes**. Las fichas heredadas pueden conservarse mientras se depuran, pero **no se deben usar como modelo de calidad para nuevas incorporaciones**. Priorizar completar y verificar el catálogo existente antes de seguir agregando artistas. No rellenar por cantidad, no poner sellos falsos, no cambiar URLs sin verificación.

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
