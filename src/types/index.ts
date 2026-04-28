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

export interface Perfume {
  id: string;
  nombre: string;
  marca: string;
  slug: string;
  descripcion: string;
  descripcion_corta?: string;
  precio_costo?: number;
  precio_venta: number;
  stock: number;
  imagen_url?: string;
  imagenes_adicionales?: string[];
  familia_olfativa_id?: number;
  familia_olfativa?: FamiliaOlfativa;
  genero: "Femenino" | "Masculino" | "Unisex" | "Árabe";
  concentracion?: string;
  volumen_ml?: number;
  activo: boolean;
  destacado: boolean;
  nuevo: boolean;
  meta_titulo?: string;
  meta_descripcion?: string;
  notas?: NotaAromatica[];
  created_at: string;
  updated_at: string;
}

export interface Vendedora {
  id: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  email?: string;
  activo: boolean;
  notas?: string;
  created_at: string;
  updated_at: string;
}

export interface FiltroPerfumes {
  genero?: string;
  familia?: number;
  notas?: number[];
  precioMin?: number;
  precioMax?: number;
  busqueda?: string;
  ordenar?: "precio_asc" | "precio_desc" | "nombre" | "nuevo";
}
