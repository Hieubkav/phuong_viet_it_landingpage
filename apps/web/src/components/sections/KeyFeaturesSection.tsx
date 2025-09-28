"use client";

import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, CheckCircle2, Factory, ShoppingBag } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

type Feature = {
  key: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  bullets: string[];
  media: ReactNode;
  accent: string;
};

function BarsCommerce() {
  return (
    <svg
      className="h-28 w-full text-[var(--brand-green)]"
      viewBox="0 0 360 100"
      aria-hidden
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x={18 + i * 48}
          y={14 + (i % 3) * 6}
          width="26"
          height={`${70 - (i % 3) * 12}`}
          rx="4"
          opacity={0.3 + i * 0.08}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function GearsManufacturing() {
  const teeth = Array.from({ length: 12 }).map((_, i) => i * 30);
  const smallTeeth = Array.from({ length: 10 }).map((_, i) => i * 36);

  return (
    <svg className="h-28 w-full text-[var(--brand-green)]" viewBox="0 0 260 120" aria-hidden>
      <rect
        x="112"
        y="56"
        width="60"
        height="8"
        rx="4"
        fill="currentColor"
        opacity="0.12"
      />

      <g transform="translate(100 60)">
        <circle r="28" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="10" />
        <g>
          {teeth.map((angle) => (
            <rect
              key={angle}
              x={-3}
              y={-40}
              width={6}
              height={16}
              rx={2}
              transform={`rotate(${angle})`}
              fill="currentColor"
              opacity="0.88"
            />
          ))}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="10s"
            repeatCount="indefinite"
          />
        </g>
        <circle r="8" fill="currentColor" opacity="0.92" />
      </g>

      <g transform="translate(178 60)">
        <circle r="22" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="8" />
        <g>
          {smallTeeth.map((angle) => (
            <rect
              key={angle}
              x={-2.5}
              y={-30}
              width={5}
              height={12}
              rx={1.5}
              transform={`rotate(${angle})`}
              fill="currentColor"
              opacity="0.9"
            />
          ))}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="-360 0 0"
            dur="7.5s"
            repeatCount="indefinite"
          />
        </g>
        <circle r="6" fill="currentColor" opacity="0.92" />
      </g>
    </svg>
  );
}

function LineServicesSmooth() {
  const dash = 560;
  return (
    <svg
      className="h-28 w-full text-[var(--brand-green)]"
      viewBox="0 0 360 120"
      aria-hidden
    >
      <path
        d="M20 90 C70 20, 130 108, 190 54 S 310 90, 340 36"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.9"
        strokeLinecap="round"
        strokeWidth="6"
        strokeDasharray={dash}
        strokeDashoffset={dash}
      >
        <animate
          attributeName="stroke-dashoffset"
          values={`${dash};0`}
          dur="12s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

const FEATURES: Feature[] = [
  {
    key: "commerce",
    icon: ShoppingBag,
    title: "Thương mại",
    summary: "Chuỗi cung ứng mượt mà, kho hàng chính xác, bán hàng minh bạch",
    bullets: [
      "Tối ưu cung ứng & logistics đa kênh",
      "Quản lý tồn kho, định mức và cảnh báo chính xác",
      "Dashboard doanh số theo thời gian thực cho mọi phòng ban",
    ],
    media: <BarsCommerce />,
    accent: "from-emerald-500 to-lime-400",
  },
  {
    key: "manufacturing",
    icon: Factory,
    title: "Sản xuất",
    summary: "Lập kế hoạch thông minh, kiểm soát chất lượng chặt chẽ, theo dõi OEE liên tục",
    bullets: [
      "MPS/MRP thông minh theo năng lực chuyền",
      "Quy trình QC nhiều công đoạn chuẩn hóa",
      "Giám sát hiệu suất dây chuyền với cảnh báo bất thường",
    ],
    media: <GearsManufacturing />,
    accent: "from-sky-500 to-indigo-400",
  },
  {
    key: "services",
    icon: Briefcase,
    title: "Dịch vụ",
    summary: "CRM, dự án, hỗ trợ khách hàng hợp nhất – vận hành tự động hóa",
    bullets: [
      "CRM đa kênh và chăm sóc khách hàng 360°",
      "Quản lý dự án linh hoạt theo Agile/Kanban",
      "Tự động hóa quy trình nội bộ và phối hợp đội nhóm",
    ],
    media: <LineServicesSmooth />,
    accent: "from-rose-500 to-orange-400",
  },
];

export default function KeyFeaturesSection() {
  return (
    <Section className="industry-surface py-14 lg:py-16" containerClassName="relative z-[1]">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground brand-chip">
            PV-ERP phù hợp cho mọi ngành nghề
          </span>
        </div>
        
        {/* Title with highlighted text */}
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#123524] leading-tight break-words">
          <span className="marker-lime">Tùy chỉnh</span> chuyên biệt cho{" "}
          <span className="whitespace-nowrap">từng lĩnh vực</span>
        </h2>
        
        <p className="mt-4 text-lg text-gray-600">
          Với khả năng tùy chỉnh chuyên sâu, PV-ERP phù hợp với đặc thù của từng ngành nghề theo hoạt động riêng biệt của mỗi doanh nghiệp
        </p>
      </div>

      <div className="mt-12 space-y-16">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          const isReversed = index % 2 === 1;
          
          return (
            <div key={feature.key} className={`flex flex-col gap-8 lg:flex-row lg:items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content Section */}
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${feature.accent} text-white shadow-lg flex-shrink-0 text-xl font-bold`}
                  >
                    {index + 1}
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-slate-600">{feature.summary}</p>
                  </div>
                </div>

                <ul className="space-y-3 text-base text-foreground/85 ml-20">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--brand-green)]" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Media Section */}
              <div className="flex-1">
                <Card className="border border-slate-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white p-6 text-[color-mix(in_oklab,var(--brand-green),black_10%)]">
                      {feature.media}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

