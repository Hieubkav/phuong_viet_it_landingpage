"use client";

import Link from "next/link";
import Section from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
//import { ArrowRight } from "lucide-react";
import AppVideo from "@/components/ui/AppVideo";

export default function HeroSection() {
  return (
    <Section
      className="
        relative overflow-hidden hero-surface
        pt-16 pb-12 lg:pt-24 lg:pb-20
      "
      containerClassName="relative"
    >
      {/* glows nhẹ cho chiều sâu */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-black/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-black/10 blur-3xl"
      />

      {/* 12 columns: video chiếm 7, text 5 */}
      <div className="grid items-center gap-8 lg:grid-cols-12">
        {/* VIDEO: to & nổi bật, intro loop */}
        <div className="order-1 lg:order-none lg:col-span-7 pv-ani-fade-up-2">
          <div className="pv-glass overflow-hidden">
            <div className="aspect-[16/9]">
              <AppVideo
                className="h-full w-full object-cover"
                poster="/hero-dashboard.png"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="metadata"
                aria-label="PV-ERP intro video"
                sources={[
                  { src: "/video_homepage.webm", type: "video/webm" },
                  // bạn có thể thêm fallback mp4 nếu muốn:
                  // { src: "/video_homepage.mp4", type: "video/mp4" },
                ]}
              />
            </div>
          </div>

          {/* chips đọc rõ (đen) */}
          <div className="pointer-events-none absolute -left-4 top-6 hidden select-none lg:block">
            <div className="chip-video px-3 py-2 text-sm shadow">
              Báo cáo realtime
            </div>
          </div>
          <div className="pointer-events-none absolute -right-4 bottom-6 hidden select-none lg:block">
            <div className="chip-video px-3 py-2 text-sm shadow">
              Phân quyền chặt chẽ
            </div>
          </div>

          {/* glow floating rất nhẹ */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-14 -top-10 hidden h-24 w-24 rounded-full bg-black/[.04] blur-2xl lg:block pv-ani-float"
          />
        </div>

        {/* TEXT: gọn, ít chữ, 1 CTA */}
        <div className="lg:col-span-5 pv-ani-fade-up-1">
          <Badge className="brand-chip">
            Giải pháp ERP cho doanh nghiệp Việt
          </Badge>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
            PV-ERP – Nền tảng{" "}
            <span className="marker-lime">quản trị thông minh</span> cho doanh
            nghiệp thời đại số
          </h1>

          <p className="mt-4 max-w-xl text-base/7 text-muted-foreground lg:text-lg/8">
            Kết nối – Đồng hành – Phát triển bền vững.
          </p>

          <div className="mt-7">
            <Link href="#lien-he">
              <Button size="lg" className="btn-cta group">
                Đăng ký demo miễn phí
                <span className="ml-2 inline-flex">
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </Button>
            </Link>
          </div>

          {/* trust bar — thu gọn */}
          <div className="mt-8 grid grid-cols-3 gap-3 text-center lg:max-w-md">
            {[
              { v: "500+", k: "Khách hàng" },
              { v: "10+", k: "Năm kinh nghiệm" },
              { v: "24/7", k: "Hỗ trợ" },
            ].map(({ v, k }) => (
              <div
                key={k}
                className="rounded-xl border border-muted/70 bg-white/60 px-3 py-3 text-foreground shadow-sm"
              >
                <div className="text-xl font-bold text-[var(--brand-green)]">
                  {v}
                </div>
                <div className="text-xs uppercase tracking-wide text-foreground/80">
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
