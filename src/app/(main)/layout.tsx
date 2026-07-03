import TopBanner from "@/components/layout/TopBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import NewsletterModal from "@/components/layout/NewsletterModal";
import { CartProvider } from "@/context/CartContext";
import { CatalogoProvider } from "@/context/CatalogoContext";
import CatalogoModal from "@/components/catalogo/CatalogoModal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CatalogoProvider>
        <TopBanner />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <NewsletterModal />
        <WhatsAppButton />
        <CatalogoModal />
      </CatalogoProvider>
    </CartProvider>
  );
}
