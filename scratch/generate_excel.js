const XLSX = require('xlsx');
const path = require('path');

const productos = [
  { nombre: "Serum facial con Bakuchiol", marca: "Bioetape", precio_venta: 14048, categoria: "Cuidados de la Piel", descripcion: "Serum facial con Bakuchiol para firmeza y renovación celular.", activo: "SI" },
  { nombre: "Crema Facial con Bakuchiol", marca: "Bioetape", precio_venta: 14048, categoria: "Cuidados de la Piel", descripcion: "Crema facial reafirmante con activos naturales.", activo: "SI" },
  { nombre: "Serum Facial Patagonia", marca: "Patagonia", precio_venta: 14048, categoria: "Cuidados de la Piel", descripcion: "Serum con bioactivos de la Patagonia para una piel radiante.", activo: "SI" },
  { nombre: "Crema Facial con Hymagic e Hialubot", marca: "Bioetape", precio_venta: 14048, categoria: "Cuidados de la Piel", descripcion: "Hidratación profunda con tecnología de ácido hialurónico.", activo: "SI" },
  { nombre: "Crema de Manos Frutos Rojos", marca: "Bagués", precio_venta: 10742, categoria: "Cuidados de la Piel", descripcion: "Nutrición intensa para manos con aroma a frutos rojos.", activo: "SI" },
  { nombre: "Lápiz Secativo", marca: "Semplice", precio_venta: 7850, categoria: "Cuidados de la Piel", descripcion: "Tratamiento puntual para secar imperfecciones de forma rápida.", activo: "SI" },
  { nombre: "Gel Aséptico", marca: "Semplice", precio_venta: 8676, categoria: "Cuidados de la Piel", descripcion: "Gel de limpieza profunda con propiedades asépticas.", activo: "SI" },
  { nombre: "Loción Micelar", marca: "Semplice", precio_venta: 9916, categoria: "Cuidados de la Piel", descripcion: "Limpia, desmaquilla y tonifica en un solo paso.", activo: "SI" },
  { nombre: "Bruma facial con Agua de Rosas y Sandía", marca: "Semplice", precio_venta: 10742, categoria: "Cuidados de la Piel", descripcion: "Hidratación y frescura instantánea para cualquier momento del día.", activo: "SI" },
  { nombre: "Gel Exfoliante Facial", marca: "Semplice", precio_venta: 9090, categoria: "Cuidados de la Piel", descripcion: "Exfoliación suave para eliminar células muertas.", activo: "SI" },
  { nombre: "Crema Facial Revitalizante", marca: "Semplice", precio_venta: 8263, categoria: "Cuidados de la Piel", descripcion: "Crema de uso diario para una piel suave y vital.", activo: "SI" },
  { nombre: "Jabón Detox", marca: "Semplice", precio_venta: 8676, categoria: "Cuidados de la Piel", descripcion: "Limpieza purificante para eliminar toxinas.", activo: "SI" },
  { nombre: "Crema Facial de Noche", marca: "Patagonia", precio_venta: 15701, categoria: "Cuidados de la Piel", descripcion: "Tratamiento nocturno regenerador con activos naturales.", activo: "SI" },
  { nombre: "Crema Facial de Día", marca: "Patagonia", precio_venta: 15701, categoria: "Cuidados de la Piel", descripcion: "Protección e hidratación diaria para la piel del rostro.", activo: "SI" },
  { nombre: "Leche Desmaquillante", marca: "Patagonia", precio_venta: 16528, categoria: "Cuidados de la Piel", descripcion: "Limpieza cremosa y delicada para pieles sensibles.", activo: "SI" },
  { nombre: "Emulsión de Limpieza Facial", marca: "Patagonia", precio_venta: 16528, categoria: "Cuidados de la Piel", descripcion: "Limpia profundamente respetando el equilibrio de la piel.", activo: "SI" },
  { nombre: "Desmaquillante Bifásico", marca: "Patagonia", precio_venta: 16528, categoria: "Cuidados de la Piel", descripcion: "Remueve maquillaje de larga duración y waterproof.", activo: "SI" },
  { nombre: "Exfoliante Facial", marca: "Patagonia", precio_venta: 16528, categoria: "Cuidados de la Piel", descripcion: "Exfoliación profunda con ingredientes de la tierra.", activo: "SI" },
  { nombre: "Bruma Facial", marca: "Patagonia", precio_venta: 16528, categoria: "Cuidados de la Piel", descripcion: "Tónico refrescante y equilibrante natural.", activo: "SI" },
  { nombre: "Brillo de Luna Body Mist con Glitter", marca: "Bagués", precio_venta: 13883, categoria: "Cuidados de la Piel", descripcion: "Body mist refrescante con destellos de glitter.", activo: "SI" },
  { nombre: "Serum Facial con Golden Milk", marca: "Bioetape", precio_venta: 14048, categoria: "Cuidados de la Piel", descripcion: "Serum iluminador y antioxidante con cúrcuma.", activo: "SI" }
];

const ws = XLSX.utils.json_to_sheet(productos);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Productos");

const filePath = path.join(process.cwd(), 'productos_bagues_piel.xlsx');
XLSX.writeFile(wb, filePath);

console.log(`Excel generado con éxito en: ${filePath}`);
