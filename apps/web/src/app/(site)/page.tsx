"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@pv-erp/backend/convex/_generated/api";
import SectionAnchor from "@/components/layout/SectionAnchor";
import HeroSection from "@/components/sections/HeroSection";
import BusinessPainPointsSection from "@/components/sections/BusinessPainPointsSection";
import ChallengesSolutionSection from "@/components/sections/ChallengesSolutionSection";
import ERPPreviewSection from "@/components/sections/ERPPreviewSection";
import KeyFeaturesSection from "@/components/sections/KeyFeaturesSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import ImplementationTimelineSection from "@/components/sections/ImplementationTimelineSection";
import QuickCTASection from "@/components/sections/QuickCTASection";
import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";
import type { ComponentType } from "react";

type HomepageBlock = {
  _id: string | { toString(): string };
  kind: string;
  label?: string;
  data?: Record<string, unknown>;
};

const BLOCK_COMPONENTS: Record<HomeBlockKind, ComponentType<any>> = {
  hero: HeroSection,
  painPoints: BusinessPainPointsSection,
  challenges: ChallengesSolutionSection,
  erpPreview: ERPPreviewSection,
  keyFeatures: KeyFeaturesSection,
  benefits: BenefitsSection,
  implementationTimeline: ImplementationTimelineSection,
  quickCta: QuickCTASection,
};

const BLOCK_ANCHORS: Partial<Record<HomeBlockKind, string>> = {
  hero: "gioi-thieu",
  painPoints: "dat-van-de",
  challenges: "giai-phap",
  erpPreview: "chuc-nang",
  keyFeatures: "tinh-nang",
  benefits: "loi-ich",
  implementationTimeline: "hanh-trinh",
  quickCta: "lien-he",
};

function isHomeBlockKind(kind: string): kind is HomeBlockKind {
  return kind in BLOCK_COMPONENTS;
}

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function getAnchorId(block: HomepageBlock): string | undefined {
  const data = (block.data ?? {}) as Record<string, unknown>;
  const dataAnchor = typeof data.anchor === "string" ? data.anchor : undefined;
  const labelAnchor = typeof block.label === "string" ? block.label : undefined;
  const fallbackAnchor = isHomeBlockKind(block.kind) ? BLOCK_ANCHORS[block.kind] : undefined;
  const source =
    (dataAnchor && dataAnchor.trim().length > 0 ? dataAnchor : undefined) ??
    (labelAnchor && labelAnchor.trim().length > 0 ? labelAnchor : undefined) ??
    fallbackAnchor;
  return source ? slugify(source.trim()) : undefined;
}

export default function LandingPage() {
  const homepage = useQuery(api.homepage.getHomepage, { slug: "home" });
  const contentBlocks = useMemo(() => (homepage?.blocks ?? []) as HomepageBlock[], [homepage?.blocks]);

  if (homepage === undefined) {
    return (
      <div className="py-24 text-center text-slate-500">
        Đang tải dữ liệu trang chủ...
      </div>
    );
  }

  if (!contentBlocks.length) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-semibold">Chưa có nội dung trang chủ</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Vui lòng mở dashboard và khởi tạo dữ liệu mẫu bằng nút "Khởi tạo dữ liệu mẫu".
        </p>
      </div>
    );
  }

  return (
    <>
      {contentBlocks.map((block) => {
        if (!isHomeBlockKind(block.kind)) {
          return null;
        }

        const Component = BLOCK_COMPONENTS[block.kind];
        const anchorId = getAnchorId(block);
        const key = typeof block._id === "string" ? block._id : block._id.toString();
        const props: Record<string, unknown> = {
          data: block.data as Record<string, unknown>,
        };

        if (block.kind === "quickCta") {
          props.anchorId = anchorId;
        }

        return (
          <section key={key} className="relative">
            {anchorId && block.kind !== "quickCta" ? <SectionAnchor id={anchorId} /> : null}
            <Component {...props} />
          </section>
        );
      })}
    </>
  );
}

