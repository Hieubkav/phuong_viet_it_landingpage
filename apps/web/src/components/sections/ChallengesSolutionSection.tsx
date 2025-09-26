"use client";

import Section from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Wallet, Gauge, BrainCog } from "lucide-react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

/** CSS variables kiểu an toàn (không dùng any) */
type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

/* ================= Mini illustrations (SVG, animated) ================ */

/** Line spark — dùng cho “Báo cáo thời gian thực” */
function SparkMini() {
  return (
    <svg
      className="spark-line h-24 w-full"
      viewBox="0 0 240 90"
      aria-hidden="true"
    >
      <path d="M5 70 C35 20,65 60,95 40 S155 70,185 45 S235 35,235 35" />
    </svg>
  );
}

/** Donut — dùng cho “Chi phí & dòng tiền” */
function DonutCashflow() {
  const r = 34;
  const circum = 2 * Math.PI * r;
  const styleVars: CSSVars = { "--circum": circum };

  return (
    <svg
      className="donut-cash h-24 w-24"
      viewBox="0 0 80 80"
      aria-hidden="true"
      style={styleVars}
    >
      <circle className="ring" cx="40" cy="40" r={r} />
      <circle
        className="arc"
        cx="40"
        cy="40"
        r={r}
        strokeDasharray={circum}
        strokeDashoffset={circum * 0.35}
        transform="rotate(-90 40 40)"
      />
    </svg>
  );
}

/** Network flow — dùng cho “Tích hợp dữ liệu” */
function NodesFlow() {
  return (
    <svg className="h-40 w-full" viewBox="0 0 460 160" aria-hidden="true">
      <g className="flow-link">
        <path d="M60 80 L170 50" />
        <path d="M170 50 L290 70" />
        <path d="M170 50 L210 120" />
        <path d="M290 70 L400 40" />
        <path d="M290 70 L380 120" />
        <path d="M60 80 L120 120 L210 120" />
      </g>
      <g className="pulse-dot">
        <circle cx="60" cy="80" r="6" />
        <circle cx="170" cy="50" r="6" />
        <circle cx="210" cy="120" r="6" />
        <circle cx="290" cy="70" r="6" />
        <circle cx="380" cy="120" r="6" />
        <circle cx="400" cy="40" r="6" />
      </g>
    </svg>
  );
}

/** Bars dài — dùng cho “Chiến lược dựa trên dữ liệu” (căn giữa & responsive) */
function BarsLongStrategy() {
  const cols = useResponsiveCols(); // 6 / 8 / 10
  const viewW = 520;
  const viewH = 100;
  const barW = 26;
  const gap = 22;
  const yTop = 16;
  const h = 72;

  const total = cols * barW + (cols - 1) * gap;
  const startX = Math.max(0, (viewW - total) / 2);
  const arr = Array.from({ length: cols }, (_, i) => i);

  return (
    <svg
      className="bars-long h-28 w-full"
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {arr.map((i) => (
        <rect
          key={i}
          x={startX + i * (barW + gap)}
          y={yTop}
          width={barW}
          height={h}
          rx={4}
        />
      ))}
    </svg>
  );
}

/** Xác định số cột theo breakpoint (không dùng React namespace) */
function useResponsiveCols(): number {
  const [cols, setCols] = useState<number>(6); // default mobile

  useEffect(() => {
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const update = () => setCols(mqLg.matches ? 10 : mqMd.matches ? 8 : 6);

    update();
    mqMd.addEventListener("change", update);
    mqLg.addEventListener("change", update);
    return () => {
      mqMd.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return cols;
}

/* ================= Tile generic ================= */

function Tile({
  icon,
  title,
  hint,
  media,
  className = "",
  style,
}: {
  icon: ReactNode;
  title: string;
  hint: string;
  media: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Card
      className={`relative overflow-hidden border-muted/70 bg-white/90 backdrop-blur ${className}`}
      style={style}
    >
      <CardContent className="flex h-full flex-col p-6">
        <div className="flex items-start gap-3">
          <span className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-green),white_55%)] bg-[color-mix(in_oklab,var(--brand-lime),white_85%)] p-3 shadow-sm">
            {icon}
          </span>
          <div>
            <div className="text-lg font-semibold leading-snug">{title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
          </div>
        </div>

        <div className="mt-4 flex-1 overflow-hidden rounded-xl border bg-white/65">
          <div className="grid h-full place-items-center">{media}</div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
      </CardContent>
    </Card>
  );
}

/* ================= Section ================= */

export default function ChallengesSolutionSection() {
  return (
    <Section
      className="solution-surface py-14 lg:py-16"
      containerClassName="relative z-[1]"
    >
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="brand-chip">Giải pháp PV-ERP</Badge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Tối ưu quy trình – Hợp nhất dữ liệu –{" "}
          <span className="marker-lime">Tăng hiệu quả</span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          PV-ERP giúp doanh nghiệp tối ưu quy trình, hợp nhất dữ liệu, tăng hiệu
          quả và tạo bước nhảy vọt trong quản trị.
        </p>
      </div>

      {/* Bento lấp kín lưới: 1 lớn trái (span 2 hàng), 2 nhỏ phải, 1 ô full-width dưới cùng */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:auto-rows-[minmax(190px,1fr)]">
        {/* LỚN trái (span 2 hàng) — Integrated data */}
        <Tile
          className="lg:col-span-7 lg:row-span-2 min-h-[320px]"
          icon={<Layers className="h-6 w-6 text-[var(--brand-green)]" />}
          title="Tích hợp dữ liệu – Xóa bỏ rời rạc"
          hint="Một hệ thống duy nhất — CEO xem tổng thể trên dashboard."
          media={<NodesFlow />}
        />

        {/* NHỎ phải */}
        <Tile
          className="lg:col-span-5 min-h-[190px]"
          icon={<Wallet className="h-5 w-5 text-[var(--brand-green)]" />}
          title="Kiểm soát chi phí & dòng tiền"
          hint="Giao dịch – tồn – công nợ cập nhật tức thời."
          media={<DonutCashflow />}
        />
        <Tile
          className="lg:col-span-5 min-h-[190px]"
          icon={<Gauge className="h-5 w-5 text-[var(--brand-green)]" />}
          title="Báo cáo thời gian thực"
          hint="Phân tích tức thì – minh bạch."
          media={<SparkMini />}
        />

        {/* FULL-WIDTH — Strategy bars */}
        <Tile
          className="lg:col-span-12 min-h-[220px]"
          icon={<BrainCog className="h-5 w-5 text-[var(--brand-green)]" />}
          title="Chiến lược dựa trên dữ liệu"
          hint="Cột kéo dài – biểu thị tăng trưởng theo thời gian."
          media={<BarsLongStrategy />}
        />
      </div>
    </Section>
  );
}
