"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import AppImage from "@/components/ui/AppImage";

const NAV = [
  { id: "gioi-thieu", label: "Giới thiệu" },
  { id: "dat-van-de", label: "Đặt vấn đề" },
  { id: "giai-phap", label: "Giải pháp" },
  { id: "chuc-nang", label: "Chức năng" },
  { id: "tinh-nang", label: "Tính năng" },
  { id: "loi-ich", label: "Lợi ích" },
  { id: "hanh-trinh", label: "Hành trình" },
  { id: "lien-he", label: "Liên hệ" },
];

export default function SiteHeader() {
  const [active, setActive] = useState<string>("gioi-thieu");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sel = NAV.map((n) => `#${n.id}`).join(",");
    let retry: number | undefined;
    let io: IntersectionObserver | undefined;
    let cleanupScroll: (() => void) | undefined;

    const bootstrap = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
      if (!els.length) {
        retry = window.setTimeout(bootstrap, 200);
        return;
      }

      if (retry !== undefined) {
        window.clearTimeout(retry);
        retry = undefined;
      }

      io = new IntersectionObserver(
        (entries) => {
          const vis = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (vis?.target?.id) setActive(vis.target.id);
        },
        {
          rootMargin: "-72px 0px -65% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      els.forEach((el) => io?.observe(el));

      const onScroll = () => {
        if (window.scrollY < 6) setActive("gioi-thieu");
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanupScroll = () => window.removeEventListener("scroll", onScroll);
    };

    bootstrap();

    return () => {
      if (retry !== undefined) {
        window.clearTimeout(retry);
      }
      io?.disconnect();
      cleanupScroll?.();
    };
  }, []);

  const onGo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  const NavItems = useMemo(
    () => (
      <>
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={onGo(item.id)}
            data-active={active === item.id}
            className="
              relative px-3 py-2 text-base font-semibold text-slate-700 transition md:text-lg
              hover:text-[#123524]
              after:pointer-events-none after:absolute after:inset-x-2 after:-bottom-0.5 after:h-[3px]
              after:origin-left after:scale-x-0 after:rounded-full
              after:bg-[linear-gradient(90deg,var(--brand-green),#ffcd66)]
              after:transition-transform after:duration-300
              hover:after:scale-x-100
              data-[active=true]:text-[#123524] data-[active=true]:after:scale-x-100
            "
          >
            {item.label}
          </a>
        ))}
      </>
    ),
    [active]
  );

  return (
    <header
      className="
        sticky top-0 z-50 w-full border-b border-border/60 bg-white/85 backdrop-blur
        supports-[backdrop-filter]:bg-white/70
      "
    >
      <div className="container container-padding mx-auto flex h-24 items-center justify-between">
        <a
          href="#gioi-thieu"
          onClick={onGo("gioi-thieu")}
          className="flex items-center gap-2"
          aria-label="PV-ERP"
        >
          <AppImage
            src="/logo.png"
            alt="PV-ERP"
            width={80}
            height={80}
            className="h-16 w-16"
            priority
            unoptimized
          />
          <span
            className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#123524] via-[#2a7c4a] to-[#f7a501] bg-clip-text text-transparent md:text-2xl"
          >
            PV-ERP
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex">{NavItems}</nav>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 p-0 !bg-white text-foreground shadow-2xl ring-1 ring-black/5"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 px-5 pt-5 text-base font-semibold text-[#123524]">
                  <AppImage
                    src="/logo.png"
                    alt="PV-ERP"
                    width={28}
                    height={28}
                    className="h-7 w-7"
                    unoptimized
                  />
                  PV-ERP
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 grid gap-1 px-5">{NavItems}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
