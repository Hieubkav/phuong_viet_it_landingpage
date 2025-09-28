"use client";

import Section from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import {
  Layers,
  Wallet,
  Gauge,
  BrainCog,
  CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** CSS variables an toàn */
type CSSVars = CSSProperties & { [key: `--${string}`]: string | number };

type SolutionItem = {
  key: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  description: string;
  points: string[];
  media: ReactNode;
};

/* ================= Mini illustrations (SVG, animated) ================ */

function SparkMini() {
  return (
    <svg className="spark-line h-24 w-full" viewBox="0 0 240 90" aria-hidden>
      <path d="M5 70 C35 20,65 60,95 40 S155 70,185 45 S235 35,235 35" />
    </svg>
  );
}

function DonutCashflow() {
  const r = 34;
  const circum = 2 * Math.PI * r;
  const styleVars: CSSVars = { "--circum": circum };

  return (
    <svg
      className="donut-cash h-24 w-24"
      viewBox="0 0 80 80"
      aria-hidden
      style={styleVars}
    >
      <circle className="ring" cx="40" cy="40" r={r} />
      <circle
        className="arc"
        cx="40"
        cy="40"
        r={r}
        strokeDasharray={circum}
        strokeDashoffset={circum * 0.35}
        transform="rotate(-90 40 40)"
      />
    </svg>
  );
}

function NodesFlow() {
  return (
    <svg className="h-40 w-full" viewBox="0 0 460 160" aria-hidden>
      <g className="flow-link">
        <path d="M60 80 L170 50" />
        <path d="M170 50 L290 70" />
        <path d="M170 50 L210 120" />
        <path d="M290 70 L400 40" />
        <path d="M290 70 L380 120" />
        <path d="M60 80 L120 120 L210 120" />
      </g>
      <g className="pulse-dot">
        <circle cx="60" cy="80" r="6" />
        <circle cx="170" cy="50" r="6" />
        <circle cx="210" cy="120" r="6" />
        <circle cx="290" cy="70" r="6" />
        <circle cx="380" cy="120" r="6" />
        <circle cx="400" cy="40" r="6" />
      </g>
    </svg>
  );
}

function BarsLongStrategy() {
  const cols = useResponsiveCols();
  const viewW = 520;
  const viewH = 100;
  const barW = 26;
  const gap = 22;
  const yTop = 16;
  const h = 72;

  const total = cols * barW + (cols - 1) * gap;
  const startX = Math.max(0, (viewW - total) / 2);
  const arr = Array.from({ length: cols }, (_, i) => i);

  return (
    <svg
      className="bars-long h-28 w-full"
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {arr.map((i) => (
        <rect
          key={i}
          x={startX + i * (barW + gap)}
          y={yTop}
          width={barW}
          height={h}
          rx={4}
        />
      ))}
    </svg>
  );
}

function useResponsiveCols(): number {
  const [cols, setCols] = useState<number>(6);

  useEffect(() => {
    const mqMd = window.matchMedia("(min-width: 768px)");
    const mqLg = window.matchMedia("(min-width: 1024px)");
    const update = () => setCols(mqLg.matches ? 10 : mqMd.matches ? 8 : 6);

    update();
    mqMd.addEventListener("change", update);
    mqLg.addEventListener("change", update);
    return () => {
      mqMd.removeEventListener("change", update);
      mqLg.removeEventListener("change", update);
    };
  }, []);

  return cols;
}

/* ================= Data ================= */

const SOLUTIONS: SolutionItem[] = [
  {
    key: "integration",
    icon: Layers,
    title: "Hợp nhất quy trình",
    summary: "Một nền tảng xuyên suốt các phòng ban và chi nhánh.",
    description:
      "PV-ERP kết nối dữ liệu giữa bán hàng, kho, kế toán và vận hành để loại bỏ các điểm tắc nghẽn thủ công, đảm bảo thông tin luôn đồng nhất.",
    points: [
      "Luồng phê duyệt tự động theo vai trò",
      "Đồng bộ tồn kho và trạng thái đơn hàng thời gian thực",
      "Kho dữ liệu tập trung, dễ dàng truy vấn",
    ],
    media: <NodesFlow />,
  },
  {
    key: "finance",
    icon: Wallet,
    title: "Kiểm soát tài chính",
    summary: "Theo dõi chi phí, dòng tiền và công nợ tức thời.",
    description:
      "Bảng điều khiển tài chính của PV-ERP giúp doanh nghiệp chủ động ngân sách, cảnh báo vượt chi và quản lý công nợ chính xác tới từng hóa đơn.",
    points: [
      "Tổng hợp thu chi theo dự án và trung tâm chi phí",
      "Dự báo dòng tiền dựa trên kế hoạch thu - chi",
      "Báo cáo công nợ đa chiều cho nhà cung cấp và khách hàng",
    ],
    media: <DonutCashflow />,
  },
  {
    key: "reporting",
    icon: Gauge,
    title: "Dashboard thời gian thực",
    summary: "Ra quyết định nhanh với chỉ số cập nhật liên tục.",
    description:
      "Hệ thống báo cáo trực quan giúp lãnh đạo theo dõi KPI, cảnh báo bất thường và so sánh hiệu suất theo thời gian chỉ bằng vài cú nhấp chuột.",
    points: [
      "Thư viện báo cáo KPI theo từng phòng ban",
      "Cảnh báo email / chat khi chỉ số vượt ngưỡng",
      "Trích xuất dữ liệu linh hoạt cho phân tích chuyên sâu",
    ],
    media: <SparkMini />,
  },
  {
    key: "strategy",
    icon: BrainCog,
    title: "Ra quyết định dựa dữ liệu",
    summary: "Quyết định chiến lược chính xác và kịp thời.",
    description:
      "Dữ liệu được chuẩn hóa và chia sẻ trên một nguồn duy nhất giúp ban lãnh đạo xây dựng kế hoạch tăng trưởng, tối ưu nguồn lực và theo dõi hiệu quả triển khai.",
    points: [
      "Mô hình dự báo đa kịch bản theo thị trường",
      "Phân bổ nguồn lực dựa trên hiệu suất thực tế",
      "Lưu vết quyết định và kết quả thực thi",
    ],
    media: <BarsLongStrategy />,
  },
];

/* ================= Presentational components ================= */

function SolutionDetail({ item }: { item: SolutionItem }) {
  const Icon = item.icon;

  return (
    <Card className="relative h-full overflow-hidden border-muted/70 bg-white shadow-sm">
      <CardContent className="h-full p-7">
        <div className="flex items-start gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color-mix(in_oklab,var(--brand-green),white_55%)] bg-[color-mix(in_oklab,var(--brand-lime),white_82%)] text-[var(--brand-green)] shadow-sm">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="mt-1 text-base text-muted-foreground">{item.summary}</p>
          </div>
        </div>

        <p className="mt-6 text-base leading-relaxed text-slate-600">
          {item.description}
        </p>

        <ul className="mt-5 grid gap-2 text-left text-sm text-foreground/85">
          {item.points.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-green)]" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-4">
          {item.media}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]" />
      </CardContent>
    </Card>
  );
}

