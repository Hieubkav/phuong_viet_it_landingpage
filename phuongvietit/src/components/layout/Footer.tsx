"use client";

//import Image from "next/image";
import Link from "next/link";
import { Mail, Globe } from "lucide-react";
import AppImage from "@/components/ui/AppImage";

export default function Footer() {
  return (
    <footer className="mt-14">
      {/* Khối chính màu xám đậm + viền xanh trên */}
      <div className="relative overflow-hidden rounded-t-2xl border-x border-t border-black/20 bg-[#2a2a2a] text-white">
        {/* viền xanh thương hiệu */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />

        {/* pattern wave nhẹ (decor) */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full opacity-[0.18]"
          viewBox="0 0 1440 200"
          aria-hidden
        >
          <path
            d="M0,80 C240,140 360,20 600,80 C840,140 960,20 1200,80 C1320,110 1380,100 1440,90"
            fill="none"
            stroke="url(#g)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--brand-green)" />
              <stop offset="1" stopColor="var(--brand-lime)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nội dung */}
        <div className="container container-padding mx-auto py-5">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* left: logo + tên công ty */}
            <div className="flex items-center gap-3">
              <AppImage
                src="/logo.png"
                alt="PV-ERP"
                width={40}
                height={40}
                className="h-10 w-10 rounded-sm bg-white/5"
                priority
                unoptimized
              />
              <h3 className="text-xs font-bold uppercase tracking-wider md:text-sm">
                CÔNG TY TNHH CÔNG NGHỆ THÔNG TIN VÀ MÔI TRƯỜNG PHƯƠNG VIỆT
              </h3>
            </div>

            {/* right: email + website */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 opacity-80" />
                <span className="opacity-80">Email:</span>
                <a
                  href="mailto:phuongviet.ite@gmail.com"
                  className="font-medium text-[#e9f542] hover:underline"
                >
                  phuongviet.ite@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 opacity-80" />
                <span className="opacity-80">Website:</span>
                <Link
                  href="https://phuongvietit.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--brand-lime)] hover:underline"
                >
                  phuongvietit.vn
                </Link>
              </div>
            </div>
          </div>

          {/* đường kẻ mảnh giống ảnh */}
          <div className="mt-4 h-px w-full bg-white/15" />
        </div>
      </div>

      {/* Dải chân dưới cùng */}
      <div className="rounded-b-2xl border-x border-b border-black/20 bg-[#222] py-2 text-center text-[10px] uppercase tracking-[0.35em] text-white/80">
        Phuong Viet IT&amp;E
      </div>
    </footer>
  );
}
