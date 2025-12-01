import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import "../pv-landing.css";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERP Cần Thơ | ERP Phương Việt (Odoo) cho ĐBSCL",
  description:
    "Phần mềm ERP Cần Thơ và ERP ĐBSCL của ERP Phương Việt trên nền Odoo giúp quản trị doanh nghiệp Cần Thơ tối ưu bán hàng, kho, tài chính, nhân sự.",
  keywords: [
    "ERP Cần Thơ",
    "ERP ĐBSCL",
    "Phần mềm ERP Cần Thơ",
    "Phần mềm ERP ĐBSCL",
    "Phần mềm quản trị Cần Thơ",
    "Quản trị doanh nghiệp Cần Thơ",
    "ERP Phương Việt",
    "Odoo Cần Thơ",
    "Odoo ĐBSCL",
    "Giải pháp ERP Cần Thơ",
  ],
  metadataBase: new URL("https://pv-erp.com"),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  other: {
    "color-scheme": "light only",
    "theme-color": "#ffffff",
  },
  openGraph: {
    title: "ERP Cần Thơ | ERP Phương Việt (Odoo) cho ĐBSCL",
    description:
      "Giải pháp ERP Cần Thơ dựa trên Odoo, tối ưu quản trị doanh nghiệp ĐBSCL: bán hàng, kho, tài chính, nhân sự, sản xuất.",
    images: ["/logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ERP Cần Thơ | ERP Phương Việt (Odoo) cho ĐBSCL",
    description:
      "Odoo Cần Thơ - ERP Phương Việt giúp doanh nghiệp ĐBSCL quản trị thống nhất, triển khai nhanh, hỗ trợ tại chỗ.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
