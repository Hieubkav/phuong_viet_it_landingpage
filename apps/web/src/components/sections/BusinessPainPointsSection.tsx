"use client";

import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { cloneBlockDefault } from "@/components/blocks/block-defaults";
import { getIconByKey } from "@/lib/lucide-icons";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";
import type { LucideIcon } from "lucide-react";

type PainPointCard = {
  icon?: string;
  title?: string;
  description?: string;
};

type PainPointsBlockData = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  cards?: PainPointCard[];
};

const DEFAULT_DATA = cloneBlockDefault("painPoints" as HomeBlockKind) as PainPointsBlockData;

function resolveData(data?: PainPointsBlockData) {
  const merged: PainPointsBlockData = {
    ...DEFAULT_DATA,
    ...data,
    cards: data?.cards ?? DEFAULT_DATA.cards ?? [],
  };

  const cards = (merged.cards ?? []).map((card, index) => {
    const Icon = card.icon ? (getIconByKey(card.icon as any) ?? null) : null;
    return {
      key: `${card.title ?? "card"}-${index}`,
      Icon,
      title: card.title ?? "Tiêu đề",
      description: card.description ?? "Nội dung mô tả",
    };
  });

  return {
    badge: merged.badge ?? "Thách thức - Khó khăn",
    title: merged.title ?? "Vấn đề doanh nghiệp",
    highlight: merged.highlight ?? "gặp phải",
    description:
      merged.description ??
      "Trong hành trình phát triển, doanh nghiệp luôn đối mặt với nhiều thách thức làm chậm bước tiến bền vững",
    cards,
  };
}

type BusinessPainPointsSectionProps = {
  data?: PainPointsBlockData;
};

export default function BusinessPainPointsSection({ data }: BusinessPainPointsSectionProps) {
  const { badge, title, highlight, description, cards } = resolveData(data);

  return (
    <Section className="section-surface py-12 lg:py-14">
      <div className="mx-auto max-w-3xl text-center pv-ani-fade-up-1">
        {badge ? (
          <div className="mb-4">
            <span className="brand-chip inline-flex items-center rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
              {badge}
            </span>
          </div>
        ) : null}

        <h2 className="text-2xl font-bold leading-tight tracking-tight text-[#123524] md:text-3xl">
          <span className="whitespace-nowrap">{title}</span>{" "}
          {highlight ? <span className="marker-lime">{highlight}</span> : null}
        </h2>

        {description ? <p className="mt-3 text-lg text-gray-600">{description}</p> : null}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ key, Icon, title: cardTitle, description: cardDescription }) => (
          <Card
            key={key}
            className="h-full min-h-[220px] border-muted/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="flex h-full flex-col items-center gap-2 px-4 py-2 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[color-mix(in_oklab,var(--brand-green),white_55%)] bg-[color-mix(in_oklab,var(--brand-lime),white_85%)] text-[var(--brand-green)] shadow-sm">
                {Icon ? <Icon className="h-7 w-7" /> : null}
              </span>
              <div className="text-lg font-semibold leading-snug text-foreground">{cardTitle}</div>
              <p className="text-sm text-muted-foreground">{cardDescription}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
