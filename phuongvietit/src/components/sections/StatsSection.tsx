import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { v: "500+", k: "Khách hàng" },
  { v: "10+", k: "Năm kinh nghiệm" },
  { v: "99%", k: "Mức hài lòng" },
  { v: "24/7", k: "Hỗ trợ" },
];

export default function StatsSection() {
  return (
    <Section className="brand-surface">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.k} className="border-muted/70">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-extrabold text-[var(--brand-green)]">
                {s.v}
              </div>
              <div className="mt-1 text-sm">{s.k}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
