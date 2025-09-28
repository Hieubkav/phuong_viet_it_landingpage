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

// Benefit illustrations
function getBenefitIllustration(key: string) {
  switch (key) {
    case "saving":
      return (
        <svg className="w-full h-full max-w-[300px] max-h-[180px]" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cost Reduction Dashboard */}
          <rect x="20" y="20" width="260" height="140" rx="8" fill="white" stroke="rgb(34 197 94)" strokeWidth="2"/>
          <rect x="30" y="30" width="240" height="20" rx="4" fill="rgb(34 197 94 / 0.1)"/>
          <text x="40" y="44" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">Chi phí vận hành - Tiết kiệm 30%</text>
          
          {/* Cost reduction chart */}
          <rect x="30" y="60" width="100" height="80" rx="4" fill="rgb(34 197 94 / 0.05)"/>
          <path d="M40 120 L50 100 L60 110 L70 85 L80 75 L90 70 L100 65 L110 60" stroke="rgb(34 197 94)" strokeWidth="2" fill="none"/>
          <circle cx="40" cy="120" r="3" fill="rgb(34 197 94)"/>
          <circle cx="110" cy="60" r="3" fill="rgb(34 197 94)"/>
          
          {/* Savings indicator */}
          <rect x="150" y="60" width="120" height="40" rx="4" fill="rgb(34 197 94 / 0.1)"/>
          <text x="160" y="75" fontSize="8" fill="rgb(34 197 94)">Tiết kiệm</text>
          <text x="160" y="90" fontSize="14" fontWeight="bold" fill="rgb(34 197 94)">30%</text>
          <path d="M230 75 L240 70 L230 65" stroke="rgb(34 197 94)" strokeWidth="2" fill="none"/>
          
          {/* Automation icons */}
          <circle cx="200" cy="125" r="15" fill="rgb(34 197 94 / 0.1)"/>
          <rect x="195" y="120" width="10" height="10" rx="1" fill="rgb(34 197 94)"/>
          <text x="175" y="150" fontSize="8" fill="rgb(34 197 94)">Auto</text>
        </svg>
      );

    case "productivity":
      return (
        <svg className="w-full h-full max-w-[300px] max-h-[180px]" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Productivity Dashboard */}
          <rect x="20" y="20" width="260" height="140" rx="8" fill="white" stroke="rgb(34 197 94)" strokeWidth="2"/>
          <rect x="30" y="30" width="240" height="20" rx="4" fill="rgb(34 197 94 / 0.1)"/>
          <text x="40" y="44" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">Năng suất & Hiệu quả</text>
          
          {/* Performance bars */}
          <rect x="40" y="60" width="15" height="60" rx="2" fill="rgb(34 197 94 / 0.3)"/>
          <rect x="60" y="50" width="15" height="70" rx="2" fill="rgb(34 197 94 / 0.5)"/>
          <rect x="80" y="40" width="15" height="80" rx="2" fill="rgb(34 197 94)"/>
          <rect x="100" y="35" width="15" height="85" rx="2" fill="rgb(34 197 94)"/>
          
          {/* Workflow arrow */}
          <path d="M130 80 L170 80" stroke="rgb(34 197 94)" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgb(34 197 94)" />
            </marker>
          </defs>
          
          {/* Task completion */}
          <rect x="180" y="60" width="80" height="60" rx="4" fill="rgb(34 197 94 / 0.05)"/>
          <circle cx="190" cy="75" r="3" fill="rgb(34 197 94)"/>
          <text x="200" y="79" fontSize="8" fill="rgb(34 197 94)">Hoàn thành</text>
          <circle cx="190" cy="90" r="3" fill="rgb(34 197 94)"/>
          <text x="200" y="94" fontSize="8" fill="rgb(34 197 94)">Tự động</text>
          <circle cx="190" cy="105" r="3" fill="rgb(34 197 94)"/>
          <text x="200" y="109" fontSize="8" fill="rgb(34 197 94)">Realtime</text>
          
          {/* Mobile icon */}
          <rect x="230" y="130" width="20" height="25" rx="3" fill="rgb(34 197 94 / 0.1)" stroke="rgb(34 197 94)"/>
          <rect x="233" y="133" width="14" height="15" rx="1" fill="rgb(34 197 94 / 0.2)"/>
        </svg>
      );

    case "transparency":
      return (
        <svg className="w-full h-full max-w-[300px] max-h-[180px]" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Data Transparency Dashboard */}
          <rect x="20" y="20" width="260" height="140" rx="8" fill="white" stroke="rgb(34 197 94)" strokeWidth="2"/>
          <rect x="30" y="30" width="240" height="20" rx="4" fill="rgb(34 197 94 / 0.1)"/>
          <text x="40" y="44" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">Dữ liệu Minh bạch - KPI Dashboard</text>
          
          {/* KPI Cards */}
          <rect x="40" y="60" width="60" height="30" rx="4" fill="rgb(34 197 94 / 0.1)"/>
          <text x="45" y="72" fontSize="7" fill="rgb(34 197 94)">Doanh thu</text>
          <text x="45" y="82" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">↗ +15%</text>
          
          <rect x="110" y="60" width="60" height="30" rx="4" fill="rgb(34 197 94 / 0.1)"/>
          <text x="115" y="72" fontSize="7" fill="rgb(34 197 94)">Hiệu quả</text>
          <text x="115" y="82" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">↗ +25%</text>
          
          <rect x="180" y="60" width="60" height="30" rx="4" fill="rgb(34 197 94 / 0.1)"/>
          <text x="185" y="72" fontSize="7" fill="rgb(34 197 94)">Chi phí</text>
          <text x="185" y="82" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">↘ -30%</text>
          
          {/* Analytics Chart */}
          <rect x="40" y="100" width="120" height="40" rx="4" fill="rgb(34 197 94 / 0.05)"/>
          <path d="M50 130 L60 125 L70 120 L80 115 L90 112 L100 110 L110 108 L120 105 L130 102 L140 100" 
                stroke="rgb(34 197 94)" strokeWidth="2" fill="none"/>
          <circle cx="50" cy="130" r="2" fill="rgb(34 197 94)"/>
          <circle cx="140" cy="100" r="2" fill="rgb(34 197 94)"/>
          
          {/* Alert icon */}
          <circle cx="200" cy="115" r="15" fill="rgb(34 197 94 / 0.1)"/>
          <path d="M195 115 L200 105 L205 115" stroke="rgb(34 197 94)" strokeWidth="2" fill="none"/>
          <circle cx="200" cy="120" r="1" fill="rgb(34 197 94)"/>
          <text x="175" y="140" fontSize="7" fill="rgb(34 197 94)">Cảnh báo</text>
          
          {/* Data sharing icon */}
          <rect x="230" y="100" width="30" height="20" rx="2" fill="rgb(34 197 94 / 0.05)"/>
          <circle cx="235" cy="105" r="2" fill="rgb(34 197 94)"/>
          <circle cx="245" cy="105" r="2" fill="rgb(34 197 94)"/>
          <circle cx="255" cy="105" r="2" fill="rgb(34 197 94)"/>
          <path d="M235 105 L245 110 M245 105 L255 110" stroke="rgb(34 197 94)" strokeWidth="1"/>
          <text x="225" y="135" fontSize="7" fill="rgb(34 197 94)">Chia sẻ</text>
        </svg>
      );

    case "growth":
      return (
        <svg className="w-full h-full max-w-[300px] max-h-[180px]" viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Growth Platform Dashboard */}
          <rect x="20" y="20" width="260" height="140" rx="8" fill="white" stroke="rgb(34 197 94)" strokeWidth="2"/>
          <rect x="30" y="30" width="240" height="20" rx="4" fill="rgb(34 197 94 / 0.1)"/>
          <text x="40" y="44" fontSize="10" fontWeight="bold" fill="rgb(34 197 94)">Nền tảng Tăng trưởng - 40+ Modules</text>
          
          {/* Module grid */}
          <rect x="40" y="60" width="25" height="25" rx="3" fill="rgb(34 197 94 / 0.2)"/>
          <rect x="70" y="60" width="25" height="25" rx="3" fill="rgb(34 197 94 / 0.3)"/>
          <rect x="100" y="60" width="25" height="25" rx="3" fill="rgb(34 197 94 / 0.2)"/>
          <rect x="130" y="60" width="25" height="25" rx="3" fill="rgb(34 197 94 / 0.4)"/>
          
          <rect x="40" y="90" width="25" height="25" rx="3" fill="rgb(34 197 94 / 0.3)"/>
          <rect x="70" y="90" width="25" height="25" rx="3" fill="rgb(34 197 94)"/>
          <rect x="100" y="90" width="25" height="25" rx="3" fill="rgb(34 197 94 / 0.2)"/>
          <rect x="130" y="90" width="25" height="25" rx="3" fill="rgb(34 197 94 / 0.3)"/>
          
          {/* Integration arrows */}
          <path d="M170 72 L190 72" stroke="rgb(34 197 94)" strokeWidth="2"/>
          <path d="M170 102 L190 102" stroke="rgb(34 197 94)" strokeWidth="2"/>
          
          {/* API Integration */}
          <rect x="195" y="60" width="70" height="55" rx="4" fill="rgb(34 197 94 / 0.05)"/>
          <text x="205" y="75" fontSize="8" fontWeight="bold" fill="rgb(34 197 94)">API</text>
          <text x="205" y="87" fontSize="7" fill="rgb(34 197 94)">Tích hợp</text>
          <text x="205" y="95" fontSize="7" fill="rgb(34 197 94)">Hệ thống cũ</text>
          <text x="205" y="103" fontSize="7" fill="rgb(34 197 94)">Workflow</text>
          
          {/* Security shield */}
          <path d="M50 130 L50 145 L60 150 L70 145 L70 130 L60 125 Z" fill="rgb(34 197 94 / 0.1)" stroke="rgb(34 197 94)" strokeWidth="1"/>
          <path d="M55 135 L58 138 L65 131" stroke="rgb(34 197 94)" strokeWidth="1" fill="none"/>
          <text x="45" y="165" fontSize="7" fill="rgb(34 197 94)">Bảo mật</text>
          
          {/* Scalability arrow */}
          <path d="M120 130 L140 130 L140 140 L160 125 L140 110 L140 120 L120 120" fill="rgb(34 197 94)" opacity="0.8"/>
          <text x="115" y="165" fontSize="7" fill="rgb(34 197 94)">Mở rộng</text>
        </svg>
      );

    default:
      return null;
  }
}

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
    <Section className="benefits-surface py-14 lg:py-16" containerClassName="relative z-[1] overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground brand-chip">
            Giá trị cho doanh nghiệp
          </span>
        </div>
        
        {/* Title with highlighted text */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-[#123524] leading-tight break-words hyphens-auto word-wrap overflow-wrap-anywhere">
          <span className="block sm:inline">Tiết kiệm, hiệu quả,</span>{" "}
          <span className="block sm:inline">minh bạch và</span>{" "}
          <span className="whitespace-nowrap">
            <span className="marker-lime">bền vững</span> cho doanh nghiệp
          </span>
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-gray-600 break-words">
          PV-ERP tối ưu chi phí, gia tăng năng suất, minh bạch dữ liệu và kiến tạo nền tảng tăng trưởng lâu dài, vững chắc
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(260px,_320px)_minmax(0,_1fr)] lg:items-stretch">
        {/* Tab Navigation - Bên trái */}
        <div className="order-1 flex gap-3 overflow-x-auto pb-2 pv-ani-fade-up-2 snap-x snap-mandatory lg:order-1 lg:grid lg:gap-4 lg:overflow-visible lg:pb-0 lg:snap-none">
          {BENEFITS.map((benefit) => (
            <button
              key={benefit.key}
              type="button"
              onClick={() => setActiveTab(benefit.key)}
              className="text-left outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--brand-green),transparent_65%)] focus-visible:ring-offset-2"
              role="tab"
              aria-selected={activeTab === benefit.key}
            >
              <div className={`relative h-full min-w-[220px] shrink-0 snap-start overflow-hidden border transition hover:-translate-y-0.5 hover:shadow-sm lg:min-w-0 lg:shrink lg:py-5 lg:gap-4 py-4 gap-3 rounded-2xl ${
                activeTab === benefit.key
                  ? "border-[color-mix(in_oklab,var(--brand-green),white_40%)] shadow-md"
                  : "border-muted/70"
              } bg-white`}>
                <div className="flex items-start gap-2 p-4">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg border text-[var(--brand-green)] ${
                    activeTab === benefit.key
                      ? "border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_82%)]"
                      : "border-[color-mix(in_oklab,var(--brand-green),white_75%)] bg-[color-mix(in_oklab,var(--brand-lime),white_90%)]"
                  }`}>
                    {benefit.icon}
                  </span>
                  <div>
                    <div className="text-base font-semibold text-foreground line-clamp-1">
                      {benefit.title}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {benefit.summary}
                    </p>
                  </div>
                </div>
                <div className={`absolute inset-x-0 bottom-0 h-[3px] transition-transform ${
                  activeTab === benefit.key ? "scale-x-100" : "scale-x-0"
                } bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]`} />
              </div>
            </button>
          ))}
        </div>

        {/* Content Detail - Bên phải */}
        <div className="order-2 pv-ani-fade-up-1 lg:order-2">
          <div className="relative h-full overflow-hidden border-muted/70 bg-white shadow-sm lg:min-h-[560px] rounded-2xl border p-8 flex flex-col">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--brand-green)]/10 text-[var(--brand-green)]">
                {activeBenefit.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold tracking-tight mb-3">
                  {activeBenefit.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  {activeBenefit.summary}
                </p>
                <p className="text-base text-muted-foreground/80 leading-relaxed">
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
                    <span className="text-base text-muted-foreground leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefit Illustration */}
            <div className="mt-6 flex min-h-[200px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[var(--brand-green)]/5 to-[var(--brand-lime)]/10 p-6">
              {getBenefitIllustration(activeBenefit.key)}
            </div>

            {/* Bottom gradient bar */}
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
          </div>
        </div>
      </div>
    </Section>
  );
}

