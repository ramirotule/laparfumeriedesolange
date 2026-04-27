Objetivo: Desarrollar un E-commerce de perfumes de lujo utilizando Next.js (App Router), Tailwind CSS, Supabase y Umami Analytics, con un enfoque radical en el rendimiento y SEO.

1. Estética y Diseño (Look & Feel)
   Paleta de Colores: Negro profundo (#000000), Dorado metálico (#D4AF37) y Blanco puro (#FFFFFF). El diseño debe evocar exclusividad y sofisticación.

Banner Superior: "ENVIO GRATIS DENTRO DE SANTA ROSA - LA PAMPA" (Fijo en el header).

Footer: Debe incluir la dirección física Ayala 604, Santa Rosa, La Pampa y enlace directo a Instagram: @laparfumerie.desolange.

2. Arquitectura de Datos y Agentes (Supabase)
   Generar scripts SQL para las tablas de Supabase contemplando:

Tabla perfumes: ID, nombre, marca, descripción (SEO friendly), precio_costo, precio_venta, stock, imagen_url, familia_olfativa, género (Femenino, Masculino, Unisex, Árabe).

Tabla notas_aromaticas: Relación muchos a muchos con perfumes para filtrar por notas de salida, corazón y fondo.

Estrategia de Agentes: Configurar Database Webhooks o Edge Functions para automatizar la actualización de metadatos cuando se cargue un nuevo perfume (ej. generar slugs automáticos).

3. Ingeniería de SEO "Exquisito" (Rankeo Top 1)
   Implementar las siguientes técnicas para dominar los buscadores:

Server-Side Rendering (SSR): Todas las páginas de producto deben renderizarse en el servidor para indexación inmediata.

Metadata Dinámica: Generar Títulos y Meta-descripciones únicas por perfume (ej: "Perfume [Nombre] en Santa Rosa - Notas de [Nota] - Envío Gratis").

JSON-LD Structured Data: Implementar esquemas de Product, Offer y LocalBusiness (para la ubicación en Ayala 604) para obtener fragmentos enriquecidos en Google.

Optimización de Imágenes: Uso del componente next/image con formato WebP y etiquetas alt descriptivas incluyendo palabras clave de la pirámide olfativa.

4. Navegación y Experiencia de Usuario (Inspiración Fragrantica)
   Mega Menú de Fragancias: Buscador avanzado por notas, acordes, mapa de perfumes y familias olfativas.

Sección Árabes: Landing page específica con el catálogo de Bagues, optimizada con keywords de "Perfumería Árabe en Argentina".

Buscador Inteligente: Implementar búsqueda semántica o por facetas.

5. Dashboard Administrativo & Estadísticas
   Panel Privado (/dashboard): Acceso restringido vía Supabase Auth. Gestión total de inventario, visualización de márgenes de ganancia (costo vs venta) y control de stock.

Analítica con Umami: Integrar el script de Umami Analytics para rastrear eventos personalizados (clics en "comprar", perfumes más buscados, origen del tráfico) sin comprometer la privacidad del usuario ni la velocidad de carga (Zero-cookie analytics).

6. Información de Negocio
   Ubicación: Ayala 604, Santa Rosa, La Pampa, Argentina.

Social Media: Instagram: https://www.instagram.com/laparfumerie.desolange/
Whatsapp: 2954808202
