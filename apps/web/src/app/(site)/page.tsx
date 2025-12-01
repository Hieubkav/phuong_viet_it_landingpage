import type { Metadata } from "next";
import LandingPageClient from "./landing-page.client";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pv-erp.com").replace(/\/$/, "");
const siteTitle = "PV-ERP | Giải pháp ERP Odoo tại Cần Thơ & DBSCL";
const siteDescription =
  "Giải pháp ERP trên nền Odoo, được triển khai bởi ERP Phương Việt cho doanh nghiệp Cần Thơ và Đồng bằng sông Cửu Long: hợp nhất dữ liệu, tối ưu vận hành, minh bạch tài chính.";
const ogImage = `${siteUrl}/logo.png`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "ERP Cần Thơ",
    "ERP DBSCL",
    "Odoo Cần Thơ",
    "ERP Phương Việt",
    "Giải pháp ERP Odoo",
    "Phần mềm quản trị doanh nghiệp",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "PV-ERP Odoo cho doanh nghiệp Cần Thơ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

export default function Page() {
  return <LandingPageClient />;
}
