"use client";

import { useMemo, useState } from "react";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { cloneBlockDefault } from "@/components/blocks/block-defaults";
import { getIconByKey } from "@/lib/lucide-icons";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";
import type { LucideIcon } from "lucide-react";

type BenefitTabInput = {
  key?: string;
  icon?: string;
  title?: string;
  summary?: string;
  description?: string;
  bullets?: unknown[];
  image?: string;
};

type BenefitsBlockData = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  tabs?: BenefitTabInput[];
};

type BenefitTab = {
  key: string;
  Icon?: LucideIcon;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
  image?: string;
};

const DEFAULT_DATA = cloneBlockDefault("benefits" as HomeBlockKind) as BenefitsBlockData;

function toBulletArray(input?: unknown[]): string[] {
  if (!Array.isArray(input)) return [];
  return input.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function buildTabs(data?: BenefitTabInput[]): BenefitTab[] {
  const source = data ?? DEFAULT_DATA.tabs ?? [];
  return source.map((tab, index) => {
    const Icon = tab.icon ? getIconByKey(tab.icon as any) : undefined;
    const bullets = toBulletArray(tab.bullets);

    return {
      key: tab.key ?? `benefit-${index}`,
      Icon,
      title: tab.title ?? "Lợi ích",
      summary: tab.summary ?? "PV-ERP tối ưu hiệu quả cho doanh nghiệp",
      description:
        tab.description ??
        "Hệ thống giúp doanh nghiệp tiết kiệm chi phí, tăng năng suất và minh bạch dữ liệu.",
      bullets: bullets.length
        ? bullets
        : [
            "Tối ưu chi phí vận hành",
            "Tăng năng suất đội ngũ",
            "Ra quyết định dựa trên dữ liệu",
          ],
      image: tab.image,
    };
  });
}

function resolveData(data?: BenefitsBlockData) {
  const tabs = buildTabs(data?.tabs);

  return {
    badge: data?.badge ?? DEFAULT_DATA.badge ?? "Giá trị cho doanh nghiệp",
    title:
      data?.title ??
      DEFAULT_DATA.title ??
      "Tiết kiệm, hiệu quả, minh bạch và bền vững cho doanh nghiệp",
    highlight: data?.highlight ?? (DEFAULT_DATA as any).highlight ?? "bền vững",
    description:
      data?.description ??
      DEFAULT_DATA.description ??
      "PV-ERP tối ưu chi phí, gia tăng năng suất, minh bạch dữ liệu và kiến tạo nền tảng tăng trưởng lâu dài, vững chắc",
    tabs,
  };
}

function getBenefitIllustration(key: string, fallbackImage?: string) {
  if (fallbackImage) {
    return (
      <img
        src={fallbackImage}
        alt={key}
        className="h-full w-full max-h-[220px] max-w-[360px] rounded-xl object-cover"
        loading="lazy"
      />
    );
  }

  switch (key) {
    case "saving":
      return (
        <svg className="h-full w-full max-h-[200px] max-w-[320px]" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="260" height="140" rx="8" fill="white" stroke="rgb(34 197 94)" strokeWidth="2" />
          <rect x="30" y="30" width="240" height="20" rx="4" fill="rgb(34 197 94 / 0.1)" />
          <text x="40" y="44" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">
            Chi phí vận hành - Tiết kiệm 30%
          </text>
          <rect x="30" y="60" width="100" height="80" rx="4" fill="rgb(34 197 94 / 0.05)" />
          <path d="M40 120 L50 100 L60 110 L70 85 L80 75 L90 70 L100 65 L110 60" stroke="rgb(34 197 94)" strokeWidth="2" fill="none" />
          <circle cx="40" cy="120" r="3" fill="rgb(34 197 94)" />
          <circle cx="110" cy="60" r="3" fill="rgb(34 197 94)" />
          <rect x="150" y="60" width="120" height="40" rx="4" fill="rgb(34 197 94 / 0.1)" />
          <text x="160" y="75" fontSize="8" fill="rgb(34 197 94)">
            Tiết kiệm
          </text>
          <text x="160" y="90" fontSize="14" fontWeight="bold" fill="rgb(34 197 94)">
            30%
          </text>
          <path d="M230 75 L240 70 L230 65" stroke="rgb(34 197 94)" strokeWidth="2" fill="none" />
        </svg>
      );
    case "productivity":
      return (
        <svg className="h-full w-full max-h-[200px] max-w-[320px]" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="260" height="140" rx="8" fill="white" stroke="rgb(34 197 94)" strokeWidth="2" />
          <rect x="30" y="30" width="240" height="20" rx="4" fill="rgb(34 197 94 / 0.1)" />
          <text x="40" y="44" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">
            Năng suất & Hiệu quả
          </text>
          <rect x="40" y="60" width="15" height="60" rx="2" fill="rgb(34 197 94 / 0.3)" />
          <rect x="60" y="50" width="15" height="70" rx="2" fill="rgb(34 197 94 / 0.5)" />
          <rect x="80" y="40" width="15" height="80" rx="2" fill="rgb(34 197 94)" />
        </svg>
      );
    case "transparency":
      return (
        <svg className="h-full w-full max-h-[200px] max-w-[320px]" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="260" height="140" rx="8" fill="white" stroke="rgb(34 197 94)" strokeWidth="2" />
          <rect x="30" y="30" width="240" height="20" rx="4" fill="rgb(34 197 94 / 0.1)" />
          <text x="40" y="44" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">
            Dữ liệu Minh bạch - KPI Dashboard
          </text>
        </svg>
      );
    default:
      return getBenefitIllustration("saving");
  }
}

type BenefitsSectionProps = {
  data?: BenefitsBlockData;
};

export default function BenefitsSection({ data }: BenefitsSectionProps) {
  const { badge, title, highlight, description, tabs } = useMemo(() => resolveData(data), [data]);
  const hasHighlight = highlight && title.includes(highlight as string);
  const [beforeHighlight, afterHighlight] = hasHighlight ? title.split(highlight as string) : [title, ""];
  const [activeKey, setActiveKey] = useState<string>(tabs[0]?.key ?? "");

  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  return (
    <Section className="benefits-surface py-14 lg:py-16" containerClassName="relative z-[1] overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        {badge ? (
          <div className="mb-4">
            <span className="brand-chip inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {badge}
            </span>
          </div>
        ) : null}

        <h2 className="text-lg font-bold tracking-tight text-[#123524] sm:text-xl md:text-2xl lg:text-3xl">
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

        {description ? <p className="mt-4 text-base text-gray-600 sm:text-lg">{description}</p> : null}
      </div>

      <div className="mt-10 flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(260px,_320px)_minmax(0,_1fr)] lg:items-stretch">
        <div className="order-1 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory lg:order-1 lg:grid lg:gap-4 lg:overflow-visible lg:pb-0 lg:snap-none">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveKey(tab.key)}
              className="text-left outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--brand-green),transparent_65%)] focus-visible:ring-offset-2"
              role="tab"
              aria-selected={tab.key === active?.key}
            >
              <div
                className={`relative h-full min-w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border transition hover:-translate-y-0.5 hover:shadow-sm lg:min-w-0 lg:shrink lg:py-5 lg:gap-4 py-4 gap-3 ${
                  tab.key === active?.key
                    ? "border-[color-mix(in_oklab,var(--brand-green),white_40%)] shadow-md"
                    : "border-muted/70"
                } bg-white`}
              >
                <div className="flex items-start gap-2 p-4">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-[var(--brand-green)] ${
                      tab.key === active?.key
                        ? "border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_82%)]"
                        : "border-[color-mix(in_oklab,var(--brand-green),white_75%)] bg-[color-mix(in_oklab,var(--brand-lime),white_90%)]"
                    }`}
                  >
                    {tab.Icon ? <tab.Icon className="h-4 w-4" /> : null}
                  </span>
                  <div>
                    <div className="text-base font-semibold text-foreground">{tab.title}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{tab.summary}</p>
                  </div>
                </div>
                <div
                  className={`absolute inset-x-0 bottom-0 h-[3px] transition-transform ${
                    tab.key === active?.key ? "scale-x-100" : "scale-x-0"
                  } bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]`}
                />
              </div>
            </button>
          ))}
        </div>

        {active ? (
          <div className="order-2 flex flex-col rounded-2xl border border-muted/70 bg-white shadow-sm lg:order-2">
            <div className="flex flex-col gap-6 p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                  {active.Icon ? <active.Icon className="h-7 w-7" /> : null}
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">{active.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{active.summary}</p>
                  <p className="text-base text-muted-foreground/80 leading-relaxed">{active.description}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-[var(--brand-green)]">Lợi ích chi tiết</h4>
                <ul className="space-y-3">
                  {active.bullets.map((bullet, index) => (
                    <li key={`${active.key}-bullet-${index}`} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-green)]/10">
                        <div className="h-2 w-2 rounded-full bg-[var(--brand-green)]" />
                      </div>
                      <span className="text-base text-muted-foreground leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex min-h-[200px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[var(--brand-green)]/5 to-[var(--brand-lime)]/10 p-6">
                {getBenefitIllustration(active.key, active.image)}
              </div>
            </div>
            <div className="h-[3px] bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
