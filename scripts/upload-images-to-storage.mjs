/**
 * Descarga las imágenes referenciadas en las columnas "Imagen 1" e "Imagen 2"
 * de un Excel de importación de productos, las sube al bucket de Supabase
 * Storage "productos", y escribe un Excel de salida con esas dos columnas
 * reemplazadas por las URLs públicas del bucket.
 *
 * No inserta nada en la tabla `productos` — solo prepara las imágenes.
 *
 * Uso:
 *   node --env-file=.env.local scripts/upload-images-to-storage.mjs [archivo.xlsx]
 *
 * Requiere en .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import XLSX from "xlsx";
import { createHash } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const INPUT_FILE = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, "../PERFUS_ROMI_PROCESADO.xlsx");
const OUTPUT_FILE = INPUT_FILE.replace(/\.xlsx$/i, "_IMPORT_READY.xlsx");

const BUCKET = "productos";
const STORAGE_PREFIX = "import-perfus-romi";
const IMG1_COL = 15; // "Imagen 1" (0-indexed)
const IMG2_COL = 16; // "Imagen 2" (0-indexed)

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "Faltan env vars: NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Corré el script con: node --env-file=.env.local scripts/upload-images-to-storage.mjs"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

function extFromUrlOrContentType(url, contentType) {
  const fromUrl = url.split("?")[0].match(/\.([a-zA-Z0-9]+)$/);
  if (fromUrl && ["png", "jpg", "jpeg", "webp", "gif"].includes(fromUrl[1].toLowerCase())) {
    return fromUrl[1].toLowerCase() === "jpeg" ? "jpg" : fromUrl[1].toLowerCase();
  }
  if (contentType?.includes("png")) return "png";
  if (contentType?.includes("webp")) return "webp";
  if (contentType?.includes("gif")) return "gif";
  return "jpg";
}

function normalizeDriveUrl(url) {
  const m = url.match(/\/d\/([^/]+)\//);
  if (m) return `https://drive.google.com/uc?export=download&id=${m[1]}`;
  return url;
}

async function downloadImage(url) {
  const fetchUrl = normalizeDriveUrl(url);
  const res = await fetch(fetchUrl, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} descargando ${fetchUrl}`);
  const contentType = res.headers.get("content-type") || "";
  const buffer = Buffer.from(await res.arrayBuffer());
  return { buffer, contentType };
}

async function uploadToBucket(buffer, contentType, ext) {
  const hash = createHash("md5").update(buffer).digest("hex").slice(0, 16);
  const objectPath = `${STORAGE_PREFIX}/${hash}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(objectPath, buffer, {
      contentType: contentType || `image/${ext}`,
      upsert: true,
    });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
  return data.publicUrl;
}

async function processUrl(url, cache, stats) {
  if (!url) return "";
  if (cache.has(url)) {
    stats.reused++;
    return cache.get(url);
  }
  try {
    const { buffer, contentType } = await downloadImage(url);
    const ext = extFromUrlOrContentType(url, contentType);
    const publicUrl = await uploadToBucket(buffer, contentType, ext);
    cache.set(url, publicUrl);
    stats.uploaded++;
    return publicUrl;
  } catch (err) {
    stats.failed.push({ url, error: err.message });
    cache.set(url, "");
    return "";
  }
}

async function main() {
  console.log(`Leyendo ${INPUT_FILE}...`);
  const wb = XLSX.readFile(INPUT_FILE);
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

  const header = rows[0];
  if (header[IMG1_COL] !== "Imagen 1" || header[IMG2_COL] !== "Imagen 2") {
    console.error(
      `Columnas inesperadas en índices ${IMG1_COL}/${IMG2_COL}: ` +
        `"${header[IMG1_COL]}" / "${header[IMG2_COL]}"`
    );
    process.exit(1);
  }

  const cache = new Map();
  const stats = { uploaded: 0, reused: 0, failed: [] };

  const dataRows = rows.slice(1);
  const totalUrls = dataRows.reduce(
    (acc, r) => acc + (r[IMG1_COL] ? 1 : 0) + (r[IMG2_COL] ? 1 : 0),
    0
  );
  console.log(`${dataRows.length} filas, ${totalUrls} celdas de imagen a procesar (con dedupe por URL)...`);

  let processed = 0;
  for (const row of dataRows) {
    const img1 = row[IMG1_COL];
    const img2 = row[IMG2_COL];

    if (img1) {
      row[IMG1_COL] = await processUrl(String(img1).trim(), cache, stats);
      processed++;
    }
    if (img2) {
      row[IMG2_COL] = await processUrl(String(img2).trim(), cache, stats);
      processed++;
    }
    if (processed % 20 === 0) {
      console.log(`  ... ${processed}/${totalUrls} procesadas (subidas: ${stats.uploaded}, reusadas: ${stats.reused}, fallidas: ${stats.failed.length})`);
    }
  }

  const newSheet = XLSX.utils.aoa_to_sheet(rows);
  const newWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWb, newSheet, sheetName);
  XLSX.writeFile(newWb, OUTPUT_FILE);

  console.log("\n=== Resumen ===");
  console.log(`Imágenes únicas subidas al bucket "${BUCKET}": ${stats.uploaded}`);
  console.log(`Reusadas (misma URL de origen en más de una fila): ${stats.reused}`);
  console.log(`Fallidas: ${stats.failed.length}`);
  if (stats.failed.length) {
    console.log("\nFallos:");
    for (const f of stats.failed) console.log(`  - ${f.url} → ${f.error}`);
  }
  console.log(`\nArchivo de salida: ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
