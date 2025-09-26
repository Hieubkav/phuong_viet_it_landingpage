"use client";

import Section from "@/components/layout/Section";
import SectionAnchor from "@/components/layout/SectionAnchor";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Phone, Mail } from "lucide-react";

type Props = { id?: string };

export default function ContactInfo({ id }: Props) {
  return (
    <>
      {/* anchor vô hình nếu bạn muốn menu hoặc CTA nhảy tới chính xác */}
      {id ? <SectionAnchor id={id} /> : null}

      <Section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="brand-chip">Thông tin liên hệ</Badge>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            CÔNG TY TNHH Công nghệ thông tin & Môi trường Phương Việt
          </h2>
        </div>

        <Card
          className="
            mx-auto mt-6 max-w-3xl overflow-hidden border-muted/70 bg-white/90 backdrop-blur
          "
          itemScope
          itemType="https://schema.org/Organization"
        >
          <CardContent className="p-6">
            {/* Tên công ty (microdata) */}
            <meta
              itemProp="name"
              content="CÔNG TY TNHH Công nghệ thông tin và Môi trường Phương Việt"
            />

            <ul className="grid gap-4 sm:grid-cols-2">
              {/* Địa chỉ */}
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_88%)] text-[var(--brand-green)]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-medium">Địa chỉ</div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=133%2F2A+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o%2C+Ph%C6%B0%E1%BB%9Dng+Ninh+Ki%E1%BB%81u%2C+Th%C3%A0nh+ph%E1%BB%91+C%E1%BA%A7n+Th%C6%A1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:underline"
                    itemProp="address"
                  >
                    Số 133/2A Trần Hưng Đạo, Phường Ninh Kiều, Thành phố Cần Thơ
                  </a>
                </div>
              </li>

              {/* Điện thoại */}
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_88%)] text-[var(--brand-green)]">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-medium">Điện thoại</div>
                  <a
                    href="tel:0706780790"
                    className="text-sm text-muted-foreground hover:underline"
                    itemProp="telephone"
                  >
                    0706 780790
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_88%)] text-[var(--brand-green)]">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <a
                    href="mailto:phuongviet.ite@gmail.com"
                    className="text-sm text-muted-foreground hover:underline"
                    itemProp="email"
                  >
                    phuongviet.ite@gmail.com
                  </a>
                </div>
              </li>

              {/* Pháp nhân / loại hình (tuỳ chọn hiển thị) */}
              <li className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_88%)] text-[var(--brand-green)]">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-medium">Pháp nhân</div>
                  <p className="text-sm text-muted-foreground">Công ty TNHH</p>
                </div>
              </li>
            </ul>
          </CardContent>

          {/* brand underline */}
          <div className="h-[3px] w-full bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
        </Card>
      </Section>
    </>
  );
}
