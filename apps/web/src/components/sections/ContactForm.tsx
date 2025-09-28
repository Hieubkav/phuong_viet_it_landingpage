"use client";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const handleCallPhone = () => {
    window.location.href = "tel:+84123456789";
  };

  return (
    <Section className="py-12 lg:py-16">
      <div className="bg-red-600 rounded-2xl px-8 py-12 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Bắt đầu hành trình với VBA Vũ Phúc
          </h2>
          <p className="text-red-100 mb-8 text-base md:text-lg leading-relaxed">
            Đầu phẩm của khóa học VBA chất lượng cao và chuyên sâu theo tiêu chuẩn quốc tế với tập 
            tân tâm tử đội ngũ giảng viên.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              onClick={handleCallPhone}
              className="bg-white text-red-600 hover:bg-red-50 px-8 py-3 font-semibold flex-1"
            >
              Khóa học
            </Button>
            <Button 
              onClick={handleCallPhone}
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-red-600 px-8 py-3 font-semibold flex-1"
            >
              Đăng ký tư vấn
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
