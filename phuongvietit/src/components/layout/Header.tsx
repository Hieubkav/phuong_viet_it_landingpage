"use client";

//import Image from "next/image";
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
  { id: "lien-he", label: "Liên hệ" },
];

export default function Header() {
  const [active, setActive] = useState<string>("gioi-thieu");
  const [open, setOpen] = useState(false);

  // theo dõi section đang xem
  useEffect(() => {
    const sel = NAV.map((n) => `#${n.id}`).join(",");
    const els = Array.from(document.querySelectorAll<HTMLElement>(sel));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // entry chiếm tỉ lệ hiển thị cao nhất sẽ được active
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setActive(vis.target.id);
      },
      {
        // bù header 72px và nhấn mạnh vùng giữa viewport
        rootMargin: "-72px 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    els.forEach((el) => io.observe(el));

    // fallback: khi ở rất gần đầu trang, luôn set "gioi-thieu"
    const onScroll = () => {
      if (window.scrollY < 6) setActive("gioi-thieu");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onGo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // cuộn mượt; nhờ scroll-padding-top 72px nên "tới" rất chuẩn
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // feedback underline tức thời để người dùng thấy đang chọn
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
              relative px-3 py-2 text-sm font-medium text-foreground/80 transition
              hover:text-foreground
              after:pointer-events-none after:absolute after:inset-x-2 after:-bottom-0.5 after:h-[3px]
              after:origin-left after:scale-x-0 after:rounded-full
              after:bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]
              after:transition-transform after:duration-300
              hover:after:scale-x-100
              data-[active=true]:text-foreground data-[active=true]:after:scale-x-100
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
        sticky top-0 z-50 w-full border-b border-border/60 bg-white/80 backdrop-blur
        supports-[backdrop-filter]:bg-white/60
      "
    >
      <div className="container container-padding mx-auto flex h-26 items-center justify-between">
        {/* logo + brand */}
        <a
          href="#gioi-thieu"
          onClick={onGo("gioi-thieu")}
          className="flex items-center gap-2"
          aria-label="PV-ERP"
        >
          <AppImage
            src="/logo.png"
            alt="PV-ERP"
            width={58}
            height={58}
            className="h-13 w-13"
            priority
            unoptimized
          />
          <span className="text-base font-bold tracking-tight">PV-ERP</span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">{NavItems}</nav>

        {/* CTA */}
        {/* <div className="hidden md:block">
          <a href="#lien-he" onClick={onGo("lien-he")}>
            <Button className="btn-cta-gradient h-9 rounded-full px-4 text-sm font-semibold shadow">
              Đăng ký demo
            </Button>
          </a>
        </div> */}

        {/* mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 p-0 !bg-white text-foreground shadow-2xl ring-1 ring-black/5
             [background-image:linear-gradient(135deg,rgba(47,168,76,.06),rgba(203,234,58,.06))]"
            >
              <SheetHeader>
                <SheetTitle className="p-5 flex items-center gap-2">
                  <AppImage
                    src="/logo.png"
                    alt="PV-ERP"
                    width={22}
                    height={22}
                    className="h-6 w-6"
                    unoptimized
                  />
                  PV-ERP
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 grid gap-1">{NavItems}</div>

              {/* <div className="mt-6">
                <a href="#lien-he" onClick={onGo("lien-he")}>
                  <Button className="btn-cta-gradient h-10 w-full rounded-full font-semibold">
                    Đăng ký demo
                  </Button>
                </a>
              </div> */}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
