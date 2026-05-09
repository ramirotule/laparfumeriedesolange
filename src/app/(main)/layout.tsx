import TopBanner from "@/components/layout/TopBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import NewsletterModal from "@/components/layout/NewsletterModal";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <TopBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <NewsletterModal />
      <WhatsAppButton />
    </CartProvider>
  );
}
