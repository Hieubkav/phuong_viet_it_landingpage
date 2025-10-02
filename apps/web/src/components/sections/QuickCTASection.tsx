"use client";

import Section from "@/components/layout/Section";
import SectionAnchor from "@/components/layout/SectionAnchor";
import { Button } from "@/components/ui/button";
import { cloneBlockDefault } from "@/components/blocks/block-defaults";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";

type ActionItem = {
  label?: string;
  href?: string;
  style?: "primary" | "outline";
};

type QuickCtaData = {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  actions?: ActionItem[];
};

const DEFAULT_DATA = cloneBlockDefault("quickCta" as HomeBlockKind) as QuickCtaData;

function resolveData(data?: QuickCtaData) {
  const merged: QuickCtaData = {
    ...DEFAULT_DATA,
    ...data,
    actions: data?.actions ?? DEFAULT_DATA.actions ?? [],
  };

  return {
    badge: merged.badge ?? "Giải pháp doanh nghiệp",
    title: merged.title ?? "Sẵn sàng chuyển đổi số cùng PV-ERP?",
    highlight: merged.highlight ?? "chuyển đổi số",
    description:
      merged.description ??
      "Dùng thử trải nghiệm thực tế hoặc nhận tư vấn 1:1 từ chuyên gia triển khai doanh nghiệp.",
    actions:
      merged.actions && merged.actions.length > 0
        ? merged.actions
        : [
            { label: "Đăng ký Demo", href: "tel:0982949258", style: "primary" },
            { label: "Liên hệ tư vấn", href: "tel:0982949258", style: "outline" },
          ],
  };
}

type QuickCTASectionProps = {
  data?: QuickCtaData;
  anchorId?: string;
};

export default function QuickCTASection({ data, anchorId }: QuickCTASectionProps) {
  const { badge, title, highlight, description, actions } = resolveData(data);

  const titleParts = highlight && title.includes(highlight) ? title.split(highlight) : [title, ""];

  return (
    <>
      {anchorId ? <SectionAnchor id={anchorId} /> : null}

      <Section className="cta-surface py-14 lg:py-16" containerClassName="relative z-[1] w-full max-w-none px-0">
        <div className="pv-glass bg-gradient-to-br from-[var(--brand-green)] to-[var(--brand-green-dark)] px-4 py-12 text-white shadow-xl shadow-black/5 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                {badge ? (
                  <div className="mb-2 text-sm font-medium text-[var(--brand-lime)] tracking-wide">{badge}</div>
                ) : null}
                <h2 className="text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                  {highlight && titleParts.length === 2 ? (
                    <>
                      {titleParts[0]}
                      <span className="text-[var(--brand-lime)]">{highlight}</span>
                      {titleParts[1]}
                    </>
                  ) : (
                    title
                  )}
                </h2>
                {description ? (
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">{description}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 lg:flex-shrink-0 sm:flex-row">
                {actions.map((action, index) => {
                  const variant = action.style ?? (index === 0 ? "primary" : "outline");
                  const isPrimary = variant === "primary";
                  return (
                    <Button
                      key={`${action.label}-${index}`}
                      asChild
                      size="lg"
                      variant={isPrimary ? "default" : "outline"}
                      className={
                        isPrimary
                          ? "btn-cta-gradient h-11 rounded-full px-8 text-base font-semibold shadow-md"
                          : "h-11 rounded-full px-8 text-base font-semibold border-white text-[var(--brand-green)] bg-white hover:bg-white/90 hover:text-[var(--brand-green-dark)]"
                      }
                    >
                      <a href={action.href ?? "#"}>{action.label ?? "Liên hệ"}</a>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
