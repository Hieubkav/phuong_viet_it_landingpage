"use client";

import Section from "@/components/layout/Section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Headphones, Search, Cog, GraduationCap, Wrench } from "lucide-react";

type Step = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  num: string;
};

const STEPS: Step[] = [
  {
    key: "consult",
    num: "01",
    title: "Tư vấn",
    desc: "Lắng nghe nhu cầu, xác định mục tiêu & phạm vi.",
    icon: <Headphones className="h-5 w-5" />,
  },
  {
    key: "survey",
    num: "02",
    title: "Khảo sát",
    desc: "Phân tích quy trình, dữ liệu & hiện trạng hệ thống.",
    icon: <Search className="h-5 w-5" />,
  },
  {
    key: "implement",
    num: "03",
    title: "Triển khai",
    desc: "Cấu hình, nhập liệu mẫu, tích hợp & thử nghiệm UAT.",
    icon: <Cog className="h-5 w-5" />,
  },
  {
    key: "training",
    num: "04",
    title: "Đào tạo",
    desc: "Hướng dẫn vận hành theo vai trò, chuẩn hóa quy trình.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    key: "maintenance",
    num: "05",
    title: "Bảo trì",
    desc: "Hỗ trợ vận hành, tối ưu & mở rộng khi cần.",
    icon: <Wrench className="h-5 w-5" />,
  },
];

export default function ImplementationTimelineSection() {
  return (
    <Section className="timeline-surface py-14 lg:py-16">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="brand-chip">Quy trình triển khai ERP</Badge>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Nhanh gọn, <span className="marker-lime">bài bản</span> & minh bạch
        </h2>
        <p className="mt-2 text-muted-foreground">
          Tư vấn → Khảo sát → Triển khai → Đào tạo → Bảo trì
        </p>
      </div>

      {/* Timeline */}
      <div className="relative mt-10">
        {/* line ngang (desktop) – CĂN GIỮA */}
        <div
          className="
    pointer-events-none absolute left-6 right-6
    top-1/2 -translate-y-1/2
    hidden h-[3px] bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]
    lg:block
  "
        />

        {/* line dọc (mobile) – CĂN GIỮA */}
        <div
          className="
    pointer-events-none absolute
    left-1/2 -translate-x-1/2
    top-6 bottom-6
    w-[3px] bg-[linear-gradient(180deg,var(--brand-green),var(--brand-lime))]
    lg:hidden
  "
        />

        {/* Steps */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
          {STEPS.map((s, i) => (
            <Card
              key={s.key}
              className="
                relative overflow-hidden border-muted/70 bg-white/90 backdrop-blur
                transition hover:-translate-y-0.5 hover:shadow-lg
              "
            >
              <CardContent className="p-6">
                {/* Node number + icon */}
                <div className="relative mb-4 flex items-center gap-3">
                  {/* dot số thứ tự */}
                  <div
                    className="
                      relative grid h-10 w-10 place-items-center rounded-full text-white shadow
                      bg-[linear-gradient(135deg,var(--brand-green),var(--brand-lime))]
                    "
                  >
                    <span className="text-[11px] font-bold tracking-wide">
                      {s.num}
                    </span>
                    {/* halo nhẹ */}
                    <span className="absolute -z-10 inline-block h-12 w-12 rounded-full bg-[color-mix(in_oklab,var(--brand-lime),white_75%)] opacity-60 blur-md" />
                  </div>

                  {/* icon theo bước (màu brand) */}
                  <div className="grid h-9 w-9 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_88%)] text-[var(--brand-green)]">
                    {s.icon}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </CardContent>

              {/* connector “che” giao tuyến cho mobile (dot -> line dọc) */}
              {i < STEPS.length - 1 && (
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 block h-3 w-[3px] bg-white lg:hidden" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
