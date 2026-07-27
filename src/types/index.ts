export interface FamiliaOlfativa {
  id: number;
  nombre: string;
  descripcion?: string;
  icono_url?: string;
}

export interface NotaAromatica {
  id: number;
  nombre: string;
  categoria: "salida" | "corazon" | "fondo";
  descripcion?: string;
}

export interface Linea {
  id: string;
  nombre: string;
}

export interface Producto {
  id: string;
  nombre: string;
  marca: string;
  slug: string;
  codigo_interno?: string | null;
  descripcion: string;
  descripcion_corta?: string;
  precio_venta: number;
  porcentaje_recargo_lista?: number;
  stock: number;
  imagen_url?: string;
  imagenes_adicionales?: string[];
  familia_olfativa_id?: number;
  familia_olfativa?: FamiliaOlfativa;
  categoria_id?: string;
  categoria?: string;
  categorias?: { nombre: string };
  subcategoria_id?: string;
  subcategorias?: { nombre: string };
  linea_id?: string | number | null;
  lineas?: { nombre: string };
  genero: "Femenino" | "Masculino" | "Unisex" | "Árabe";
  concentracion?: string;
  volumen_ml?: number;
  activo: boolean;
  destacado: boolean;
  nuevo: boolean;
  meta_titulo?: string;
  meta_descripcion?: string;
  notas?: NotaAromatica[];
  inspired_in?: string;
  created_at: string;
  updated_at: string;
}

export interface Vendedora {
  id: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ciudad?: string;
  provincia?: string;
  codigo_postal?: string;
  activo: boolean;
  notas?: string;
  fecha_nacimiento?: string;
  created_at: string;
  updated_at: string;
}

export interface FiltroProductos {
  genero?: string;
  familia?: number;
  notas?: number[];
  precioMin?: number;
  precioMax?: number;
  busqueda?: string;
  ordenar?: "precio_asc" | "precio_desc" | "nombre" | "nuevo";
}