function SolutionOption({
  item,
  active,
  onSelect,
}: {
  item: SolutionItem;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      className="text-left outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--brand-green),transparent_65%)] focus-visible:ring-offset-2"
      role="tab"
      aria-selected={active}
    >
      <Card
        className={`relative h-full overflow-hidden border transition hover:-translate-y-0.5 hover:shadow-sm ${
          active
            ? "border-[color-mix(in_oklab,var(--brand-green),white_40%)] shadow-md"
            : "border-muted/70"
        } bg-white`}
      >
        <CardContent className="flex items-start gap-3 p-5">
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-[var(--brand-green)] ${
              active
                ? "border-[color-mix(in_oklab,var(--brand-green),white_50%)] bg-[color-mix(in_oklab,var(--brand-lime),white_82%)]"
                : "border-[color-mix(in_oklab,var(--brand-green),white_75%)] bg-[color-mix(in_oklab,var(--brand-lime),white_90%)]"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <div className="text-base font-semibold text-foreground line-clamp-1">
              {item.title}
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {item.summary}
            </p>
          </div>
        </CardContent>
        <div
          className={`absolute inset-x-0 bottom-0 h-[3px] transition-transform ${
            active ? "scale-x-100" : "scale-x-0"
          } bg-[linear-gradient(90deg,var(--brand-green),var(--brand-lime))]`}
        />
      </Card>
    </button>
  );
}

/* ================= Section ================= */

export default function ChallengesSolutionSection() {
  const [active, setActive] = useState<SolutionItem>(SOLUTIONS[0]);

  return (
    <Section className="solution-surface py-14 lg:py-16" containerClassName="relative z-[1]">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-[color-mix(in_oklab,var(--brand-lime),white_80%)] px-3 py-1 text-sm font-medium text-[var(--brand-green)]">
            Giải pháp PV-ERP
          </span>
        </div>
        
        {/* Title with highlighted text */}
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#123524] leading-tight break-words">
          Tối ưu - Hợp nhất - <span className="marker-lime">Hiệu quả</span>
        </h2>
        
        <p className="mt-4 text-lg text-gray-600">
          PV-ERP giúp doanh nghiệp tối ưu quy trình, hợp nhất dữ liệu, tăng hiệu
          quả và tạo bước nhảy vọt trong quản trị
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7 pv-ani-fade-up-1">
          <SolutionDetail item={active} />
        </div>

        <div className="grid gap-4 lg:col-span-5 pv-ani-fade-up-2">
          {SOLUTIONS.map((item) => (
            <SolutionOption
              key={item.key}
              item={item}
              active={active.key === item.key}
              onSelect={() => setActive(item)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
