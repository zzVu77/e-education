import AIChat from "@/components/AIChat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <AIChat />
      <main>{children}</main>
      <Footer />
    </>
  );
}
