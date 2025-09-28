"use client";

import Link from "next/link";
import { Mail, Globe, MapPin } from "lucide-react";
import AppImage from "@/components/ui/AppImage";

export default function Footer() {
  return (
    <footer className="mt-14">
      {/* Khối chính màu xám đậm theo thiết kế */}
      <div className="relative overflow-hidden bg-[#424242] text-white">
        {/* Nội dung footer */}
        <div className="container container-padding mx-auto py-4">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Logo và tên công ty */}
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
              <div className="flex flex-col items-start">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#e9f542]">
                  CÔNG TY TNHH CÔNG NGHỆ THÔNG TIN VÀ MÔI TRƯỜNG PHƯƠNG VIỆT
                </h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-white/80">
                  <MapPin className="h-3 w-3" />
                  Số 133/2A Trần Hưng Đạo, Phường Ninh Kiều, Thành phố Cần Thơ
                </p>
              </div>
            </div>

            {/* Thông tin liên hệ */}
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
                  className="font-medium text-[#e9f542] hover:underline"
                >
                  phuongvietit.vn
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dải chân dưới cùng */}
        <div className="bg-[#363636] py-2 text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-white/90">
            PHUONG VIET IT&amp;E
          </div>
        </div>
      </div>
    </footer>
  );
}
