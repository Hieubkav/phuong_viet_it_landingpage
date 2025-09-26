"use client";
import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: call API route / email service
      alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section>
      <Card className="border-muted/70">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold">Liên hệ tư vấn</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Điền thông tin, đội ngũ PV IT&E sẽ phản hồi trong thời gian sớm
            nhất.
          </p>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <Input required placeholder="Họ và tên" name="name" />
            <Input required type="email" placeholder="Email" name="email" />
            <Input required placeholder="Số điện thoại" name="phone" />
            <Input placeholder="Công ty" name="company" />
            <Textarea
              required
              placeholder="Nhu cầu / mô tả bài toán của bạn"
              name="message"
              className="min-h-32 md:col-span-2"
            />
            <div className="md:col-span-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Đang gửi..." : "Gửi yêu cầu"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
}
