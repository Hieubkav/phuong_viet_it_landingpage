"use client";

import Section from "@/components/layout/Section";
import { cloneBlockDefault } from "@/components/blocks/block-defaults";
import { getIconByKey } from "@/lib/lucide-icons";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

const DEFAULT_DATA = cloneBlockDefault("implementationTimeline" as HomeBlockKind) as ImplementationTimelineData;

type StepInput = {
  key?: string;
  order?: number;
  title?: string;
  description?: string;
  icon?: string;
};

type ImplementationTimelineData = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  steps?: StepInput[];
};

type TimelineStep = {
  key: string;
  order: number;
  title: string;
  description: string;
  icon?: LucideIcon;
};

function resolveSteps(steps?: StepInput[]): TimelineStep[] {
  const merged = steps ?? DEFAULT_DATA.steps ?? [];
  return merged
    .map((step, index) => ({
      key: step.key ?? `step-${index}`,
      order: step.order ?? index + 1,
      title: step.title ?? `Bước ${index + 1}`,
      description: step.description ?? "Nội dung bước",
      icon: step.icon ? getIconByKey(step.icon as any) : undefined,
    }))
    .sort((a, b) => a.order - b.order);
}

function resolveData(data?: ImplementationTimelineData) {
  const merged: ImplementationTimelineData = {
    ...DEFAULT_DATA,
    ...data,
    steps: data?.steps ?? DEFAULT_DATA.steps ?? [],
  };

  return {
    badge: merged.badge ?? "Hành trình PV-ERP thành công",
    title: merged.title ?? "Lộ trình rõ ràng, triển khai hiệu quả",
    highlight: merged.highlight ?? (DEFAULT_DATA as any).highlight ?? "Lộ trình rõ ràng",
    description:
      merged.description ??
      "Các giai đoạn được thiết kế bài bản, đảm bảo triển khai PV-ERP thành công và mang lại giá trị tối đa cho doanh nghiệp",
    steps: resolveSteps(merged.steps),
  };
}

type ImplementationTimelineSectionProps = {
  data?: ImplementationTimelineData;
};

export default function ImplementationTimelineSection({ data }: ImplementationTimelineSectionProps) {
  const { badge, title, highlight, description, steps } = resolveData(data);
  const hasHighlight = highlight && title.includes(highlight as string);
  const [beforeHighlight, afterHighlight] = hasHighlight ? title.split(highlight as string) : [title, ""];

  return (
    <Section className="bg-gray-50 py-14 lg:py-16">
      <div className="mx-auto max-w-4xl text-center">
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

      <div className="mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="relative">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 font-bold text-lg text-white shadow-sm">
                    {step.order}
                  </div>
                </div>

                <Card className="rounded-2xl border border-gray-100 px-6 py-6 bg-white shadow-sm">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 shadow-sm">
                      {Icon ? <Icon className="h-6 w-6 text-blue-600" /> : null}
                    </div>
                  </div>

                  <div className="px-2 text-center">
                    <h3 className="mb-2 text-[1.3rem] font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-[0.5rem] text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
