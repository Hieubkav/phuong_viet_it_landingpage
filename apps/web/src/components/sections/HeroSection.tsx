"use client";

import Link from "next/link";
import Section from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AppVideo from "@/components/ui/AppVideo";

export default function HeroSection() {
  return (
    <Section
      className="relative overflow-hidden hero-surface pt-8 pb-12 lg:pt-8 lg:pb-8"
      containerClassName="relative"
    >
      <div className="grid items-center gap-8 lg:grid-cols-12">
        <div className="order-1 lg:order-none lg:col-span-7 pv-ani-fade-up-2">
          <div className="pv-glass overflow-hidden">
            <div className="aspect-[16/9]">
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

        <div className="lg:col-span-5 pv-ani-fade-up-1">
          <Badge className="brand-chip text-sm md:text-base">
            Giải pháp ERP cho doanh nghiệp Việt
          </Badge>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-[#123524] md:text-5xl xl:text-6xl">
            PV-ERP – Nền tảng <span className="marker-lime">quản trị thông minh</span> cho doanh nghiệp thời đại số
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Kết nối – Đồng hành – Phát triển bền vững cùng hệ sinh thái quản trị số hóa toàn diện.
          </p>

          <div className="mt-8">
            <Link href="#lien-he">
              <Button size="lg" className="btn-cta group text-base font-semibold">
                Đăng ký demo miễn phí
                <span className="ml-2 inline-flex">
                  <svg
                    className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 text-center lg:max-w-md">
            {[
              { v: "500+", k: "Khách hàng" },
              { v: "10+", k: "Năm kinh nghiệm" },
              { v: "24/7", k: "Hỗ trợ" },
            ].map(({ v, k }) => (
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




