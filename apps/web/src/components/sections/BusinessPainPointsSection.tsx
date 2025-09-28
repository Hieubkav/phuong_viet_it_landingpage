"use client";

import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, PiggyBank, BarChart3, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type PainPointCard = {
  key: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const PAIN_POINTS: PainPointCard[] = [
  {
    key: "disconnected",
    icon: Link2,
    title: "Quản lý rời rạc",
    description:
      "Hệ thống tách biệt, quy trình đứt gãy khiến dữ liệu không liền mạch.",
  },
  {
    key: "cost",
    icon: PiggyBank,
    title: "Chi phí khó kiểm soát",
    description: "Vốn bị giam, chi phí phát sinh và vòng quay tồn kho chậm.",
  },
  {
    key: "reporting",
    icon: BarChart3,
    title: "Báo cáo chậm trễ",
    description: "Thiếu số liệu thời gian thực nên quyết định luôn bị chậm trễ.",
  },
  {
    key: "intuition",
    icon: Brain,
    title: "Quyết định cảm tính",
    description: "Thiếu KPI minh bạch khiến lãnh đạo phải dựa vào cảm tính.",
  },
];

export default function BusinessPainPointsSection() {
  return (
    <Section className="section-surface py-14 lg:py-16">
      <div className="mx-auto max-w-3xl text-center pv-ani-fade-up-1">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground brand-chip">
            Thách thức - Khó khăn
          </span>
        </div>
        
        {/* Title with highlighted text */}
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#123524] leading-tight break-words">
          <span className="whitespace-nowrap">Vấn đề doanh nghiệp</span> <span className="marker-lime">gặp phải</span>
        </h2>
        
        <p className="mt-4 text-lg text-gray-600">
          Trong hành trình phát triển, doanh nghiệp luôn đối mặt với nhiều thách
          thức làm chậm bước tiến bền vững
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {PAIN_POINTS.map(({ key, icon: Icon, title, description }) => (
          <Card
            key={key}
            className="h-full min-h-[220px] border-muted/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="flex h-full flex-col items-center gap-3 p-6 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[color-mix(in_oklab,var(--brand-green),white_55%)] bg-[color-mix(in_oklab,var(--brand-lime),white_85%)] text-[var(--brand-green)] shadow-sm">
                <Icon className="h-8 w-8" />
              </span>
              <div className="text-lg font-semibold leading-snug text-foreground">
                {title}
              </div>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

