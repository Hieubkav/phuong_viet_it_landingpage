"use client";

import Section from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Factory, Briefcase, CheckCircle2 } from "lucide-react";
import { useState, type ReactNode } from "react";

type Industry = {
  key: "commerce" | "manufacturing" | "services";
  icon: ReactNode;
  title: string;
  blurb: string;
  points: string[];
  media: ReactNode;
};

function BarsCommerce() {
  return (
    <svg className="chart-bars h-28 w-full" viewBox="0 0 360 100" aria-hidden>
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={18 + i * 48} y={18} width="26" height="72" rx="4" />
      ))}
    </svg>
  );
}

function GearsManufacturing() {
  // 2 bánh răng ăn khớp, quay ngược chiều nhau (SMIL animateTransform)
  return (
    <svg viewBox="0 0 240 120" className="h-28 w-full" aria-hidden>
      {/* thanh nối tượng trưng */}
      <rect
        x="96"
        y="57"
        width="48"
        height="6"
        rx="3"
        fill="currentColor"
        opacity=".08"
      />

      {/* Bánh răng lớn (trái) */}
      <g transform="translate(80 60)">
        {/* viền nhẹ */}
        <circle
          r="28"
          fill="none"
          stroke="currentColor"
          strokeOpacity=".12"
          strokeWidth="10"
        />
        {/* răng cưa */}
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x={-3}
              y={-38}
              width={6}
              height={14}
              rx={1.5}
              transform={`rotate(${i * 30})`}
              fill="currentColor"
              opacity=".9"
            />
          ))}
          {/* quay thuận */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="10s"
            repeatCount="indefinite"
          />
        </g>
        {/* lõi */}
        <circle r="8" fill="currentColor" opacity=".9" />
      </g>

      {/* Bánh răng nhỏ (phải) */}
      <g transform="translate(155 60)">
        <circle
          r="22"
          fill="none"
          stroke="currentColor"
          strokeOpacity=".12"
          strokeWidth="8"
        />
        <g>
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x={-2.5}
              y={-30}
              width={5}
              height={12}
              rx={1.25}
              transform={`rotate(${i * 36})`}
              fill="currentColor"
              opacity=".9"
            />
          ))}
          {/* quay ngược */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="-360 0 0"
            dur="7.5s"
            repeatCount="indefinite"
          />
        </g>
        <circle r="6" fill="currentColor" opacity=".9" />
      </g>
    </svg>
  );
}


function LineServicesSmooth() {
  // Đường cong duy nhất; animate stroke-dasharray để vẽ từ trái sang phải mượt
  const LEN = 640; // độ dài ước lượng, đủ lớn để hiệu ứng mượt
  return (
    <svg
      className="h-28 w-full"
      viewBox="0 0 360 100"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M8 72 C 58 28, 106 58, 148 40 S 248 70, 296 46 S 352 38, 352 38"
        fill="none"
        stroke="var(--brand-green)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-dasharray"
          from={`0, ${LEN}`}
          to={`${LEN}, 0`}
          dur="3s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}


const INDUSTRIES: Industry[] = [
  {
    key: "commerce",
    icon: <ShoppingBag className="h-5 w-5 text-[var(--brand-green)]" />,
    title: "Thương mại",
    blurb: "Chuỗi cung ứng mượt mà, kho hàng chính xác, bán hàng minh bạch.",
    points: [
      "Tối ưu cung ứng & logistics",
      "Quản lý kho – tồn – định mức",
      "Phân tích bán hàng theo thời gian thực",
    ],
    media: <BarsCommerce />,
  },
  {
    key: "manufacturing",
    icon: <Factory className="h-5 w-5 text-[var(--brand-green)]" />,
    title: "Sản xuất",
    blurb: "Lập kế hoạch thông minh, QC chặt chẽ, theo dõi OEE realtime.",
    points: [
      "Kế hoạch MPS/MRP thông minh",
      "Kiểm soát chất lượng đa công đoạn",
      "Giám sát hiệu suất dây chuyền",
    ],
    media: <GearsManufacturing />,
  },
  {
    key: "services",
    icon: <Briefcase className="h-5 w-5 text-[var(--brand-green)]" />,
    title: "Dịch vụ",
    blurb: "CRM, dự án & hỗ trợ khách hàng hợp nhất – vận hành tự động.",
    points: [
      "CRM đa kênh & pipeline",
      "Quản lý dự án linh hoạt",
      "Tự động hóa quy trình nội bộ",
    ],
    media: <LineServicesSmooth />, // ⟵ dùng SVG mượt
  },
];

export default function KeyFeaturesSection() {
  const [active, setActive] = useState<Industry>(INDUSTRIES[0]);

  return (
    <Section
      className="industry-surface py-14 lg:py-16"
      containerClassName="relative z-[1]"
    >
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="brand-chip">
          ERP linh hoạt – Phù hợp mọi lĩnh vực
        </Badge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Tùy chỉnh theo ngành,{" "}
          <span className="marker-lime">tối ưu vận hành</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Dù Thương mại, Sản xuất hay Dịch vụ, PV-ERP đều điều chỉnh theo đặc
          thù ngành để nâng cao hiệu quả quản trị.
        </p>
      </div>

      {/* Segmented control */}
      <div className="mx-auto mt-6 flex w-full max-w-3xl items-center justify-center gap-2 rounded-full border bg-white/70 p-1 backdrop-blur">
        {INDUSTRIES.map((it) => {
          const activeState = active.key === it.key;
          return (
            <button
              key={it.key}
              onClick={() => setActive(it)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition
                ${
                  activeState
                    ? "bg-[linear-gradient(135deg,var(--brand-green),var(--brand-lime))] text-white shadow"
                    : "text-foreground/80 hover:bg-muted"
                }
              `}
              aria-pressed={activeState}
            >
              {it.icon}
              {it.title}
            </button>
          );
        })}
      </div>

      {/* Preview card */}
      <Card className="mt-6 overflow-hidden border-muted/70 bg-white/90 backdrop-blur">
        <CardContent className="grid gap-6 p-6 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-green),white_55%)] bg-[color-mix(in_oklab,var(--brand-lime),white_85%)] p-3">
                {active.icon}
              </span>
              <div>
                <h3 className="text-xl font-semibold">{active.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {active.blurb}
                </p>
              </div>
            </div>

            <ul className="mt-4 space-y-2">
              {active.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--brand-green)]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Media */}
          <div className="overflow-hidden rounded-xl border bg-white/65">
            <div className="grid h-full place-items-center p-4">
              {active.media}
            </div>
          </div>
        </CardContent>

        {/* brand underline */}
        <div className="h-[3px] w-full bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
      </Card>
    </Section>
  );
}
