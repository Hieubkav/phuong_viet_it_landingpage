"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cloneBlockDefault } from "@/components/blocks/block-defaults";
import { getIconByKey } from "@/lib/lucide-icons";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";

/** CSS variables an toàn */
type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

type ChallengeTab = {
  key?: string;
  icon?: string;
  title?: string;
  summary?: string;
  description?: string;
  points?: unknown[];
  media?: string;
};

type ChallengesBlockData = {
  badge?: string;
  title?: string;
  description?: string;
  tabs?: ChallengeTab[];
};

const DEFAULT_DATA = cloneBlockDefault("challenges" as HomeBlockKind) as ChallengesBlockData;

type SolutionItem = {
  key: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  description: string;
  points: string[];
  media: ReactNode;
};

/* ================= Mini illustrations (SVG, animated) ================ */

function SparkMini() {
  return (
    <svg className="spark-line h-24 w-full" viewBox="0 0 240 90" aria-hidden>
      <path d="M5 70 C35 20,65 60,95 40 S155 70,185 45 S235 35,235 35" />
    </svg>
  );
}

function DonutCashflow() {
  const r = 34;
  const circum = 2 * Math.PI * r;
  const styleVars: CSSVars = { "--circum": circum };

  return (
    <svg className="donut-cash h-24 w-24" viewBox="0 0 80 80" aria-hidden style={styleVars}>
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

function NodesFlow() {
  return (
    <svg className="h-40 w-full" viewBox="0 0 460 160" aria-hidden>
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

function BarsLongStrategy() {
  const cols = useResponsiveCols();
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
      aria-hidden
    >
      {arr.map((i) => (
        <rect key={i} x={startX + i * (barW + gap)} y={yTop} width={barW} height={h} rx={4} />
      ))}
    </svg>
  );
}

function useResponsiveCols(): number {
  const [cols, setCols] = useState<number>(6);

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

const MEDIA_COMPONENTS: Record<string, ReactNode> = {
  nodesFlow: <NodesFlow />,
  donutCashflow: <DonutCashflow />,
  sparkMini: <SparkMini />,
  barsLongStrategy: <BarsLongStrategy />,
};

function resolveMedia(mediaKey?: string): ReactNode {
  if (!mediaKey) return <SparkMini />;
  return MEDIA_COMPONENTS[mediaKey] ?? <SparkMini />;
}

function resolveData(data?: ChallengesBlockData) {
  const merged: ChallengesBlockData = {
    ...DEFAULT_DATA,
    ...data,
    tabs: data?.tabs ?? DEFAULT_DATA.tabs ?? [],
  };

  const tabs: SolutionItem[] = (merged.tabs ?? []).map((tab, index) => {
    const icon = tab.icon ? getIconByKey(tab.icon as any) : null;
    const points = Array.isArray(tab.points)
      ? tab.points.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      : [];

    return {
      key: tab.key ?? `solution-${index}`,
      icon: icon ?? (getIconByKey("Layers" as any) ?? Layers),
      title: tab.title ?? "Giải pháp",
      summary: tab.summary ?? "",
      description:
        tab.description ??
        "PV-ERP giúp doanh nghiệp tối ưu quy trình, hợp nhất dữ liệu và nâng cao hiệu quả",
      points: points.length > 0 ? points : ["Hỗ trợ quy trình end-to-end", "Theo dõi KPI realtime", "Bảo mật cao"],
      media: resolveMedia(tab.media),
    };
  });

  return {
    badge: merged.badge ?? "Giải pháp PV-ERP",
    title: merged.title ?? "Tối ưu - Hợp nhất - Hiệu quả",
    description:
      merged.description ??
      "PV-ERP giúp doanh nghiệp tối ưu quy trình, hợp nhất dữ liệu, tăng hiệu quả và tạo bước nhảy vọt trong quản trị",
    tabs,
  };
}

type ChallengesSolutionSectionProps = {
  data?: ChallengesBlockData;
};

export default function ChallengesSolutionSection({ data }: ChallengesSolutionSectionProps) {
  const { badge, title, description, tabs } = useMemo(() => resolveData(data), [data]);
  const [activeKey, setActiveKey] = useState<string | null>(tabs[0]?.key ?? null);

  useEffect(() => {
    setActiveKey(tabs[0]?.key ?? null);
  }, [tabs]);

  const active = tabs.find((item) => item.key === activeKey) ?? tabs[0];

  return (
    <Section className="solution-surface py-14 lg:py-16" containerClassName="relative z-[1]">
      <div className="mx-auto max-w-3xl text-center">
        {badge ? (
          <div className="mb-4">
            <span className="brand-chip inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {badge}
            </span>
          </div>
        ) : null}

        <h2 className="text-2xl font-bold tracking-tight text-[#123524] md:text-3xl">
          {title}
        </h2>

        {description ? <p className="mt-4 text-lg text-gray-600">{description}</p> : null}
      </div>

      <div className="mt-10 flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,_1fr)_minmax(260px,_320px)] lg:items-stretch">
        <div className="order-2 lg:order-1">
          {active ? <SolutionDetail item={active} /> : null}
        </div>

        <div className="order-1 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory lg:order-2 lg:grid lg:gap-4 lg:overflow-visible lg:pb-0 lg:snap-none">
          {tabs.map((item) => (
            <SolutionOption
              key={item.key}
              item={item}
              active={item.key === active?.key}
              onSelect={() => setActiveKey(item.key)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function SolutionDetail({ item }: { item: SolutionItem }) {
  const Icon = item.icon;

  return (
    <Card className="relative h-full overflow-hidden border-muted/70 bg-white shadow-sm lg:min-h-[560px]">
      <CardContent className="flex h-full flex-col gap-6 p-7">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color-mix(in_oklab,var(--brand-green),white_55%)] bg-[color-mix(in_oklab,var(--brand-lime),white_82%)] text-[var(--brand-green)] shadow-sm">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{item.title}</h3>
            {item.summary ? <p className="mt-1 text-base text-muted-foreground">{item.summary}</p> : null}
          </div>
        </div>

        <p className="text-base leading-relaxed text-slate-600">{item.description}</p>

        <ul className="grid gap-2 text-left text-base text-foreground/85">
          {item.points.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-green)]" aria-hidden />
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex min-h-[160px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4">
          {item.media}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
      </CardContent>
    </Card>
  );
}

type SolutionOptionProps = {
  item: SolutionItem;
  active: boolean;
  onSelect: () => void;
};

function SolutionOption({ item, active, onSelect }: SolutionOptionProps) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--brand-green),transparent_65%)] focus-visible:ring-offset-2"
      role="tab"
      aria-selected={active}
    >
      <Card
        className={`relative h-full min-w-[220px] shrink-0 snap-start overflow-hidden border transition hover:-translate-y-0.5 hover:shadow-sm lg:min-w-0 lg:shrink lg:py-5 lg:gap-4 py-4 gap-3 ${
          active
            ? "border-[color-mix(in_oklab,var(--brand-green),white_40%)] shadow-md"
            : "border-muted/70"
        } bg-white`}
      >
        <CardContent className="flex items-start gap-2 p-4">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg border text-[var(--brand-green)] ${
              active
                ? "border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_82%)]"
                : "border-[color-mix(in_oklab,var(--brand-green),white_75%)] bg-[color-mix(in_oklab,var(--brand-lime),white_90%)]"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <div className="text-base font-semibold text-foreground line-clamp-1">{item.title}</div>
            {item.summary ? <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.summary}</p> : null}
          </div>
        </CardContent>
        <div
          className={`absolute inset-x-0 bottom-0 h-[3px] transition-transform ${
            active ? "scale-x-100" : "scale-x-0"
          } bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]`}
        />
      </Card>
    </button>
  );
}
