"use client";

import Section from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, Rocket, LineChart, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

/* ============ Mini SVGs (animated) ============ */

function SavingsLine() {
  return (
    <svg
      className="savings-line h-28 w-full"
      viewBox="0 0 360 100"
      aria-hidden="true"
    >
      {/* xu hướng giảm chi phí (đi xuống mượt) */}
      <path
        d="M10 40 C 70 65, 130 30, 185 52 S 290 78, 350 60"
        fill="none"
        stroke="var(--brand-green)"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0, 600"
          to="600, 0"
          dur="3.2s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

function ProductivityBars() {
  return (
    <svg
      className="chart-bars h-28 w-full"
      viewBox="0 0 360 100"
      aria-hidden="true"
    >
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x={16 + i * 48} y={18} width="26" height="72" rx="4" />
      ))}
    </svg>
  );
}

function DecisionRealtime() {
  // dot chạy theo đường cong (SMIL)
  const pathD =
    "M10 72 C 60 28, 110 58, 150 40 S 240 70, 290 46 S 350 38, 350 38";
  return (
    <svg className="h-28 w-full" viewBox="0 0 360 100" aria-hidden="true">
      <path
        d={pathD}
        fill="none"
        stroke="var(--brand-green)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle r="4" fill="var(--brand-green)">
        <animateMotion dur="3.2s" repeatCount="indefinite">
          <mpath xlinkHref="#realtime-path" />
        </animateMotion>
      </circle>
      {/* hidden path with id for mpath */}
      <path id="realtime-path" d={pathD} fill="none" stroke="none" />
    </svg>
  );
}

function ExpansionRipple() {
  // Ripple mở rộng từ tâm – 2 vòng luân phiên, luôn căn giữa
  return (
    <svg
      className="h-28 w-full"
      viewBox="0 0 120 120"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-green)" stopOpacity="0.95" />
          <stop
            offset="100%"
            stopColor="var(--brand-lime)"
            stopOpacity="0.95"
          />
        </linearGradient>
      </defs>

      {/* Hai ripple ring lan toả từ tâm */}
      <g fill="none" stroke="url(#rip)" strokeWidth="2">
        <circle cx="60" cy="60" r="10" opacity="0.85">
          <animate
            attributeName="r"
            from="10"
            to="54"
            dur="2.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.85;0"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="60" r="10" opacity="0.85">
          <animate
            attributeName="r"
            from="10"
            to="54"
            dur="2.8s"
            begin="1.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.85;0"
            dur="2.8s"
            begin="1.4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Hạt nhân ở giữa nhấp nhẹ */}
      <circle cx="60" cy="60" r="4" fill="url(#rip)" opacity="0.95">
        <animate
          attributeName="r"
          values="4;6;4"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}


/* ============ Card Item ============ */

function BenefitCard({
  icon,
  title,
  desc,
  media,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  media: ReactNode;
}) {
  return (
    <Card className="group relative h-full overflow-hidden border-muted/70 bg-white/90 backdrop-blur">
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start gap-3">
          <span className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-green),white_55%)] bg-[color-mix(in_oklab,var(--brand-lime),white_85%)] p-3 shadow-sm">
            {icon}
          </span>
          <div>
            <div className="text-lg font-semibold leading-snug">{title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-hidden rounded-xl border bg-white/65">
          <div className="grid h-full place-items-center p-3">{media}</div>
        </div>

        <span
          className="absolute inset-x-0 bottom-0 h-[3px] w-full bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]"
          aria-hidden
        />
      </CardContent>
    </Card>
  );
}

/* ============ Section ============ */

export default function BenefitsSection() {
  return (
    <Section
      className="benefits-surface py-14 lg:py-16"
      containerClassName="relative z-[1]"
    >
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="brand-chip">Giá trị cho doanh nghiệp</Badge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Tiết kiệm, <span className="marker-lime">năng suất</span>, minh bạch &
          tăng trưởng bền vững
        </h2>
        <p className="mt-2 text-muted-foreground">
          Với PV-ERP, doanh nghiệp không chỉ tiết kiệm chi phí và tăng năng
          suất, mà còn minh bạch dữ liệu, ra quyết định nhanh và xây dựng nền
          tảng tăng trưởng bền vững.
        </p>
      </div>

      {/* Grid 4 thẻ bằng nhau */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <BenefitCard
          icon={<PiggyBank className="h-5 w-5 text-[var(--brand-green)]" />}
          title="Tối ưu chi phí vận hành"
          desc="Cắt giảm đáng kể chi phí quản lý & vận hành nhờ tự động hóa."
          media={<SavingsLine />}
        />
        <BenefitCard
          icon={<Rocket className="h-5 w-5 text-[var(--brand-green)]" />}
          title="Nâng cao năng suất & hiệu quả"
          desc="Làm việc thông minh hơn, hoàn thành nhiều hơn trong thời gian ngắn."
          media={<ProductivityBars />}
        />
        <BenefitCard
          icon={<LineChart className="h-5 w-5 text-[var(--brand-green)]" />}
          title="Ra quyết định nhanh, chính xác"
          desc="Báo cáo thời gian thực & dữ liệu trực quan cho hành động kịp thời."
          media={<DecisionRealtime />}
        />
        <BenefitCard
          icon={<ShieldCheck className="h-5 w-5 text-[var(--brand-green)]" />}
          title="Minh bạch & linh hoạt mở rộng"
          desc="Hệ thống minh bạch, sẵn sàng mở rộng khi quy mô tăng trưởng."
          media={<ExpansionRipple />} // ⟵ đổi sang ripple
        />
      </div>
    </Section>
  );
}
