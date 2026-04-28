/**
 * Extractor de productos Unlock (API pública Shopify)
 * Genera: JSON con todos los datos + CSV + SQL para importar en Supabase + imágenes
 *
 * Uso: node scripts/scrape-unlock.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { createWriteStream } from "fs";
import { get } from "https";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../data/unlock");
const IMAGES_DIR = path.join(OUTPUT_DIR, "images");

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true });

const BASE_URL = "https://unlock.com.ar";

// ─── Familias olfativas reconocidas en los tags de Unlock ─────────────────

const FAMILIA_MAP = {
  floral:     "Floral",
  oriental:   "Oriental",
  amaderado:  "Amaderado",
  woody:      "Amaderado",
  fresco:     "Fresco",
  fresh:      "Fresco",
  fougere:    "Fougère",
  fougère:    "Fougère",
  aromatica:  "Aromática",
  aromática:  "Aromática",
  aromatic:   "Aromática",
  chipre:     "Chipre",
  chypre:     "Chipre",
  citrico:    "Fresco",
  citrus:     "Fresco",
  gourmand:   "Gourmand",
  acuático:   "Fresco",
  acuatico:   "Fresco",
  aquatic:    "Fresco",
  especiado:  "Oriental",
  spicy:      "Oriental",
};

// ─── Helpers ───────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function sanitizeHtml(html) {
  if (!html) return "";
  return html
    .replace(/<\/?(p|br|div|h[1-6])[^>]*>/gi, "\n")
    .replace(/<em>(.*?)<\/em>/gi, "$1")
    .replace(/<strong>(.*?)<\/strong>/gi, "$1")
    .replace(/<li>(.*?)<\/li>/gi, "• $1\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Limpia el título: elimina asteriscos de formateo estilístico
 * "S*UV*GE" → "SUVGE", "MEM*OIRE" → "MEMOIRE"
 */
function cleanTitle(title) {
  return title.replace(/\*/g, "").trim();
}

function inferGenero(tags) {
  const text = tags.join(" ").toLowerCase();
  if (text.includes("femenina") || text.includes("mujer") || text.includes("women"))
    return "Femenino";
  if (text.includes("masculina") || text.includes("hombre") || text.includes("men"))
    return "Masculino";
  if (text.includes("unisex"))
    return "Unisex";
  return "Unisex";
}

function inferFamilia(tags) {
  for (const tag of tags) {
    const normalized = tag.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    for (const [key, value] of Object.entries(FAMILIA_MAP)) {
      if (normalized.includes(key)) return value;
    }
  }
  return null;
}

function parseVolumen(variantTitle) {
  if (!variantTitle) return 100;
  const match = variantTitle.match(/(\d+)\s*ml/i);
  if (match) return parseInt(match[1]);
  // Handle "25 ML", "80 ML", "100ml", "20 ML"
  const match2 = variantTitle.match(/^(\d+)/);
  if (match2) return parseInt(match2[1]);
  return 100;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  return `'${String(str).replace(/'/g, "''")}'`;
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        downloadImage(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (err) => {
      file.close();
      reject(err);
    });
  });
}

// ─── Fetch con paginación ──────────────────────────────────────────────────

async function fetchCollection(collection) {
  const products = [];
  let page = 1;

  console.log(`\n🔍 Colección: /${collection}`);

  while (true) {
    const url = `${BASE_URL}/collections/${collection}/products.json?limit=250&page=${page}`;
    const res = await fetch(url);
    if (!res.ok) { console.error(`   ❌ HTTP ${res.status}`); break; }

    const data = await res.json();
    const batch = data.products || [];
    if (batch.length === 0) break;

    products.push(...batch);
    console.log(`   Página ${page}: ${batch.length} productos (acum: ${products.length})`);
    page++;
    await sleep(400);
  }

  return products;
}

// ─── Procesar producto ─────────────────────────────────────────────────────

