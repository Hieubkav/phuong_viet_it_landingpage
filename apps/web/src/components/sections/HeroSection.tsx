"use client";

import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import AppVideo from "@/components/ui/AppVideo";
import { Phone } from "lucide-react";
import { cloneBlockDefault } from "@/components/blocks/block-defaults";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";

type HeroCta = {
  label?: string;
  href?: string;
  variant?: "primary" | "outline";
};

type HeroStat = {
  value?: string;
  label?: string;
};

type HeroVideo = {
  src?: string;
  poster?: string;
};

type HeroBlockData = {
  title?: string;
  highlight?: string;
  subtitle?: string;
  video?: HeroVideo;
  ctas?: HeroCta[];
  stats?: HeroStat[];
};

const DEFAULT_DATA = cloneBlockDefault("hero" as HomeBlockKind) as HeroBlockData;

function resolveHeroData(data?: HeroBlockData): Required<HeroBlockData> {
  const merged: HeroBlockData = {
    ...DEFAULT_DATA,
    ...data,
    video: {
      ...(DEFAULT_DATA.video ?? {}),
      ...(data?.video ?? {}),
    },
    ctas: data?.ctas ?? DEFAULT_DATA.ctas ?? [],
    stats: data?.stats ?? DEFAULT_DATA.stats ?? [],
  };

  return {
    title: merged.title ?? "Nền tảng quản trị thông minh cho doanh nghiệp",
    highlight: merged.highlight ?? "quản trị thông minh",
    subtitle: merged.subtitle ?? "Hợp nhất dữ liệu - Tối ưu vận hành - Tăng trưởng bền vững",
    video: {
      src: merged.video?.src ?? "/video_homepage.webm",
      poster: merged.video?.poster ?? "/hero-fallback.svg",
    },
    ctas: merged.ctas?.length
      ? merged.ctas
      : [
          {
            label: "Liên hệ nhận tư vấn ngay",
            href: "tel:0706780790",
            variant: "primary",
          },
        ],
    stats: merged.stats?.length
      ? merged.stats
      : [
          { value: "100%", label: "Tùy chỉnh" },
          { value: "10+", label: "Chuyên gia" },
          { value: "24/7", label: "Hỗ trợ" },
        ],
  };
}

type HeroSectionProps = {
  data?: HeroBlockData;
};

export default function HeroSection({ data }: HeroSectionProps) {
  const { title, highlight, subtitle, video, ctas, stats } = resolveHeroData(data);

  const hasHighlight = highlight && title.includes(highlight);
  const [beforeHighlight, afterHighlight] = hasHighlight ? title.split(highlight) : [title, ""];

  return (
    <Section className="relative overflow-hidden hero-surface pt-8 pb-12 lg:pt-8 lg:pb-8" containerClassName="relative">
      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="order-2 lg:order-none lg:self-center lg:justify-self-start pv-ani-fade-up-2">
          <div className="pv-glass overflow-hidden rounded-3xl shadow-xl shadow-black/5">
            <div className="aspect-[16/10] lg:aspect-[3/2]">
              <AppVideo
                className="h-full w-full object-cover"
                poster={video.poster}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="metadata"
                aria-label="PV-ERP intro video"
                sources={video.src ? [{ src: video.src, type: "video/webm" }] : []}
              />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-none pv-ani-fade-up-1 lg:self-center lg:pl-6 xl:pl-10">
          <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-[#123524] md:text-5xl xl:text-6xl lg:mt-0">
            {hasHighlight ? (
              <>
                {beforeHighlight}
                <span className="marker-lime">{highlight}</span>
                {afterHighlight}
              </>
            ) : (
              title
            )}
          </h1>

          {subtitle ? (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">{subtitle}</p>
          ) : null}

          {ctas.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctas.map((cta, index) => {
                const isPrimary = (cta.variant ?? (index === 0 ? "primary" : "outline")) === "primary";
                return (
                  <Button
                    key={`${cta.label}-${cta.href}-${index}`}
                    asChild
                    size="lg"
                    variant={isPrimary ? "default" : "outline"}
                    className={
                      isPrimary
                        ? "btn-cta group px-6 py-5 text-base font-semibold md:text-lg"
                        : "px-6 py-5 text-base font-semibold md:text-lg"
                    }
                  >
                    <a href={cta.href ?? "#"}>
                      {cta.label ?? "Liên hệ"}
                      {isPrimary ? (
                        <Phone
                          className="ml-3 h-6 w-6 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      ) : null}
                    </a>
                  </Button>
                );
              })}
            </div>
          ) : null}

          {stats.length > 0 ? (
            <div className="mt-10 grid grid-cols-3 gap-3 text-center lg:max-w-md">
              {stats.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-4 text-foreground shadow-sm"
                >
                  <div className="text-2xl font-bold text-[var(--brand-green)] md:text-3xl">
                    {item.value ?? "--"}
                  </div>
                  <div className="text-sm uppercase tracking-wide text-slate-500 md:text-base">
                    {item.label ?? ""}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
