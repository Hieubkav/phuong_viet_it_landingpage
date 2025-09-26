"use client";

import Section from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calculator,
  BookOpen,
  PenLine,
  Users,
  Wrench,
  Ticket,
  KeyRound,
  CreditCard,
  MessageSquare,
  FileText,
  Kanban,
  Clock,
  MapPin,
  CalendarRange,
  LifeBuoy,
  Globe,
  Share2,
  Mail,
  ShoppingCart,
  Boxes,
  Cog,
  ShoppingBag,
  User,
  LayoutDashboard,
} from "lucide-react";
import type { ReactNode, CSSProperties } from "react";

type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

type Mod = { id: string; name: string; icon: ReactNode };

const MODULES: Mod[] = [
  { id: "accounting", name: "Kế toán", icon: <Calculator /> },
  { id: "knowledge", name: "Kiến thức", icon: <BookOpen /> },
  { id: "sign", name: "Ký tên", icon: <PenLine /> },
  { id: "crm", name: "CRM", icon: <Users /> },
  { id: "studio", name: "Studio", icon: <Wrench /> },
  { id: "subscription", name: "Gói đăng ký", icon: <Ticket /> },

  { id: "rental", name: "Cho thuê", icon: <KeyRound /> },
  { id: "pos", name: "POS", icon: <CreditCard /> },
  { id: "discuss", name: "Thảo luận", icon: <MessageSquare /> },
  { id: "docs", name: "Tài liệu", icon: <FileText /> },
  { id: "project", name: "Dự án", icon: <Kanban /> },
  { id: "timesheet", name: "Bảng chấm công", icon: <Clock /> },

  { id: "field-service", name: "Dịch vụ hiện trường", icon: <MapPin /> },
  { id: "planning", name: "Kế hoạch", icon: <CalendarRange /> },
  { id: "helpdesk", name: "Hỗ trợ", icon: <LifeBuoy /> },
  { id: "website", name: "Trang web", icon: <Globe /> },
  { id: "social", name: "Marketing MXH", icon: <Share2 /> },
  { id: "email", name: "Marketing email", icon: <Mail /> },

  { id: "purchase", name: "Mua hàng", icon: <ShoppingCart /> },
  { id: "inventory", name: "Tồn kho", icon: <Boxes /> },
  { id: "mrp", name: "Sản xuất", icon: <Cog /> },
  { id: "sales", name: "Bán hàng", icon: <ShoppingBag /> },
  { id: "hr", name: "Nhân sự", icon: <User /> },
  { id: "dashboard", name: "Bảng điều khiển", icon: <LayoutDashboard /> },
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
  icon,
  accent,
}: {
  name: string;
  icon: ReactNode;
  accent: string;
}) {
  const styleVars: CSSVars = { "--acc": accent };
  return (
    <Card
      className="
        group relative overflow-hidden border border-[color-mix(in_oklab,var(--brand-green),white_10%)]
        bg-white shadow-[0_8px_28px_rgba(0,0,0,0.06)] transition
        hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.08)]
      "
    >
      <CardContent className="flex h-full flex-col items-center justify-center gap-3 p-4">
        <div
          style={styleVars}
          className="
            grid place-items-center rounded-2xl p-3 text-white
            bg-[linear-gradient(135deg,var(--acc)_0%,color-mix(in_oklab,var(--acc),white_40%)_100%)]
            shadow-[inset_0_1px_0_rgba(255,255,255,.35)]
          "
        >
          <div className="h-6 w-6 text-white">{icon}</div>
        </div>
        <div className="text-center text-sm font-medium leading-tight">
          {name}
        </div>

        <span
          className="absolute inset-x-0 bottom-0 h-[3px] w-full scale-x-0 bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))] transition-transform duration-300 group-hover:scale-x-100"
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
        <Badge className="brand-chip">Một nền tảng – Kết nối toàn diện</Badge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          <span className="marker-lime">PV-ERP</span> hợp nhất quy trình & dữ
          liệu
        </h2>
        <p className="mt-2 text-muted-foreground">
          PV-ERP hợp nhất toàn bộ quy trình và dữ liệu, tạo dòng chảy quản trị
          xuyên suốt – từ vận hành đến chiến lược.
        </p>
      </div>

      {/* Grid Apps */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {MODULES.map((m, i) => (
          <AppTile
            key={m.id}
            name={m.name}
            icon={m.icon}
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