function processProduct(p, generoDefault = "Unisex") {
  const nombreLimpio = cleanTitle(p.title);
  const descripcion = sanitizeHtml(p.body_html);
  const descripcionCorta =
    descripcion.length > 400
      ? descripcion.substring(0, 397) + "..."
      : descripcion;

  // Variante principal (la de mayor volumen o la primera)
  const variante = p.variants?.[0] || {};
  const precio = parseFloat(variante.price || "0");
  const stock = variante.inventory_quantity > 0 ? variante.inventory_quantity : 5;

  // Volumen desde option1 de la variante
  const volumen_ml = parseVolumen(variante.option1 || variante.title || "");

  const imagen_url = p.images?.[0]?.src?.split("?")[0] || null;
  const imagenes_adicionales = p.images?.slice(1).map((i) => i.src.split("?")[0]) || [];

  const tags = Array.isArray(p.tags) ? p.tags : (p.tags || "").split(",").map((t) => t.trim()).filter(Boolean);
  const genero = inferGenero(tags) !== "Unisex" ? inferGenero(tags) : generoDefault;
  const familia = inferFamilia(tags);

  const slug = slugify(`${nombreLimpio}-unlock`);

  const metaTitulo = `${nombreLimpio} Unlock en Santa Rosa La Pampa - La Parfumerie`;
  const metaDescripcion = `Comprá ${nombreLimpio} de Unlock en La Parfumerie, Santa Rosa La Pampa. ${
    (descripcionCorta || "Fragancia exclusiva Unlock.").substring(0, 120)
  }. Envío gratis en Santa Rosa.`;

  return {
    id_shopify: p.id.toString(),
    nombre: nombreLimpio,
    nombre_original: p.title,
    marca: "Unlock",
    slug,
    descripcion,
    descripcion_corta: descripcionCorta,
    precio_venta: precio,
    precio_costo: Math.round(precio * 0.6),
    stock,
    imagen_url,
    imagenes_adicionales,
    genero,
    concentracion: "EDP",
    volumen_ml,
    familia_olfativa: familia,
    tags,
    activo: true,
    destacado: false,
    nuevo: false,
    meta_titulo: metaTitulo,
    meta_descripcion: metaDescripcion,
    handle_shopify: p.handle,
  };
}

// ─── Generar SQL ───────────────────────────────────────────────────────────

