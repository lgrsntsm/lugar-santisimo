# Lugar Santísimo · base de datos para la web

Base local del backend de exportación. No hay despliegue, web pública, credenciales,
cuentas nuevas ni conexión automática activada.

Flujo previsto: Google Sheets privada → validación y revisión → catálogo JSON → web.
La web futura podrá usar el JSON en GitHub Pages. Las credenciales de Google nunca
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

Esta opción no se ejecutó. Antes de activarla falta elegir y configurar la
autenticación en la cuenta del usuario. Un token de acceso temporal no renueva
sesiones: la automatización requerirá una configuración adicional de identidad.

## Pendiente para la web

- Repositorio de GitHub y autenticación para sincronizar.
- Renovación de credenciales, ejecución automática y aprobación de despliegue.
- Interfaz de búsqueda y filtros que lea `catalogo.json`.
- Si se desea enviar reportes o registrar búsquedas desde la web: un servicio de
  escritura autenticado con límites de uso. Este backend no expone endpoints de escritura.
- No hay rutas para subir audio, video ni letras.

Los resultados locales se guardan en `private/` y `build/`, excluidos de Git.
Para publicar en el futuro se copiará únicamente el JSON aprobado junto con la web.
Retirar o revocar una canción la elimina en la próxima generación y despliegue;
no puede borrar copias ya descargadas.

Documentación: [API de Google Sheets](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/batchGet),
[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
