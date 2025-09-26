"use client";

import Section from "@/components/layout/Section";
import SectionAnchor from "@/components/layout/SectionAnchor";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useId, useState, type FormEvent } from "react";

type Props = { id?: string };

export default function QuickCTASection({ id }: Props) {
  const formId = useId();

  // form state (đơn giản, không dùng any)
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Tạo mailto đến email công ty (theo thông tin bạn đã chia sẻ)
      const to = "phuongviet.ite@gmail.com";
      const subject = encodeURIComponent("Đăng ký Demo PV-ERP");
      const body = encodeURIComponent(
        [
          "Thông tin đăng ký demo PV-ERP:",
          `• Họ tên: ${fullName}`,
          `• Email: ${email}`,
          `• Số điện thoại: ${phone}`,
          `• Công ty: ${company}`,
        ].join("\n")
      );

      window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_blank");
    },
    [fullName, email, phone, company]
  );

  return (
    <>
      {/* nếu có id thì cắm anchor vô hình để menu nhảy tới chính xác */}
      {id ? <SectionAnchor id={id} /> : null}

      <Section
        className="cta-surface py-14 lg:py-16"
        containerClassName="relative z-[1]"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* LEFT: Tiêu đề + CTA */}
          <div>
            <Badge className="brand-chip">Chuyển đổi số cùng PV-ERP</Badge>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight">
              Sẵn sàng <span className="marker-lime">chuyển đổi số</span> cùng
              PV-ERP?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Dùng thử trải nghiệm thực tế hoặc nhận tư vấn 1:1 từ chuyên gia
              triển khai doanh nghiệp.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {/* Nút chính: kéo tới form */}
              <a href={`#${formId}`} className="inline-block">
                <Button
                  className="btn-cta-gradient h-11 rounded-full px-6 text-base font-semibold shadow-md"
                  size="lg"
                >
                  Đăng ký Demo
                </Button>
              </a>

              {/* Nút phụ: mở email liên hệ */}
              <a
                href="mailto:phuongviet.ite@gmail.com?subject=Liên hệ tư vấn PV-ERP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  className="h-11 rounded-full px-6 text-base font-semibold hover:border-[color-mix(in_oklab,var(--brand-green),white_40%)] hover:text-[var(--brand-green)]"
                  size="lg"
                >
                  Liên hệ tư vấn ngay
                </Button>
              </a>
            </div>
          </div>

          {/* RIGHT: Form */}
          <Card
            id={formId}
            className="overflow-hidden border-muted/70 bg-white/90 backdrop-blur"
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold">Đăng ký demo miễn phí</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Điền thông tin, đội ngũ PV-ERP sẽ liên hệ trong thời gian sớm
                nhất.
              </p>

              <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor={`${formId}-name`}>Họ và tên</Label>
                    <Input
                      id={`${formId}-name`}
                      name="fullName"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor={`${formId}-company`}>Công ty</Label>
                    <Input
                      id={`${formId}-company`}
                      name="company"
                      placeholder="CÔNG TY TNHH …"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      autoComplete="organization"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor={`${formId}-email`}>Email</Label>
                    <Input
                      id={`${formId}-email`}
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor={`${formId}-phone`}>Số điện thoại</Label>
                    <Input
                      id={`${formId}-phone`}
                      type="tel"
                      name="phone"
                      placeholder="0706 780 790"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      inputMode="tel"
                      pattern="^[0-9()+\-\s]{7,}$"
                      title="Nhập số điện thoại hợp lệ"
                      required
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <Button
                    type="submit"
                    className="btn-cta-gradient h-11 w-full rounded-full text-base font-semibold shadow-md"
                  >
                    Gửi đăng ký
                  </Button>
                </div>
              </form>
            </CardContent>

            {/* brand underline */}
            <div className="h-[3px] w-full bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
          </Card>
        </div>
      </Section>
    </>
  );
}
