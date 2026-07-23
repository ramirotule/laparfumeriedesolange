/**
 * Completa la columna "Imagen 1" para filas de marca "Unlock" que quedaron
 * vacías, buscando la foto real en el catálogo público (Shopify) de
 * unlock.com.ar y subiéndola al bucket "productos".
 *
 * Match hecho a mano (ver scripts/README de esta tanda): se respeta el
 * volumen_ml para no asociar una foto "MINI" a un frasco grande ni viceversa.
 *
 * Uso: node --env-file=.env.local scripts/fill-missing-unlock-images.mjs
 */

import { createClient } from "@supabase/supabase-js";
import XLSX from "xlsx";
import { createHash } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "../PERFUS_ROMI_PROCESADO_IMPORT_READY.xlsx");
const BUCKET = "productos";
const STORAGE_PREFIX = "import-perfus-romi";
const IMG1_COL = 15;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Faltan env vars. Corré con: node --env-file=.env.local scripts/fill-missing-unlock-images.mjs");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

// fila (1-indexed en la hoja) -> URL de imagen en el catálogo de unlock.com.ar
const ROW_IMAGE_URL = {
  29: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/ChatGPTImage7may2026_16_11_04.png?v=1778181080",
  43: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/ChatGPTImage7may2026_16_16_48.png?v=1778181417",
  44: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/Creed_8cb6bfef-7903-4868-ace0-3910b9cde143.png?v=1777903732",
  52: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/DSC09949_1_20026262-2913-45be-9ae4-8ff783cad880.jpg?v=1778179766",
  63: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/hallow_n_fem_90ml_-_3_b9aa6238-eaef-4366-9df9-ffc1ad5078d1.webp?v=1743507527",
  86: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/LeMale_14e8176b-1b3b-44b1-9602-b59f50db56ff.png?v=1778179707",
  87: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/LeMale.png?v=1777903751",
  89: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/ChatGPTImage7may2026_16_03_42.png?v=1778180633",
  91: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/la_vi___st_b_le_90ml_c5e2624b-5db2-4b4b-a053-fc2cd49f9e3c.webp?v=1743507512",
  93: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCKl_dissey.png?v=1763383830",
  94: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCKl_dissey.png?v=1763383830",
  99: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCKMoschino.png?v=1763383811",
  122: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/n_na_r_cc__n_na_90ml_-_2_d6164e98-5eb1-4efd-a45c-20afadfc679f.webp?v=1743507511",
  123: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/ChatGPTImage7may2026_16_01_29.png?v=1778180503",
  189: "https://cdn.shopify.com/s/files/1/0665/4456/6445/files/ChatGPTImage7may2026_15_56_07.png?v=1778180177",
};

function extFromUrl(url) {
  const m = url.split("?")[0].match(/\.([a-zA-Z0-9]+)$/);
  return m ? (m[1].toLowerCase() === "jpeg" ? "jpg" : m[1].toLowerCase()) : "jpg";
}

async function uploadImage(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const contentType = res.headers.get("content-type") || "";
  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = extFromUrl(url);
  const hash = createHash("md5").update(buffer).digest("hex").slice(0, 16);
  const objectPath = `${STORAGE_PREFIX}/${hash}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(objectPath, buffer, {
    contentType: contentType || `image/${ext}`,
    upsert: true,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
  return data.publicUrl;
}

async function main() {
  const wb = XLSX.readFile(FILE);
  const sheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

  const cache = new Map();
  let updated = 0;

  for (const [rowIdxStr, sourceUrl] of Object.entries(ROW_IMAGE_URL)) {
    const rowIdx = Number(rowIdxStr);
    const dataRow = rows[rowIdx - 1];
    if (!cache.has(sourceUrl)) {
      try {
        const publicUrl = await uploadImage(sourceUrl);
        cache.set(sourceUrl, publicUrl);
        console.log(`OK  fila ${rowIdx}: ${sourceUrl} -> ${publicUrl}`);
      } catch (err) {
        console.log(`FAIL fila ${rowIdx}: ${sourceUrl} -> ${err.message}`);
        cache.set(sourceUrl, null);
      }
    }
    const publicUrl = cache.get(sourceUrl);
    if (publicUrl) {
      dataRow[IMG1_COL] = publicUrl;
      updated++;
    }
  }

  const newSheet = XLSX.utils.aoa_to_sheet(rows);
  const newWb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(newWb, newSheet, sheetName);
  XLSX.writeFile(newWb, FILE);

  console.log(`\nFilas actualizadas: ${updated}`);
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
