import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { compile, readGoogleSheets } from './catalog.mjs';

async function main() {
  const [mode, source, approvalsPath] = process.argv.slice(2);
  if (!['preview', 'build'].includes(mode) || !source) throw new Error('Uso: node cli.mjs preview|build snapshot.json|--sheets [aprobaciones.json]');
  const snapshot = source === '--sheets' ? await readGoogleSheets(process.env.GOOGLE_ACCESS_TOKEN) : JSON.parse(await readFile(source, 'utf8'));
  const approvals = approvalsPath ? JSON.parse(await readFile(approvalsPath, 'utf8')) : {};
  const result = compile(snapshot, approvals);
  // Rutas relativas a backend/, fuera de cualquier directorio público.
  const base = resolve(import.meta.dirname, '..');
  if (mode === 'preview') {
    await mkdir(resolve(base, 'private'), { recursive: true });
    await writeFile(resolve(base, 'private/revision.json'), JSON.stringify(result, null, 2) + '\n');
    console.log(`Vista privada preparada: ${result.catalog.canciones.length} aprobadas; ${result.pending.length} versiones pendientes.`);
  } else {
    if (result.pending.length) throw new Error(`${result.pending.length} versiones sin aprobar. Se conserva el catálogo anterior.`);
    const path = resolve(base, 'build/catalogo.json');
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path + '.tmp', JSON.stringify(result.catalog, null, 2) + '\n');
    await rename(path + '.tmp', path);
    console.log(`Catálogo local generado: ${result.catalog.canciones.length} canciones. No se publicó.`);
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
