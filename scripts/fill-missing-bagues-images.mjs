/**
 * Completa la columna "Imagen 1" para filas de marca "Bagues" que quedaron
 * vacías, buscando la foto real en el catálogo público (Shopify) de
 * bagues.com.ar y subiéndola al bucket "productos".
 *
 * Uso: node --env-file=.env.local scripts/fill-missing-bagues-images.mjs
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
  console.error("Faltan env vars. Corré con: node --env-file=.env.local scripts/fill-missing-bagues-images.mjs");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

// fila (1-indexed en la hoja) -> URL de imagen en el catálogo de bagues.com.ar
const ROW_IMAGE_URL = {
  26: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBANGF50_1_6bd23fef-130d-4c03-817c-3e80bd14656e.png?v=1756850871",
  30: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/FotoProducto_0019_Barcelona_2025_frasco_frente_transparente_montaje_1.png?v=1765888969",
  36: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BLOIS.png?v=1777489520",
  50: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDUBAI50_1_77aa1615-8546-4849-8eca-97c18e963b4c.png?v=1756850964",
  51: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDUBAI50_1_77aa1615-8546-4849-8eca-97c18e963b4c.png?v=1756850964",
  54: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/FotoProducto_0012_Estambul_2025_frasco_frente_transparente_montaje_1.png?v=1765889271",
  55: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/FotoProducto_0013_Esparta_Victory_2025_frasco_frente_transparente_montaje_1.png?v=1765889227",
  67: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/FotoProducto_0011_Hawai_Fem_2025_frasco_frente_transparente_montaje_1.png?v=1765889547",
  69: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/FotoProducto_0009_Hollywood_2025_frasco_frente_transparente_montaje_3.png?v=1765889778",
  78: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/JEDDAH.png?v=1777489812",
  100: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Transparente_0006_Manhatan-men.png?v=1763050466",
  101: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Transparente_0007_Manhatan-fem.png?v=1763050358",
  103: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/FotoProducto_0007_Manhattan_Black_Red_2025_frasco_frente_montaje_1.png?v=1765889487",
  121: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Foto-Producto-08Ago2025-B_0004_Mykonos_Lor_2025_frasco_frente_transparente_montaje_1.png?v=1758636726",
  161: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Rosario_for_her.png?v=1782239746",
  162: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Rosario_for_him.png?v=1782239738",
  165: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BSAHAR50_1_8e631804-4860-4692-8d7d-1b8f6b505e45.png?v=1756851280",
  166: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BSAHAR50_1_8e631804-4860-4692-8d7d-1b8f6b505e45.png?v=1756851280",
  167: "https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BSAHAR50_1_8e631804-4860-4692-8d7d-1b8f6b505e45.png?v=1756851280",
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
    if (!sourceUrl) continue;
    const dataRow = rows[rowIdx - 1]; // rows[0] es el header, fila N está en rows[N-1]
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
