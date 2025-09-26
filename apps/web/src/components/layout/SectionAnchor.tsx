// src/components/layout/SectionAnchor.tsx
import type { HTMLAttributes } from "react";

/**
 * Anchor vô hình để cuộn tới đúng vị trí (bù chiều cao header sticky).
 * Đặt trước mỗi section mục tiêu: <SectionAnchor id="gioi-thieu" />
 * Tuỳ chỉnh offset qua CSS var: --pv-anchor-offset (mặc định 100px).
 */
export default function SectionAnchor(
  props: HTMLAttributes<HTMLDivElement> & { id: string }
) {
  const { id, ...rest } = props;
  return (
    <div
      id={id}
      className="pointer-events-none block h-0 scroll-mt-[var(--pv-anchor-offset,100px)]"
      aria-hidden="true"
      {...rest}
    />
  );
}
