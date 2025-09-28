"use client";

import Section from "@/components/layout/Section";
import SectionAnchor from "@/components/layout/SectionAnchor";
import { Button } from "@/components/ui/button";

type Props = { id?: string };

export default function QuickCTASection({ id }: Props) {
  const handleCallPhone = () => {
    window.location.href = "tel:0706780790";
  };

  return (
    <>
      {/* nếu có id thì cắm anchor vô hình để menu nhảy tới chính xác */}
      {id ? <SectionAnchor id={id} /> : null}

      <Section 
        className="cta-surface py-14 lg:py-16"
        containerClassName="w-full px-0 max-w-none relative z-[1]"
      >
        <div className="pv-glass overflow-hidden shadow-xl shadow-black/5 px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-green-dark)] text-white">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left side - Text content */}
              <div className="flex-1">
                <div className="text-sm font-medium text-[var(--brand-lime)] mb-2 tracking-wide">
                  GIẢI PHÁP DOANH NGHIỆP
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight">
                  Sẵn sàng <span className="text-[var(--brand-lime)]">chuyển đổi số</span> cùng PV-ERP?
                </h2>
                <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl">
                  Dùng thử trải nghiệm thực tế hoặc nhận tư vấn 1:1 từ chuyên gia triển khai doanh nghiệp.
                </p>
              </div>
              
              {/* Right side - Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <Button 
                  onClick={handleCallPhone}
                  className="btn-cta-gradient h-11 rounded-full px-8 text-base font-semibold shadow-md min-w-[160px] cursor-pointer"
                  size="lg"
                >
                  Đăng ký Demo
                </Button>
                <Button 
                  onClick={handleCallPhone}
                  variant="outline"
                  className="h-11 rounded-full px-8 text-base font-semibold border-white text-[var(--brand-green)] bg-white hover:bg-white/90 hover:text-[var(--brand-green-dark)] min-w-[160px] cursor-pointer"
                  size="lg"
                >
                  Liên hệ tư vấn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
