"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Section wrapper chuẩn: có spacing dọc & container đồng bộ toàn site.
 * Dùng: <Section>...</Section> hoặc <Section as="div">...</Section>
 */
type Props<T extends React.ElementType = "section"> = {
  as?: T;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Section<T extends React.ElementType = "section">({
  as,
  className,
  containerClassName,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as || "section") as React.ElementType;

  return (
    <Tag
      className={cn(
        "relative py-16 lg:py-24", // spacing dọc chuẩn
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          // CONTAINER CHUẨN – đồng bộ với Header/Footer
          "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8",
          "relative z-[1]",
          containerClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
