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
