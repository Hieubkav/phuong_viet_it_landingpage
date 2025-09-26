"use client";

import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import AppVideo from "@/components/ui/AppVideo";
import { Phone } from "lucide-react";

const HERO_STATS = [
  { v: "100%", k: "TÙY CHỈNH" },
  { v: "10+", k: "CHUYÊN GIA" },
  { v: "24/7", k: "HỖ TRỢ" },
];

export default function HeroSection() {
  return (
    <Section
      className="relative overflow-hidden hero-surface pt-8 pb-12 lg:pt-8 lg:pb-8"
      containerClassName="relative"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="order-2 lg:order-none lg:self-center lg:justify-self-start pv-ani-fade-up-2">
          <div className="pv-glass overflow-hidden rounded-3xl shadow-xl shadow-black/5">
            <div className="aspect-[16/10] lg:aspect-[3/2]">
              <AppVideo
                className="h-full w-full object-cover"
                poster="/hero-fallback.svg"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="metadata"
                aria-label="PV-ERP intro video"
                sources={[
                  { src: "/video_homepage.webm", type: "video/webm" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-none pv-ani-fade-up-1 lg:self-center lg:pl-6 xl:pl-10">
          <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight text-[#123524] md:text-5xl xl:text-6xl lg:mt-0">
            PV-ERP - Nền tảng <span className="marker-lime">quản trị thông minh</span> cho doanh nghiệp thời đại số
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Hợp nhất dữ liệu - Tối ưu vận hành - Tăng trưởng bền vững cùng hệ sinh thái quản trị số hóa toàn diện.
          </p>

          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="btn-cta group px-6 py-5 text-base font-semibold md:text-lg"
            >
              <a href="tel:0706780790">
                Liên hệ nhận tư vấn ngay
                <Phone className="ml-3 h-6 w-6 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 text-center lg:max-w-md">
            {HERO_STATS.map(({ v, k }) => (
              <div
                key={k}
                className="rounded-xl border border-slate-200 bg-white px-3 py-4 text-foreground shadow-sm"
              >
                <div className="text-2xl font-bold text-[var(--brand-green)] md:text-3xl">
                  {v}
                </div>
                <div className="text-sm uppercase tracking-wide text-slate-500 md:text-base">
                  {k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

