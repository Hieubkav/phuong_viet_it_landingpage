"use client";

import Section from "@/components/layout/Section";
import {
  BarChart3,
  LineChart,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

type Benefit = {
  key: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  summary: string;
  bullets: string[];
  image: string;
};

const BENEFITS: Benefit[] = [
  {
    key: "saving",
    icon: <PiggyBank className="h-5 w-5 text-[var(--brand-green)]" aria-hidden />,
    title: "Tối ưu chi phí vận hành",
    summary: "Loại bỏ trùng lặp, minh bạch nguồn lực giúp doanh nghiệp tiết kiệm tới 30% chi phí vận hành.",
    description:
      "Tự động hóa quy trình giúp cắt giảm chi phí lặp lại và kiểm soát ngân sách chính xác.",
    bullets: [
      "Tự động đối soát công nợ, lập hóa đơn",
      "Cảnh báo tồn kho và đặt hàng thông minh",
      "Báo cáo chi phí theo dự án, phòng ban",
    ],
    image: "/images/benefits/cost-control.png",
  },
  {
    key: "productivity",
    icon: <BarChart3 className="h-5 w-5 text-[var(--brand-green)]" aria-hidden />,
    title: "Năng suất tăng vượt trội",
    summary: "Luồng công việc số hóa giúp đội ngũ hoàn thành nhiều hơn trong cùng quỹ thời gian.",
    description:
      "Hợp nhất các quy trình tạo luồng thông tin xuyên suốt, giảm thời gian chờ đợi.",
    bullets: [
      "Tự động phê duyệt và giao việc",
      "Dashboard hiệu suất theo thời gian thực",
      "Ứng dụng di động cập nhật tức thời",
    ],
    image: "/images/benefits/productivity.png",
  },
  {
    key: "transparency",
    icon: <LineChart className="h-5 w-5 text-[var(--brand-green)]" aria-hidden />,
    title: "Quyết định dữ liệu minh bạch",
    summary: "Tất cả phòng ban truy cập chung một nguồn dữ liệu chính xác để ra quyết định nhanh chóng.",
    description:
      "Báo cáo thời gian thực giúp lãnh đạo nắm bắt tình hình và ra quyết định nhanh.",
    bullets: [
      "Dashboard KPI cá nhân hóa",
      "Cảnh báo vượt ngưỡng tự động",
      "Dữ liệu tập trung, chia sẻ dễ dàng",
    ],
    image: "/images/benefits/transparency.png",
  },
  {
    key: "growth",
    icon: <TrendingUp className="h-5 w-5 text-[var(--brand-green)]" aria-hidden />,
    title: "Nền tảng tăng trưởng bền vững",
    summary: "Kiến trúc linh hoạt giúp doanh nghiệp mở rộng quy mô mà không phải thay đổi hệ thống lõi.",
    description:
      "Kiến trúc linh hoạt với API và workflow tùy biến giúp doanh nghiệp mở rộng dễ dàng.",
    bullets: [
      "Hơn 40 module sẵn có",
      "Tích hợp dễ với hệ thống cũ",
      "Bảo mật cao, đạt chuẩn hiện đại",
    ],
    image: "/images/benefits/growth.png",
  },
];

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState("saving");
  const activeBenefit = BENEFITS.find(benefit => benefit.key === activeTab) || BENEFITS[0];

  return (
    <Section className="benefits-surface py-14 lg:py-16" containerClassName="relative z-[1]">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-[color-mix(in_oklab,var(--brand-lime),white_80%)] px-3 py-1 text-sm font-medium text-[var(--brand-green)]">
            Giá trị cho doanh nghiệp
          </span>
        </div>
        
        {/* Title with highlighted text */}
        <h2 className="text-3xl font-bold tracking-tight text-[#123524]">
          Tiết kiệm, hiệu quả, minh bạch và{" "}
          <span className="whitespace-nowrap"><span className="marker-lime">bền vững</span> cho doanh nghiệp</span>
        </h2>
        
        <p className="mt-4 text-lg text-gray-600">
          PV-ERP tối ưu chi phí, gia tăng năng suất, minh bạch dữ liệu và kiến tạo nền tảng tăng trưởng lâu dài, vững chắc
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Tab Navigation - Bên trái */}
        <div className="lg:col-span-4 space-y-2 lg:h-full">
          {BENEFITS.map((benefit) => (
            <button
              key={benefit.key}
              onClick={() => setActiveTab(benefit.key)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                activeTab === benefit.key
                  ? "bg-[var(--brand-green)]/5 border-[var(--brand-green)]/30 text-[var(--brand-green)]"
                  : "bg-white border-muted/70 hover:border-[var(--brand-green)]/20 hover:bg-[var(--brand-green)]/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                  activeTab === benefit.key
                    ? "bg-[var(--brand-green)]/10"
                    : "bg-muted/50"
                }`}>
                  {benefit.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-base ${
                    activeTab === benefit.key ? "text-[var(--brand-green)]" : "text-foreground"
                  }`}>
                    {benefit.title}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content Detail - Bên phải */}
        <div className="lg:col-span-8 lg:h-full">
          <div className="rounded-2xl border border-muted/70 bg-white p-8 h-full flex flex-col">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                {activeBenefit.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold tracking-tight mb-2">
                  {activeBenefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  {activeBenefit.summary}
                </p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {activeBenefit.description}
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="flex-1">
              <h4 className="font-semibold mb-4 text-[var(--brand-green)]">
                Lợi ích chi tiết:
              </h4>
              <ul className="space-y-3">
                {activeBenefit.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-green)]/10 mt-0.5 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-[var(--brand-green)]" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
