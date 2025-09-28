"use client";

import Section from "@/components/layout/Section";
import { MessageCircle, Cog, GraduationCap, Headphones } from "lucide-react";

type Step = {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  num: string;
  bgColor: string;
  numColor: string;
};

const STEPS: Step[] = [
  {
    key: "consult",
    num: "1",
    title: "Liên hệ tư vấn",
    desc: "Tư vấn giải pháp phù hợp với đặc thù cơ quan",
    icon: <MessageCircle className="h-6 w-6 text-blue-600" />,
    bgColor: "bg-white",
    numColor: "bg-blue-600",
  },
  {
    key: "setup",
    num: "2",
    title: "Cài đặt & Cấu hình",
    desc: "Triển khai và cấu hình theo quy trình ISO hiện tại",
    icon: <Cog className="h-6 w-6 text-green-600" />,
    bgColor: "bg-white",
    numColor: "bg-blue-600",
  },
  {
    key: "training",
    num: "3",
    title: "Tập huấn sử dụng",
    desc: "Hướng dẫn chi tiết sử dụng phần mềm",
    icon: <GraduationCap className="h-6 w-6 text-orange-600" />,
    bgColor: "bg-white",
    numColor: "bg-blue-600",
  },
  {
    key: "support",
    num: "4",
    title: "Vận hành & Hỗ trợ",
    desc: "Hỗ trợ 24/7 trong các ngày làm việc",
    icon: <Headphones className="h-6 w-6 text-purple-600" />,
    bgColor: "bg-white",
    numColor: "bg-blue-600",
  },
];

export default function ImplementationTimelineSection() {
  return (
    <Section className="py-14 lg:py-16 bg-gray-50">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Triển khai đơn giản
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Chỉ với 4 bước đơn giản, bạn có thể sở hữu hệ thống ISO điện tử hoàn chỉnh
        </p>
      </div>

      {/* Steps */}
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step) => (
            <div key={step.key} className="relative">
              {/* Number - positioned outside and above */}
              <div className="flex justify-center mb-4">
                <div className={`${step.numColor} text-white rounded-xl w-12 h-12 flex items-center justify-center font-bold text-lg shadow-sm`}>
                  {step.num}
                </div>
              </div>

              {/* Background rounded rectangle */}
              <div className={`${step.bgColor} rounded-2xl px-6 py-6 relative shadow-sm border border-gray-100`}>
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center px-2">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
