# Lugar Santísimo · base de datos para la web

Backend de exportación y web estática. El directorio `docs/` contiene el
catálogo público con Renuévame, búsqueda, categorías y fichas de enlaces; sin favoritas.
Está preparado para GitHub Pages desde la rama `main`, carpeta `/docs`.
No hay credenciales en el repositorio ni conexión automática con Google activada.

Estado al 20 de octubre de 2026: hay 31 canciones adicionales de Marcos Witt
en borrador en Google Sheets, pendientes de aprobación explícita para publicar.
Ver [TRASPASO.md](TRASPASO.md) para continuar el proyecto y
[metadatos pendientes](handoff/marcos-witt-pendientes.json) para recuperar el lote.

Flujo previsto: Google Sheets privada → validación y revisión → catálogo JSON → web.
La web usa el JSON en GitHub Pages. Las credenciales de Google nunca
se envían al navegador. La planilla se sigue editando manualmente.

## Qué funciona

- Lee una captura JSON local de las seis tablas necesarias del catálogo.
- Incluye un adaptador de solo lectura para Sheets, sin ejecutar durante la preparación.
- Valida IDs únicos, relaciones, estados, URLs HTTPS, prioridades y campos requeridos.
- Separa borrador, revisión y aprobación explícita.
- Exige un hash aprobado para cada versión exacta de una canción publicada.
- Ordena enlaces activos: oficiales primero, luego prioridad e ID.
- Exporta solo campos públicos: no exporta notas, evidencias, búsquedas o reportes.
- Un error impide reemplazar el catálogo anterior.

## Uso local

Requiere Node.js 22 o posterior. No necesita instalar paquetes.

Desde `backend/`:

```sh
node --test
node cli.mjs preview ejemplo-vacio.json
node cli.mjs build ejemplo-vacio.json
```

La captura local es un objeto con nombres de hojas como claves y filas como
arrays; la primera fila contiene los encabezados reales. Ver el ejemplo vacío.
Se reconocen columnas por su nombre, aunque se reordenen. No cambiar los nombres.

## Aprobación de versiones

1. Completar revisión y autorización explícita en Sheets según la Guía.
2. Generar una vista privada con `preview`. La revisión devuelve IDs y hashes pendientes.
3. Revisar los datos exactos que se van a publicar y obtener aprobación del usuario.
4. Solo tras esa aprobación, registrar el hash de cada canción en un archivo privado:

```json
{ "CAN-000001": "hash exacto mostrado en la revisión" }
```

5. Ejecutar `node cli.mjs build captura.json ../private/aprobaciones.json`.

El hash incluye todo el contenido público de la canción (también nombres y enlaces
relacionados) y su evidencia de aprobación. Cambiar esos datos exige aprobar otra
versión. Nunca llenar aprobaciones automáticamente ni copiar hashes sin revisión.
Los hashes detectan cambios; no autentican la identidad del usuario. Antes de
automatizar habrá que proteger las aprobaciones con acceso restringido y una
revisión manual del despliegue. Los estados vacíos o inválidos provocan error.

## Conexión posterior a Google

El adaptador usa la API oficial `spreadsheets.values.batchGet`, con un token OAuth
en la variable de entorno `GOOGLE_ACCESS_TOKEN` y acceso de lectura a la planilla.
No incluir el token en archivos, código, argumentos o mensajes de chat.

```sh
node cli.mjs preview --sheets
```

Esta opción no se ejecutó. Los cinco registros iniciales se leyeron mediante el
conector de Sheets y se exportaron a partir de esa captura verificada. Antes de
activar sincronización sin intervención falta elegir y configurar la
autenticación en la cuenta del usuario. Un token de acceso temporal no renueva
sesiones: la automatización requerirá una configuración adicional de identidad.

## Actualización manual y publicación

La selección inicial se autorizó mediante el pedido explícito del usuario en el
chat del 18 de octubre de 2026 de publicar una prueba con cinco canciones.
Las evidencias y aprobaciones de versión quedan fuera del repositorio público.

Para futuras actualizaciones, obtener una captura vigente y repetir el flujo de
aprobación. Después de un `build` correcto, copiar únicamente `build/catalogo.json`
a `docs/catalogo.json`, revisar los cambios y subirlos al repositorio. La publicación
de Pages sirve solo la carpeta `docs/`; nunca configurar la raíz como fuente.
Los cambios manuales en Sheets no aparecen en la web hasta una nueva exportación.

Para previsualizar localmente, servir `docs/` con un servidor HTTP. No abrir el HTML
directamente mediante `file://`, porque el navegador bloquea la lectura del JSON.

## Pendiente

- Renovación de credenciales, ejecución automática y aprobación de despliegue.
- Si se desea enviar reportes o registrar búsquedas desde la web: un servicio de
  escritura autenticado con límites de uso. Este backend no expone endpoints de escritura.
- No hay rutas para subir audio, video ni letras.

Los resultados locales se guardan en `private/` y `build/`, excluidos de Git.
En `docs/` se copia únicamente el JSON aprobado junto con la web.
Retirar o revocar una canción la elimina en la próxima generación y despliegue;
no puede borrar copias ya descargadas.

Documentación: [API de Google Sheets](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/batchGet),
[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
