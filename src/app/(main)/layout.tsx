import TopBanner from "@/components/layout/TopBanner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
