import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import "../pv-landing.css";
import Providers from "@/components/providers";

const siteUrl = "https://pv-erp.com";

const siteDescription =
  "Phần mềm ERP Cần Thơ của ERP Phương Việt trên nền Odoo giúp doanh nghiệp DBSCL quản trị bán hàng, kho, tài chính và nhân sự gọn nhẹ.";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ERP Phương Việt",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  description: siteDescription,
  areaServed: "Việt Nam",
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "PV-ERP (giải pháp ERP trên nền Odoo)",
  description: siteDescription,
  brand: { "@type": "Brand", name: "ERP Phương Việt" },
  image: [`${siteUrl}/logo.png`],
  url: siteUrl,
  offers: {
    "@type": "Offer",
    url: siteUrl,
    priceCurrency: "VND",
    price: "0",
    availability: "https://schema.org/PreOrder",
  },
  areaServed: "Vietnam",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Công ty TNHH Công Nghệ Thông Tin và Môi Trường Phương Việt",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/logo.png`,
  telephone: "0852949258",
  address: {
    "@type": "PostalAddress",
    streetAddress: "133/2A Trần Hưng Đạo",
    addressLocality: "Ninh Kiều",
    addressRegion: "Cần Thơ",
    postalCode: "900000",
    addressCountry: "VN",
  },
  areaServed: "Cần Thơ",
  openingHours: "Mo-Fr 08:00-17:30",
  sameAs: ["https://phuongvietit.vn"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "PV-ERP triển khai mất bao lâu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Thông thường 4-6 tuần cho giai đoạn chuẩn hóa quy trình, cấu hình và đào tạo key-user tại Cần Thơ.",
      },
    },
    {
      "@type": "Question",
      name: "PV-ERP có hỗ trợ tuỳ chỉnh riêng cho doanh nghiệp DBSCL không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Đội triển khai ERP Phương Việt tối ưu module Odoo theo đặc thù ngành, kết nối kho, bán hàng, tài chính và nhân sự.",
      },
    },
    {
      "@type": "Question",
      name: "Có phiên bản demo hay không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Liên hệ 0852949258 để được cung cấp demo dữ liệu mẫu hoặc dùng thử nhanh các quy trình chuẩn đã cấu hình sẵn.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Tài liệu", item: `${siteUrl}/docs` },
    { "@type": "ListItem", position: 3, name: "Todo demo", item: `${siteUrl}/todos` },
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERP Cần Thơ | ERP Phương Việt (Odoo) cho DBSCL",
  description: siteDescription,
  keywords: [
    "ERP Cần Thơ",
    "ERP DBSCL",
    "Phần mềm ERP Cần Thơ",
    "Phần mềm ERP Đồng bằng sông Cửu Long",
    "Quản trị doanh nghiệp Cần Thơ",
    "ERP Phương Việt",
    "Odoo Cần Thơ",
    "Odoo DBSCL",
    "Giải pháp ERP Odoo",
  ],
  metadataBase: new URL(siteUrl),
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
    title: "ERP Cần Thơ | ERP Phương Việt (Odoo) cho DBSCL",
    description:
      "Giải pháp ERP trên nền Odoo cho doanh nghiệp Cần Thơ và DBSCL: triển khai nhanh, tối ưu quản trị bán hàng, kho, tài chính, nhân sự.",
    images: [`${siteUrl}/logo.png`],
    url: siteUrl,
    type: "website",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ERP Cần Thơ | ERP Phương Việt (Odoo) cho DBSCL",
    description:
      "Odoo Cần Thơ - ERP Phương Việt giúp doanh nghiệp DBSCL quản trị thống nhất, triển khai nhanh và linh hoạt.",
    images: [`${siteUrl}/logo.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
