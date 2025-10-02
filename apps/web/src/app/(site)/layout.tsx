import SiteHeader from "@/components/layout/site-header";
import Footer from "@/components/layout/Footer";
import ContactWidget from "@/components/widgets/ContactWidget";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-white text-foreground">
      <SiteHeader />
      <main className="relative z-[1] bg-white">{children}</main>
      <Footer />
      <ContactWidget
        phoneNumber="0852949258"
        zaloUrl="https://zalo.me/0852949258"
        messengerUrl="https://www.facebook.com/phuong.viet.796368"
      />
    </div>
  );
}
