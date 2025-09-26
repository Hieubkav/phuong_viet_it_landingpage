"use client";

import * as React from "react";
import Section from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link2, Wallet, BarChart3, BrainCog } from "lucide-react";
//import Image from "next/image";
import AppImage from "@/components/ui/AppImage";

type PainItem = {
  key: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  hint: string;
  media: { src: string; alt: string };
};

const ITEMS: PainItem[] = [
  {
    key: "disconnected",
    icon: Link2,
    title: "Quản lý rời rạc, thiếu kết nối giữa các phòng ban.",
    hint: "Dữ liệu phân tán, quy trình đứt gãy khiến thông tin không liền mạch.",
    media: {
      src: "/PainItem/pain-disconnected.jpg",
      alt: "Minh hoạ hệ thống rời rạc",
    },
  },
  {
    key: "cost",
    icon: Wallet,
    title: "Khó kiểm soát chi phí, hàng tồn kho, dòng tiền.",
    hint: "Vốn bị giam, chi phí phát sinh, vòng quay chậm.",
    media: {
      src: "/PainItem/pain-cost.png",
      alt: "Minh hoạ chi phí & tồn kho",
    },
  },
  {
    key: "reporting",
    icon: BarChart3,
    title: "Báo cáo chậm, thiếu số liệu thời gian thực.",
    hint: "Ra quyết định trễ, lệ thuộc file thủ công.",
    media: {
      src: "/PainItem/pain-reporting.webp",
      alt: "Minh hoạ báo cáo chậm",
    },
  },
  {
    key: "intuition",
    icon: BrainCog,
    title: "Ra quyết định dựa trên cảm tính thay vì dữ liệu.",
    hint: "Thiếu KPI & dashboard theo vai trò.",
    media: {
      src: "/PainItem/pain-intuition.jpg",
      alt: "Minh hoạ quyết định cảm tính",
    },
  },
];

export default function BusinessPainPointsSection() {
  const [active, setActive] = React.useState<PainItem>(ITEMS[0]);

  return (
    <Section className="section-surface py-14 lg:py-16">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center pv-ani-fade-up-1">
        <Badge className="brand-chip">Vấn đề doanh nghiệp gặp phải</Badge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Những <span className="marker-lime">thách thức</span> kéo chậm bước
          tiến bền vững
        </h2>
        <p className="mt-2 text-muted-foreground">
          Trong hành trình phát triển, doanh nghiệp luôn đối mặt với nhiều thách
          thức làm chậm bước tiến bền vững.
        </p>
      </div>

      {/* Mobile/Tablet: grid bằng nhau + ảnh minh hoạ */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:hidden">
        {ITEMS.map((it, i) => (
          <MobilePainCard
            key={it.key}
            item={it}
            style={{ animationDelay: `${0.06 * (i + 1)}s` }}
          />
        ))}
      </div>

      {/* Desktop: panel trái + 4 card nhỏ bằng nhau bên phải */}
      <div className="mt-6 hidden items-stretch gap-6 lg:grid lg:min-h-[82svh] lg:grid-cols-12">
        {/* LEFT big panel */}
        <ActivePainPanel
          item={active}
          className="lg:col-span-7 pv-ani-fade-up-1 h-full"
          key={active.key}
        />

        {/* RIGHT equal height cards */}
        <div className="grid gap-4 lg:col-span-5 [grid-auto-rows:1fr]">
          {ITEMS.map((it, i) => (
            <SelectablePainCard
              key={it.key}
              item={it}
              active={active.key === it.key}
              onSelect={() => setActive(it)}
              style={{ animationDelay: `${0.06 * (i + 1)}s` }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ——— Subcomponents ——— */

function ActivePainPanel({
  item,
  className = "",
}: {
  item: PainItem;
  className?: string;
}) {
  const Icon = item.icon;
  return (
    <Card
      className={`relative overflow-hidden border-muted/70 bg-white/85 backdrop-blur ${className}`}
    >
      <CardContent className="p-6 lg:p-7 h-full">
        <div className="flex items-start gap-4">
          <span className="rounded-2xl border border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_85%)] p-3 shadow-sm">
            <Icon className="h-6 w-6 text-[var(--brand-green)]" />
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="text-xl font-semibold lg:text-2xl">{item.title}</div>
          <p className="max-w-xl text-sm text-muted-foreground">{item.hint}</p>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border bg-white/60">
          <div className="aspect-[16/9]">
            <AppImage
              width={1920}
              height={1080}
              src={
                item.media.src.startsWith("/")
                  ? item.media.src
                  : `/${item.media.src}`
              }
              alt={item.media.alt ?? ""}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
      </CardContent>
    </Card>
  );
}
  

function SelectablePainCard({
  item,
  active,
  onSelect,
  style,
}: {
  item: PainItem;
  active: boolean;
  onSelect: () => void;
  style?: React.CSSProperties;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      className="h-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--brand-green),transparent_60%)] focus-visible:ring-offset-2"
      role="tab"
      aria-selected={active}
    >
      <Card
        className={`
            relative h-full overflow-hidden transition
            hover:-translate-y-0.5 hover:shadow-sm
            ${
              active
                ? "border-[color-mix(in_oklab,var(--brand-green),white_30%)]"
                : "border-muted/70"
            }
            bg-white/80 backdrop-blur
          `}
        style={style}
      >
        <CardContent className="flex h-full flex-col p-4">
          <div className="flex flex-1 items-start gap-3">
            <span
              className={`
                  rounded-xl p-2.5 border
                  ${
                    active
                      ? "bg-[color-mix(in_oklab,var(--brand-lime),white_80%)] border-[color-mix(in_oklab,var(--brand-green),white_55%)]"
                      : "bg-[color-mix(in_oklab,var(--brand-lime),white_88%)] border-[color-mix(in_oklab,var(--brand-green),white_70%)]"
                  }
                `}
            >
              <Icon className="h-5 w-5 text-[var(--brand-green)]" />
            </span>
            <div>
              <div className="font-medium leading-snug">{item.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{item.hint}</p>
            </div>
          </div>
        </CardContent>

        {/* underline tuyệt đối ở đáy → không còn khoảng trắng */}
        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
      </Card>
    </button>
  );
}
  

function MobilePainCard({
  item,
  style,
}: {
  item: PainItem;
  style?: React.CSSProperties;
}) {
  const Icon = item.icon;
  return (
    <Card
      className="overflow-hidden border-muted/70 bg-white/85 backdrop-blur pv-ani-fade-up-2"
      style={style}
    >
      <CardContent className="p-0">
        {/* Media on top */}
        <div className="overflow-hidden border-b bg-white/60">
          <div className="aspect-[16/9]">
            <AppImage
              width={1920}
              height={1080}
              src={
                item.media.src.startsWith("/")
                  ? item.media.src
                  : `/${item.media.src}`
              }
              alt={item.media.alt ?? ""}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        {/* Text */}
        <div className="p-5">
          <div className="flex items-start gap-3">
            <span className="rounded-xl border border-[color-mix(in_oklab,var(--brand-green),white_60%)] bg-[color-mix(in_oklab,var(--brand-lime),white_86%)] p-2.5">
              <Icon className="h-5 w-5 text-[var(--brand-green)]" />
            </span>
            <div>
              <div className="font-medium">{item.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{item.hint}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
