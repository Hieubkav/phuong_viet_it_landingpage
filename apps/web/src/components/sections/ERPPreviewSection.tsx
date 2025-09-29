"use client";

import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { cloneBlockDefault } from "@/components/blocks/block-defaults";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";
import type { CSSProperties } from "react";

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

type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

type ModuleItem = { id?: string; name?: string; iconSrc?: string };

type CtaItem = {
  label?: string;
  href?: string;
  target?: string;
};

type ERPPreviewData = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  modules?: ModuleItem[];
  cta?: CtaItem;
};

const DEFAULT_DATA = cloneBlockDefault("erpPreview" as HomeBlockKind) as ERPPreviewData;

function resolveModules(modules?: ModuleItem[]): ModuleItem[] {
  const merged = modules ?? DEFAULT_DATA.modules ?? [];
  if (merged.length > 0) {
    return merged;
  }
  return DEFAULT_DATA.modules ?? [];
}

function resolveData(data?: ERPPreviewData) {
  const merged: ERPPreviewData = {
    ...DEFAULT_DATA,
    ...data,
    modules: resolveModules(data?.modules),
    cta: {
      ...(DEFAULT_DATA.cta ?? {}),
      ...(data?.cta ?? {}),
    },
  };

  return {
    badge: merged.badge ?? "Một nền tảng – Kết nối toàn diện",
    title: merged.title ?? "PV-ERP quy trình liền mạch, dữ liệu thống nhất",
    highlight: merged.highlight ?? (DEFAULT_DATA as any).highlight ?? "PV-ERP",
    description:
      merged.description ??
      "PV-ERP hợp nhất toàn bộ quy trình và dữ liệu, tạo dòng chảy quản trị xuyên suốt – từ vận hành đến chiến lược",
    modules: (merged.modules ?? []).map((module, index) => ({
      id: module.id ?? `module-${index}`,
      name: module.name ?? "Module",
      iconSrc: module.iconSrc ?? "/logo.png",
    })),
    cta: {
      label: merged.cta?.label ?? "Xem tất cả module",
      href: merged.cta?.href ?? "https://www.odoo.com/vi_VN/page/all-apps",
      target: merged.cta?.target ?? "_blank",
    },
  };
}

type AppTileProps = {
  name: string;
  iconSrc: string;
  accent: string;
};

function AppTile({ name, iconSrc, accent }: AppTileProps) {
  const styleVars: CSSVars = { "--acc": accent };
  return (
    <Card className="group relative min-h-[120px] overflow-hidden border border-[color-mix(in_oklab,var(--brand-green),white_12%)] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] sm:min-h-[130px] lg:min-h-[140px]">
      <CardContent className="flex h-full flex-col items-center justify-center gap-1 p-3">
        <div
          style={styleVars}
          className="flex h-[80px] w-[80px] items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--acc)_0%,color-mix(in_oklab,var(--acc),white_45%)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,.35)]"
        >
          <img src={iconSrc} alt={name} className="h-[78px] w-[78px] object-contain" loading="lazy" />
        </div>
        <div className="text-center text-sm font-semibold leading-tight text-foreground md:text-base">{name}</div>

        <span
          className="absolute inset-x-0 bottom-0 h-1 w-full scale-x-0 bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))] transition-transform duration-300 group-hover:scale-x-100"
          aria-hidden
        />
      </CardContent>
    </Card>
  );
}

type ERPPreviewSectionProps = {
  data?: ERPPreviewData;
};

export default function ERPPreviewSection({ data }: ERPPreviewSectionProps) {
  const { badge, title, highlight, description, modules, cta } = resolveData(data);
  const hasHighlight = highlight && title.includes(highlight as string);
  const [beforeHighlight, afterHighlight] = hasHighlight ? title.split(highlight as string) : [title, ""];

  return (
    <Section className="apps-surface py-14 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        {badge ? (
          <div className="mb-4">
            <span className="brand-chip inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {badge}
            </span>
          </div>
        ) : null}

        <h2 className="text-2xl font-bold tracking-tight text-[#123524] md:text-3xl">
          {hasHighlight ? (
            <>
              {beforeHighlight}
              <span className="marker-lime">{highlight}</span>
              {afterHighlight}
            </>
          ) : (
            title
          )}
        </h2>

        {description ? <p className="mt-4 text-lg text-gray-600">{description}</p> : null}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {modules.map((module, index) => (
          <AppTile
            key={module.id ?? index}
            name={module.name ?? "Module"}
            iconSrc={module.iconSrc ?? "/logo.png"}
            accent={ACCENTS[index % ACCENTS.length]}
          />
        ))}
      </div>

      {cta?.href ? (
        <div className="mt-8 flex justify-center">
          <a
            href={cta.href}
            target={cta.target ?? "_blank"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-[color-mix(in_oklab,var(--brand-green),white_40%)] hover:text-[var(--brand-green)]"
          >
            {cta.label ?? "Xem thêm"}
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      ) : null}
    </Section>
  );
}
