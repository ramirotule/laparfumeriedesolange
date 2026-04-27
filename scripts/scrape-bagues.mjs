/**
 * Extractor de productos de Bagues (API pública Shopify)
 * Genera: JSON con todos los datos + SQL para importar en Supabase + carpeta de imágenes
 *
 * Uso: node scripts/scrape-bagues.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { createWriteStream } from "fs";
import { get } from "https";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "../data/bagues");
const IMAGES_DIR = path.join(OUTPUT_DIR, "images");

// Asegurar que existen los directorios
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true });

const BASE_URL = "https://www.bagues.com.ar";
const COLLECTION_ARABES = "arabes-1";
const COLLECTION_FEMENINAS = "femeninas";
const COLLECTION_MASCULINAS = "masculinas";
const COLLECTION_UNISEX = "unisex-1";

// ─── Helpers ───────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function sanitizeHtml(html) {
  if (!html) return "";
  return html
    .replace(/<\/?(p|br|div)[^>]*>/gi, "\n")
    .replace(/<em>(.*?)<\/em>/gi, "$1")
    .replace(/<strong>(.*?)<\/strong>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function inferGenero(tags, title) {
  const text = [...tags, title].join(" ").toLowerCase();
  if (
    text.includes("femenin") ||
    text.includes("mujer") ||
    text.includes("women")
  )
    return "Árabe";
  if (
    text.includes("masculin") ||
    text.includes("hombre") ||
    text.includes("men")
  )
    return "Árabe";
  return "Árabe"; // todos son árabes en esta colección
}

function inferGeneroSexo(tags, title) {
  const text = [...tags, title].join(" ").toLowerCase();
  if (text.includes("femenin") || text.includes("mujer")) return "Femenino";
  if (text.includes("masculin") || text.includes("hombre")) return "Masculino";
  if (text.includes("unisex")) return "Unisex";
  return "Unisex";
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
  if (!str) return "NULL";
  return `'${str.replace(/'/g, "''")}'`;
}

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(url, (res) => {
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", reject);
  });
}

// ─── Fetch con paginación ──────────────────────────────────────────────────

async function fetchAllProducts() {
  const products = [];
  let page = 1;
  let hasMore = true;

  console.log(`🔍 Extrayendo productos de /${COLLECTION}...`);

  while (hasMore) {
    const url = `${BASE_URL}/collections/${COLLECTION}/products.json?limit=250&page=${page}`;
    console.log(`   Página ${page}: ${url}`);

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`   ❌ Error HTTP ${res.status}`);
      break;
    }

    const data = await res.json();
    const batch = data.products || [];

    if (batch.length === 0) {
      hasMore = false;
    } else {
      products.push(...batch);
      console.log(`   ✓ ${batch.length} productos (total: ${products.length})`);
      page++;
      await sleep(300); // respetar rate limit
    }
  }

  return products;
}

// ─── Procesar producto ─────────────────────────────────────────────────────

function processProduct(p) {
  const descripcionCompleta = sanitizeHtml(p.body_html);
  const lineas = descripcionCompleta.split("\n").filter(Boolean);

  // Primera línea suele ser "Type X by Bagues" → separar
  let typeRef = "";
  let descripcion = descripcionCompleta;
  if (lineas[0]?.toLowerCase().includes("type ")) {
    typeRef = lineas[0].trim();
    descripcion = lineas.slice(1).join("\n").trim();
  }

  const descripcionCorta =
    descripcion.length > 400
      ? descripcion.substring(0, 397) + "..."
      : descripcion;

  const variante = p.variants?.[0] || {};
  const precio = parseFloat(variante.price || "0");
  const precioAnterior = parseFloat(variante.compare_at_price || "0");
  const stock = variante.available ? 5 : 0; // estimado, no expone stock real
  const volumen = variante.title?.replace("ml", "").trim();

  const imagen = p.images?.[0]?.src || null;
  const imagenesAdicionales = p.images?.slice(1).map((i) => i.src) || [];

  const generoSexo = inferGeneroSexo(p.tags, p.title);
  const slug = slugify(`${p.title}-bagues`);

  const metaTitulo = `${p.title} Bagues en Santa Rosa La Pampa - La Parfumerie`;
  const metaDescripcion = `Comprá ${p.title} de Bagues en La Parfumerie, Santa Rosa La Pampa. ${descripcionCorta.substring(
    0,
    150,
  )}. Envío gratis en Santa Rosa.`;

  return {
    id_shopify: p.id.toString(),
    nombre: p.title,
    marca: "Bagues",
    slug,
    descripcion: descripcion || descripcionCompleta,
    descripcion_corta: descripcionCorta,
    type_ref: typeRef,
    precio_venta: precio,
    precio_costo: Math.round(precio * 0.6), // estimado 40% margen
    stock,
    imagen_url: imagen,
    imagenes_adicionales: imagenesAdicionales,
    genero: generoSexo, // se sobreescribe en main() si hay un default de colección
    genero_sexo: generoSexo,
    concentracion: "EDP",
    volumen_ml: (volumen && !isNaN(parseInt(volumen))) ? parseInt(volumen) : 50,
    tags: p.tags,
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
  const lines = [
    "-- ============================================================",
    "-- Importación de productos Bagues → La Parfumerie Supabase",
    `-- Generado: ${new Date().toISOString()}`,
    "-- ============================================================",
    "",
    "-- Primero aseguramos que exista familia 'Árabe / Oud'",
    "INSERT INTO familias_olfativas (nombre, descripcion)",
    "VALUES ('Árabe / Oud', 'Oud, ámbar, especias y resinas orientales. Larga duración.')",
    "ON CONFLICT (nombre) DO NOTHING;",
    "",
    "-- Obtener el ID de la familia árabe",
    "DO $$",
    "DECLARE familia_id INTEGER;",
    "BEGIN",
    "  SELECT id INTO familia_id FROM familias_olfativas WHERE nombre = 'Árabe / Oud';",
    "",
    "  INSERT INTO perfumes (",
    "    nombre, marca, descripcion, descripcion_corta, precio_venta, precio_costo,",
    "    stock, imagen_url, genero, concentracion, volumen_ml, familia_olfativa_id,",
    "    activo, destacado, nuevo, meta_titulo, meta_descripcion",
    "  ) VALUES",
  ];

  const rows = products.map((p, i) => {
    const imagenesArr =
      p.imagenes_adicionales.length > 0
        ? `ARRAY[${p.imagenes_adicionales.map((u) => escapeSql(u)).join(", ")}]`
        : "NULL";

    const isLast = i === products.length - 1;
    return (
      `    (${escapeSql(p.nombre)}, 'Bagues', ${escapeSql(p.descripcion)}, ` +
      `${escapeSql(p.descripcion_corta)}, ${p.precio_venta}, ${p.precio_costo}, ` +
      `${p.stock}, ${escapeSql(p.imagen_url)}, ` +
      `'Árabe', 'EDP', ${p.volumen_ml}, familia_id, ` +
      `TRUE, FALSE, FALSE, ${escapeSql(p.meta_titulo)}, ${escapeSql(p.meta_descripcion)})` +
      (isLast ? "" : ",")
    );
  });

  lines.push(...rows);
  lines.push("  ON CONFLICT (slug) DO UPDATE SET");
  lines.push("    descripcion = EXCLUDED.descripcion,");
  lines.push("    precio_venta = EXCLUDED.precio_venta,");
  lines.push("    imagen_url = EXCLUDED.imagen_url,");
  lines.push("    updated_at = NOW();");
  lines.push("END $$;");

  return lines.join("\n");
}

// ─── Fetch por colección específica ───────────────────────────────────────

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
    await sleep(300);
  }

  return products;
}

// ─── Generar SQL multi-colección ───────────────────────────────────────────

function generateSQLAll(products) {
  const lines = [
    "-- ============================================================",
    "-- Importación completa Bagues → La Parfumerie Supabase",
    `-- Generado: ${new Date().toISOString()}`,
    `-- Total productos: ${products.length}`,
    "-- ============================================================",
    "",
    "-- Insertar familias olfativas necesarias",
    "INSERT INTO familias_olfativas (nombre, descripcion) VALUES",
    "  ('Árabe / Oud', 'Oud, ámbar, especias y resinas orientales. Larga duración.'),",
    "  ('Floral', 'Rosas, jazmines y flores del jardín.'),",
    "  ('Oriental', 'Especias cálidas, ámbar y vainilla.'),",
    "  ('Fresco', 'Cítricos, acuático y aromático.'),",
    "  ('Gourmand', 'Vainilla, caramelo y tonka.')",
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
    return (
      `  (${escapeSql(p.nombre)}, 'Bagues', ${escapeSql(p.descripcion)}, ` +
      `${escapeSql(p.descripcion_corta)}, ${p.precio_venta}, ${p.precio_costo}, ` +
      `${p.stock}, ${escapeSql(p.imagen_url)}, ` +
      `${escapeSql(p.genero)}, 'EDP', ${(!p.volumen_ml || isNaN(p.volumen_ml)) ? 50 : p.volumen_ml}, ` +
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
  console.log("  La Parfumerie · Extractor Bagues — Completo");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const COLLECTIONS = [
    { slug: COLLECTION_ARABES,    generoDefault: "Árabe"    },
    { slug: COLLECTION_FEMENINAS, generoDefault: "Femenino" },
    { slug: COLLECTION_MASCULINAS,generoDefault: "Masculino"},
    { slug: COLLECTION_UNISEX,    generoDefault: "Unisex"   },
  ];

  const allRaw = [];
  const seenIds = new Set();

  for (const col of COLLECTIONS) {
    const raw = await fetchCollection(col.slug);
    let nuevos = 0;
    for (const p of raw) {
      if (!seenIds.has(p.id)) {
        seenIds.add(p.id);
        // Inyectar el género por defecto de la colección si no se detecta en tags
        p._coleccionGenero = col.generoDefault;
        allRaw.push(p);
        nuevos++;
      }
    }
    console.log(`   → ${nuevos} nuevos, ${raw.length - nuevos} duplicados omitidos`);
  }

  console.log(`\n✅ Total únicos: ${allRaw.length} productos\n`);

  // Procesar — con género default de la colección como fallback
  const products = allRaw.map((p) => {
    const processed = processProduct(p);
    // La colección árabe siempre marca como "Árabe"
    if (p._coleccionGenero === "Árabe") {
      processed.genero = "Árabe";
      processed.genero_sexo = "Árabe";
    } else if (processed.genero_sexo === "Unisex") {
      // Si no se detectó en tags, usar el default de la colección
      processed.genero_sexo = p._coleccionGenero;
      processed.genero = p._coleccionGenero;
    }
    return processed;
  });

  // Estadísticas por género
  const stats = products.reduce((acc, p) => {
    acc[p.genero] = (acc[p.genero] || 0) + 1;
    return acc;
  }, {});
  console.log("Distribución por género:", stats);

  // 1. JSON completo
  const jsonPath = path.join(OUTPUT_DIR, "bagues-todos.json");
  writeFileSync(jsonPath, JSON.stringify(products, null, 2));
  console.log(`📄 JSON: ${jsonPath}`);

  // 2. CSV
  const csvLines = [
    "nombre,marca,precio_venta,genero,volumen_ml,concentracion,imagen_url,descripcion_corta",
  ];
  for (const p of products) {
    csvLines.push([
      `"${p.nombre.replace(/"/g, '""')}"`,
      '"Bagues"',
      p.precio_venta,
      `"${p.genero}"`,
      p.volumen_ml,
      '"EDP"',
      `"${p.imagen_url || ""}"`,
      `"${(p.descripcion_corta || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ].join(","));
  }
  const csvPath = path.join(OUTPUT_DIR, "bagues-todos.csv");
  writeFileSync(csvPath, csvLines.join("\n"));
  console.log(`📊 CSV: ${csvPath}`);

  // 3. SQL unificado
  const sql = generateSQLAll(products);
  const sqlPath = path.join(OUTPUT_DIR, "import-bagues-todos.sql");
  writeFileSync(sqlPath, sql);
  console.log(`🗄️  SQL: ${sqlPath}`);

  // 4. Descargar imágenes (saltar las ya descargadas)
  console.log(`\n📸 Descargando imágenes (${products.length} productos)...`);
  let descargadas = 0;
  let saltadas = 0;
  let errores = 0;

  for (const p of products) {
    if (!p.imagen_url) continue;
    const ext = path.extname(p.imagen_url.split("?")[0]) || ".png";
    const filename = `${slugify(p.nombre)}${ext}`;
    const dest = path.join(IMAGES_DIR, filename);

    if (existsSync(dest)) { saltadas++; continue; }

    try {
      await downloadImage(p.imagen_url, dest);
      console.log(`   ✓ ${filename}`);
      descargadas++;
      await sleep(150);
    } catch (err) {
      console.error(`   ✗ ${p.nombre}: ${err.message}`);
      errores++;
    }
  }

  // 5. Resumen final
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESUMEN FINAL
  Colecciones procesadas : ${COLLECTIONS.length}
  Productos únicos       : ${products.length}
  Imágenes descargadas   : ${descargadas}
  Imágenes ya existentes : ${saltadas}
  Errores de imagen      : ${errores}

ARCHIVOS en data/bagues/
  bagues-todos.json          → datos completos
  bagues-todos.csv           → tabla para Excel/Sheets
  import-bagues-todos.sql    → SQL para Supabase
  images/                    → ${descargadas + saltadas} imágenes

PARA IMPORTAR EN SUPABASE
  1. Subí images/ al Supabase Storage (bucket: perfumes)
  2. Pegá import-bagues-todos.sql en SQL Editor y ejecutá
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

async function _legacyMain() {
  // kept for reference — single-collection run
  const rawProducts = await fetchCollection(COLLECTION_ARABES);
  console.log(`\n✅ ${rawProducts.length} productos encontrados\n`);
  const products = rawProducts.map(processProduct);

  const jsonPath = path.join(OUTPUT_DIR, "bagues-arabes.json");
  writeFileSync(jsonPath, JSON.stringify(products, null, 2));

  const csvLines = [
    "nombre,marca,precio_venta,genero,volumen_ml,concentracion,imagen_url,descripcion_corta",
  ];
  for (const p of products) {
    const csv = [
      `"${p.nombre.replace(/"/g, '""')}"`,
      `"Bagues"`,
      p.precio_venta,
      `"${p.genero_sexo}"`,
      p.volumen_ml,
      `"EDP"`,
      `"${p.imagen_url || ""}"`,
      `"${(p.descripcion_corta || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ].join(",");
    csvLines.push(csv);
  }
  writeFileSync(path.join(OUTPUT_DIR, "bagues-arabes.csv"), csvLines.join("\n"));
  writeFileSync(path.join(OUTPUT_DIR, "import-bagues.sql"), generateSQL(products));

  let descargadas = 0;
  let errores = 0;
  for (const p of products) {
    if (!p.imagen_url) continue;
    const ext = path.extname(p.imagen_url.split("?")[0]) || ".png";
    const dest = path.join(IMAGES_DIR, `${slugify(p.nombre)}${ext}`);
    if (existsSync(dest)) continue;
    try { await downloadImage(p.imagen_url, dest); descargadas++; await sleep(200); }
    catch (err) { errores++; }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESUMEN
  Productos extraídos : ${products.length}
  Imágenes descargadas: ${descargadas}
  Errores de imagen   : ${errores}

ARCHIVOS GENERADOS en data/bagues/
  📄 bagues-arabes.json   → datos completos
  📊 bagues-arabes.csv    → tabla simplificada
  🗄️  import-bagues.sql   → SQL para Supabase
  📸 images/              → imágenes descargadas

PRÓXIMO PASO
  Ejecutar en Supabase Dashboard → SQL Editor:
    data/bagues/import-bagues.sql
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

main().catch((err) => {
  console.error("Error fatal:", err);
  process.exit(1);
});
