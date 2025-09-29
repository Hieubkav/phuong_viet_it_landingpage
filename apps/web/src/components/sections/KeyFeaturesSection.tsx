"use client";

import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cloneBlockDefault } from "@/components/blocks/block-defaults";
import { getIconByKey } from "@/lib/lucide-icons";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";

const FALLBACK_ACCENTS = [
  "from-emerald-500 to-lime-400",
  "from-sky-500 to-indigo-400",
  "from-rose-500 to-orange-400",
];

type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

type FeatureMediaKey = "barsCommerce" | "gearsManufacturing" | "lineServicesSmooth";

type FeatureInput = {
  key?: string;
  icon?: string;
  title?: string;
  summary?: string;
  bullets?: unknown[];
  media?: FeatureMediaKey | string;
  accent?: string;
};

type KeyFeaturesBlockData = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  features?: FeatureInput[];
};

const DEFAULT_DATA = cloneBlockDefault("keyFeatures" as HomeBlockKind) as KeyFeaturesBlockData;

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
    <svg className="h-28 w-full text-[var(--brand-green)]" viewBox="0 0 360 100" aria-hidden>
      {Array.from({ length: 7 }).map((_, i) => (
        <rect
          key={i}
          x={18 + i * 48}
          y={14 + (i % 3) * 6}
          width={26}
          height={70 - (i % 3) * 12}
          rx={4}
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
      <rect x="112" y="56" width="60" height="8" rx="4" fill="currentColor" opacity="0.12" />
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
              opacity={0.88}
            />
          ))}
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
        </g>
        <circle r="8" fill="currentColor" opacity={0.92} />
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
              opacity={0.9}
            />
          ))}
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="7.5s" repeatCount="indefinite" />
        </g>
        <circle r="6" fill="currentColor" opacity={0.92} />
      </g>
    </svg>
  );
}

function LineServicesSmooth() {
  const dash = 560;
  return (
    <svg className="h-28 w-full text-[var(--brand-green)]" viewBox="0 0 360 120" aria-hidden>
      <path
        d="M20 90 C70 20, 130 108, 190 54 S 310 90, 340 36"
        fill="none"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={dash}
        strokeDashoffset={dash}
      >
        <animate attributeName="stroke-dashoffset" values={`${dash};0`} dur="12s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

const MEDIA_COMPONENTS: Record<string, ReactNode> = {
  barsCommerce: <BarsCommerce />,
  gearsManufacturing: <GearsManufacturing />,
  lineServicesSmooth: <LineServicesSmooth />,
};

function resolveMedia(key?: string): ReactNode {
  if (!key) return <BarsCommerce />;
  return MEDIA_COMPONENTS[key] ?? <BarsCommerce />;
}

function toStringArray(input?: unknown[]): string[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());
}

function resolveData(data?: KeyFeaturesBlockData) {
  const merged: KeyFeaturesBlockData = {
    ...DEFAULT_DATA,
    ...data,
    features: data?.features ?? DEFAULT_DATA.features ?? [],
  };

  const features: Feature[] = (merged.features ?? []).map((feature, index) => {
    const Icon = feature.icon ? getIconByKey(feature.icon as any) : null;
    const accent = feature.accent ?? FALLBACK_ACCENTS[index % FALLBACK_ACCENTS.length];

    return {
      key: feature.key ?? `feature-${index}`,
      icon: Icon ?? (getIconByKey("ShoppingBag" as any) ?? CheckCircle2),
      title: feature.title ?? "Tính năng",
      summary:
        feature.summary ?? "PV-ERP linh hoạt cho mọi mô hình doanh nghiệp với quy trình tối ưu hóa sâu",
      bullets: toStringArray(feature.bullets).length
        ? toStringArray(feature.bullets)
        : [
            "Vận hành linh hoạt",
            "Tự động hóa quy trình",
            "Theo dõi hiệu suất realtime",
          ],
      media: resolveMedia(feature.media),
      accent,
    };
  });

  return {
    badge: merged.badge ?? "PV-ERP phù hợp cho mọi ngành nghề",
    title: merged.title ?? "Tùy chỉnh chuyên biệt cho từng lĩnh vực",
    highlight: merged.highlight ?? (DEFAULT_DATA as any).highlight ?? "Tùy chỉnh",
    description:
      merged.description ??
      "Với khả năng tùy chỉnh chuyên sâu, PV-ERP phù hợp với đặc thù của từng ngành nghề theo hoạt động riêng biệt của mỗi doanh nghiệp",
    features,
  };
}

type KeyFeaturesSectionProps = {
  data?: KeyFeaturesBlockData;
};

export default function KeyFeaturesSection({ data }: KeyFeaturesSectionProps) {
  const { badge, title, highlight, description, features } = resolveData(data);
  const hasHighlight = highlight && title.includes(highlight as string);
  const [beforeHighlight, afterHighlight] = hasHighlight ? title.split(highlight as string) : [title, ""];

  return (
    <Section className="industry-surface py-14 lg:py-16" containerClassName="relative z-[1]">
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

      <div className="mt-12 space-y-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isReversed = index % 2 === 1;

          return (
            <div
              key={feature.key}
              className={`flex flex-col gap-8 lg:flex-row lg:items-center ${isReversed ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${feature.accent} text-white shadow-lg text-xl font-bold`}
                  >
                    {index + 1}
                  </span>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{feature.title}</h3>
                    <p className="text-lg text-slate-600">{feature.summary}</p>
                  </div>
                </div>

                <ul className="ml-20 space-y-3 text-base text-foreground/85">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--brand-green)]" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
