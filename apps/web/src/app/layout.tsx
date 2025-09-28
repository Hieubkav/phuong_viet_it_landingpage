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
  title: "PV-ERP | Hệ thống ERP toàn diện cho doanh nghiệp",
  description: "PV-ERP - Giải pháp quản lý doanh nghiệp toàn diện, tích hợp quản lý bán hàng, kho hàng, nhân sự và tài chính",
  metadataBase: new URL('https://pv-erp.com'),
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  other: {
    'color-scheme': 'light only',
    'theme-color': '#ffffff',
  },
  openGraph: {
    title: "PV-ERP | Hệ thống ERP toàn diện cho doanh nghiệp", 
    description: "PV-ERP - Giải pháp quản lý doanh nghiệp toàn diện, tích hợp quản lý bán hàng, kho hàng, nhân sự và tài chính",
    images: ['/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PV-ERP | Hệ thống ERP toàn diện cho doanh nghiệp",
    description: "PV-ERP - Giải pháp quản lý doanh nghiệp toàn diện, tích hợp quản lý bán hàng, kho hàng, nhân sự và tài chính", 
    images: ['/logo.png'],
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