function generateSQL(products) {
  // Familias únicas detectadas
  const familiasUnicas = [...new Set(products.map((p) => p.familia_olfativa).filter(Boolean))];

  const lines = [
    "-- ============================================================",
    "-- Importación de productos Unlock → La Parfumerie Supabase",
    `-- Generado: ${new Date().toISOString()}`,
    `-- Total productos: ${products.length}`,
    "-- ============================================================",
    "",
    "-- Insertar familias olfativas detectadas",
    "INSERT INTO familias_olfativas (nombre, descripcion) VALUES",
    ...familiasUnicas.map((f, i) =>
      `  (${escapeSql(f)}, ${escapeSql(f + " — Familia olfativa Unlock")})${i < familiasUnicas.length - 1 ? "," : ""}`
    ),
    "ON CONFLICT (nombre) DO NOTHING;",
    "",
    "INSERT INTO perfumes (",
    "  nombre, marca, descripcion, descripcion_corta, precio_venta, precio_costo,",
    "  stock, imagen_url, genero, concentracion, volumen_ml,",
    "  activo, destacado, nuevo, meta_titulo, meta_descripcion",
    ") VALUES",
  ];

  const rows = products.map((p, i) => {
    const isLast = i === products.length - 1;
    const vol = (!p.volumen_ml || isNaN(p.volumen_ml)) ? 100 : p.volumen_ml;
    return (
      `  (${escapeSql(p.nombre)}, 'Unlock', ${escapeSql(p.descripcion)}, ` +
      `${escapeSql(p.descripcion_corta)}, ${p.precio_venta}, ${p.precio_costo}, ` +
      `${p.stock}, ${escapeSql(p.imagen_url)}, ` +
      `${escapeSql(p.genero)}, 'EDP', ${vol}, ` +
      `TRUE, FALSE, FALSE, ${escapeSql(p.meta_titulo)}, ${escapeSql(p.meta_descripcion)})` +
      (isLast ? "" : ",")
    );
  });

  lines.push(...rows);
  lines.push("ON CONFLICT (slug) DO UPDATE SET");
  lines.push("  descripcion = EXCLUDED.descripcion,");
  lines.push("  precio_venta = EXCLUDED.precio_venta,");
  lines.push("  imagen_url = EXCLUDED.imagen_url,");
  lines.push("  updated_at = NOW();");

  return lines.join("\n");
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  La Parfumerie · Extractor Unlock");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const COLLECTIONS = [
    { slug: "women", generoDefault: "Femenino" },
    { slug: "men",   generoDefault: "Masculino" },
    { slug: "all",   generoDefault: "Unisex" },  // captura cualquier producto no cubierto
  ];

  const allRaw = [];
  const seenIds = new Set();

  for (const col of COLLECTIONS) {
    const raw = await fetchCollection(col.slug);
    let nuevos = 0;
    for (const p of raw) {
      if (!seenIds.has(p.id)) {
        seenIds.add(p.id);
        p._coleccionGenero = col.generoDefault;
        allRaw.push(p);
        nuevos++;
      }
    }
    console.log(`   → ${nuevos} nuevos, ${raw.length - nuevos} duplicados omitidos`);
  }

  console.log(`\n✅ Total únicos: ${allRaw.length} productos\n`);

  const products = allRaw.map((p) => processProduct(p, p._coleccionGenero));

  // Estadísticas
  const statsGenero = products.reduce((acc, p) => {
    acc[p.genero] = (acc[p.genero] || 0) + 1;
    return acc;
  }, {});
  const statsFamilia = products.reduce((acc, p) => {
    const f = p.familia_olfativa || "Sin familia";
    acc[f] = (acc[f] || 0) + 1;
    return acc;
  }, {});

  console.log("Distribución por género:", statsGenero);
  console.log("Distribución por familia:", statsFamilia);

  // 1. JSON completo
  const jsonPath = path.join(OUTPUT_DIR, "unlock-todos.json");
  writeFileSync(jsonPath, JSON.stringify(products, null, 2));
  console.log(`\n📄 JSON: ${jsonPath}`);

  // 2. CSV
  const csvLines = [
    "nombre,marca,precio_venta,genero,volumen_ml,concentracion,familia_olfativa,imagen_url,descripcion_corta",
  ];
  for (const p of products) {
    csvLines.push([
      `"${p.nombre.replace(/"/g, '""')}"`,
      '"Unlock"',
      p.precio_venta,
      `"${p.genero}"`,
      p.volumen_ml,
      '"EDP"',
      `"${p.familia_olfativa || ""}"`,
      `"${p.imagen_url || ""}"`,
      `"${(p.descripcion_corta || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ].join(","));
  }
  const csvPath = path.join(OUTPUT_DIR, "unlock-todos.csv");
  writeFileSync(csvPath, csvLines.join("\n"));
  console.log(`📊 CSV: ${csvPath}`);

  // 3. SQL
  const sql = generateSQL(products);
  const sqlPath = path.join(OUTPUT_DIR, "import-unlock-todos.sql");
  writeFileSync(sqlPath, sql);
  console.log(`🗄️  SQL: ${sqlPath}`);

  // 4. Descargar imágenes
  console.log(`\n📸 Descargando imágenes (${products.length} productos)...`);
  let descargadas = 0;
  let saltadas = 0;
  let errores = 0;

  for (const p of products) {
    if (!p.imagen_url) continue;
    const ext = path.extname(p.imagen_url.split("?")[0]) || ".jpg";
    const filename = `${slugify(p.nombre)}${ext}`;
    const dest = path.join(IMAGES_DIR, filename);

    if (existsSync(dest)) { saltadas++; continue; }

    try {
      await downloadImage(p.imagen_url, dest);
      console.log(`   ✓ ${filename}`);
      descargadas++;
      await sleep(200);
    } catch (err) {
      console.error(`   ✗ ${p.nombre}: ${err.message}`);
      errores++;
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESUMEN FINAL
  Colecciones procesadas : ${COLLECTIONS.length}
  Productos únicos       : ${products.length}
  Imágenes descargadas   : ${descargadas}
  Imágenes ya existentes : ${saltadas}
  Errores de imagen      : ${errores}

ARCHIVOS en data/unlock/
  unlock-todos.json           → datos completos
  unlock-todos.csv            → tabla para Excel/Sheets
  import-unlock-todos.sql     → SQL para Supabase
  images/                     → ${descargadas + saltadas} imágenes

PARA IMPORTAR EN SUPABASE
  1. Subí images/ al Supabase Storage (bucket: perfumes)
  2. Actualizá imagen_url en el JSON/SQL para apuntar al bucket
  3. Pegá import-unlock-todos.sql en SQL Editor y ejecutá
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
