import TopBanner from "@/components/layout/TopBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import NewsletterModal from "@/components/layout/NewsletterModal";
import { CartProvider } from "@/context/CartContext";
import { CatalogoProvider } from "@/context/CatalogoContext";
import CatalogoModal from "@/components/catalogo/CatalogoModal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import QuickSearchModal from "@/components/ui/QuickSearchModal";
import { createClient } from "@/lib/supabase/server";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data: categorias } = await supabase
    .from("categorias")
    .select("id, nombre, slug, orden")
    .order("orden");

  const { data: subcategorias } = await supabase
    .from("subcategorias")
    .select("id, nombre, slug, orden, categoria_id")
    .eq("activo", true)
    .order("orden");

  const navCategorias = (categorias || []).map((cat) => ({
    ...cat,
    subcategorias: (subcategorias || []).filter((s) => s.categoria_id === cat.id),
  }));

  return (
    <CartProvider>
      <CatalogoProvider>
        <TopBanner />
        <Header navCategorias={navCategorias} />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <NewsletterModal />
        <WhatsAppButton />
        <CatalogoModal />
        <QuickSearchModal />
      </CatalogoProvider>
    </CartProvider>
  );
}
