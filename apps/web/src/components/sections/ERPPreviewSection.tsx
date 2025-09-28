"use client";

import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import type { CSSProperties } from "react";

type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

type Mod = { id: string; name: string; iconSrc: string };

const MODULES: Mod[] = [
  {
    id: "accounting",
    name: "Kế toán",
    iconSrc: "https://download.odoocdn.com/icons/account_accountant/static/description/icon.svg",
  },
  { id: "knowledge", name: "Kiến thức", iconSrc: "https://download.odoocdn.com/icons/knowledge/static/description/icon.svg" },
  { id: "sign", name: "Ký tên", iconSrc: "https://download.odoocdn.com/icons/sign/static/description/icon.svg" },
  { id: "crm", name: "CRM", iconSrc: "https://download.odoocdn.com/icons/crm/static/description/icon.svg" },
  { id: "studio", name: "Studio", iconSrc: "https://download.odoocdn.com/icons/web_studio/static/description/icon.svg" },
  {
    id: "subscription",
    name: "Gói đăng ký",
    iconSrc: "https://download.odoocdn.com/icons/sale_subscription/static/description/icon.svg",
  },
  {
    id: "rental",
    name: "Cho thuê",
    iconSrc: "https://download.odoocdn.com/icons/fleet/static/description/icon.svg",
  },
  { id: "pos", name: "POS", iconSrc: "https://download.odoocdn.com/icons/point_of_sale/static/description/icon.svg" },
  { id: "discuss", name: "Thảo luận", iconSrc: "https://download.odoocdn.com/icons/mail/static/description/icon.svg" },
  { id: "docs", name: "Tài liệu", iconSrc: "https://download.odoocdn.com/icons/documents/static/description/icon.svg" },
  { id: "project", name: "Dự án", iconSrc: "https://download.odoocdn.com/icons/project/static/description/icon.svg" },
  {
    id: "timesheet",
    name: "Bảng chấm công",
    iconSrc: "https://download.odoocdn.com/icons/hr_timesheet/static/description/icon.svg",
  },
  {
    id: "field-service",
    name: "Dịch vụ hiện trường",
    iconSrc: "https://download.odoocdn.com/icons/industry_fsm/static/description/icon.svg",
  },
  { id: "planning", name: "Kế hoạch", iconSrc: "https://download.odoocdn.com/icons/planning/static/description/icon.svg" },
  { id: "helpdesk", name: "Hỗ trợ", iconSrc: "https://download.odoocdn.com/icons/helpdesk/static/description/icon.svg" },
  { id: "website", name: "Trang web", iconSrc: "https://download.odoocdn.com/icons/website/static/description/icon.svg" },
  {
    id: "social",
    name: "Marketing MXH",
    iconSrc: "https://download.odoocdn.com/icons/social/static/description/icon.svg",
  },
  {
    id: "email",
    name: "Marketing email",
    iconSrc: "https://download.odoocdn.com/icons/mass_mailing/static/description/icon.svg",
  },
  { id: "purchase", name: "Mua hàng", iconSrc: "https://download.odoocdn.com/icons/purchase/static/description/icon.svg" },
  { id: "inventory", name: "Tồn kho", iconSrc: "https://download.odoocdn.com/icons/stock/static/description/icon.svg" },
  { id: "mrp", name: "Sản xuất", iconSrc: "https://download.odoocdn.com/icons/mrp/static/description/icon.svg" },
  {
    id: "sales",
    name: "Bán hàng",
    iconSrc: "https://download.odoocdn.com/icons/sale_management/static/description/icon.svg",
  },
  { id: "hr", name: "Nhân sự", iconSrc: "https://download.odoocdn.com/icons/hr/static/description/icon.svg" },
  {
    id: "dashboard",
    name: "Bảng điều khiển",
    iconSrc: "https://download.odoocdn.com/icons/spreadsheet_dashboard/static/description/icon.svg",
  },
];

// bảng màu accent (xoay vòng)
const ACCENTS = [
  "#3b82f6",
  "#06b6d4",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#10b981",
  "#f97316",
  "#a855f7",
  "#22c55e",
  "#0ea5e9",
  "#eab308",
  "#14b8a6",
];

function AppTile({
  name,
  iconSrc,
  accent,
}: {
  name: string;
  iconSrc: string;
  accent: string;
}) {
  const styleVars: CSSVars = { "--acc": accent };
  return (
    <Card
      className="
        group relative min-h-[200px] overflow-hidden border border-[color-mix(in_oklab,var(--brand-green),white_12%)]
        bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition
        hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]
      "
    >
      <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6">
        <div
          style={styleVars}
          className="
            flex h-20 w-20 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,var(--acc)_0%,color-mix(in_oklab,var(--acc),white_45%)_100%)]
            shadow-[inset_0_1px_0_rgba(255,255,255,.35)]
          "
        >
          <img
            src={iconSrc}
            alt={name}
            className="h-16 w-16 object-contain"
            loading="lazy"
          />
        </div>
        <div className="text-center text-base font-semibold leading-tight text-foreground md:text-lg">
          {name}
        </div>

        <span
          className="absolute inset-x-0 bottom-0 h-1 w-full scale-x-0 bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))] transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden
        />
      </CardContent>
    </Card>
  );
}

export default function ERPPreviewSection() {
  return (
    <Section className="apps-surface py-14 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-[color-mix(in_oklab,var(--brand-lime),white_80%)] px-3 py-1 text-sm font-medium text-[var(--brand-green)]">
            Một nền tảng – Kết nối toàn diện
          </span>
        </div>
        
        {/* Title with highlighted text */}
        <h2 className="text-3xl font-bold tracking-tight text-[#123524]">
          <span className="marker-lime">PV-ERP</span> quy trình liền mạch,{" "}
          <span className="whitespace-nowrap">dữ liệu thống nhất</span>
        </h2>
        
        <p className="mt-4 text-lg text-gray-600">
          PV-ERP hợp nhất toàn bộ quy trình và dữ liệu, tạo dòng chảy quản trị
          xuyên suốt – từ vận hành đến chiến lược
        </p>
      </div>

      {/* Grid Apps */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {MODULES.map((m, i) => (
          <AppTile
            key={m.id}
            name={m.name}
            iconSrc={m.iconSrc}
            accent={ACCENTS[i % ACCENTS.length]}
          />
        ))}
      </div>

      {/* CTA gọn */}
      <div className="mt-8 flex justify-center">
        <a
          href="https://www.odoo.com/vi_VN/page/all-apps"
          target="_blank"
          rel="noopener noreferrer"
          className="
      inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium
      shadow-sm transition hover:border-[color-mix(in_oklab,var(--brand-green),white_40%)] hover:text-[var(--brand-green)]
    "
        >
          Xem tất cả module
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </Section>
  );
}
