"use client";
import dynamic from "next/dynamic";

// tắt SSR cho canvas
const SmoothWavyCanvas = dynamic(
  () => import("./SmoothWavyCanvas"), // đường dẫn đúng file của bạn
  { ssr: false }
);

type Props = {
  /** đặt overlay nằm TRÊN section nhưng KHÔNG chặn tương tác */
  zIndex?: number; // mặc định 45
  opacity?: number; // 0.0 - 1.0 (độ đậm chung)
  maskCenter?: boolean; // làm thoáng vùng giữa để chữ dễ đọc
};

export default function GlobalWaves({
  zIndex = 45,
  opacity = 0.7,
  maskCenter = true,
}: Props) {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none mix-blend-multiply"
      style={{
        zIndex,
        opacity,
        // làm nhẹ vùng giữa trang để không ảnh hưởng text
        maskImage: maskCenter
          ? "radial-gradient(1200px 700px at 50% 42%, transparent 0%, rgba(0,0,0,.10) 52%, rgba(0,0,0,.92) 86%, #000)"
          : undefined,
        WebkitMaskImage: maskCenter
          ? "radial-gradient(1200px 700px at 50% 42%, transparent 0%, rgba(0,0,0,.10) 52%, rgba(0,0,0,.92) 86%, #000)"
          : undefined,
      }}
      aria-hidden
    >
      <SmoothWavyCanvas
        backgroundColor="transparent"
        // Màu PV: lime & green (RGB)
        primaryColor="203, 234, 58" // lime
        secondaryColor="47, 168, 76" // green
        accentColor="120, 190, 80"
        lineOpacity={0.35} // tổng thể mảnh, tinh tế
        animationSpeed={0.0028} // tốc độ mượt
      />
    </div>
  );
}
