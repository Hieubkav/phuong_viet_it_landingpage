import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Brain,
  BrainCog,
  Briefcase,
  Cog,
  Factory,
  Gauge,
  GraduationCap,
  Headphones,
  Layers,
  LineChart,
  Link2,
  MessageCircle,
  PiggyBank,
  ShoppingBag,
  TrendingUp,
  Wallet,
} from "lucide-react";

export type IconKey =
  | "BarChart3"
  | "Brain"
  | "BrainCog"
  | "Briefcase"
  | "Cog"
  | "Factory"
  | "Gauge"
  | "GraduationCap"
  | "Headphones"
  | "Layers"
  | "LineChart"
  | "Link2"
  | "MessageCircle"
  | "PiggyBank"
  | "ShoppingBag"
  | "TrendingUp"
  | "Wallet";

type IconOption = {
  label: string;
  value: IconKey;
  Icon: LucideIcon;
};

export const ICON_OPTIONS: IconOption[] = [
  { value: "BarChart3", label: "Bar Chart", Icon: BarChart3 },
  { value: "Brain", label: "Brain", Icon: Brain },
  { value: "BrainCog", label: "Brain Cog", Icon: BrainCog },
  { value: "Briefcase", label: "Briefcase", Icon: Briefcase },
  { value: "Cog", label: "Cog", Icon: Cog },
  { value: "Factory", label: "Factory", Icon: Factory },
  { value: "Gauge", label: "Gauge", Icon: Gauge },
  { value: "GraduationCap", label: "Graduation Cap", Icon: GraduationCap },
  { value: "Headphones", label: "Headphones", Icon: Headphones },
  { value: "Layers", label: "Layers", Icon: Layers },
  { value: "LineChart", label: "Line Chart", Icon: LineChart },
  { value: "Link2", label: "Link 2", Icon: Link2 },
  { value: "MessageCircle", label: "Message Circle", Icon: MessageCircle },
  { value: "PiggyBank", label: "Piggy Bank", Icon: PiggyBank },
  { value: "ShoppingBag", label: "Shopping Bag", Icon: ShoppingBag },
  { value: "TrendingUp", label: "Trending Up", Icon: TrendingUp },
  { value: "Wallet", label: "Wallet", Icon: Wallet },
];

export const ICON_ONE_OF = ICON_OPTIONS.map(({ value, label }) => ({
  const: value,
  title: label,
}));

const ICON_MAP = new Map<IconKey, LucideIcon>(ICON_OPTIONS.map((item) => [item.value, item.Icon]));

export function getIconByKey(key: IconKey): LucideIcon | undefined {
  return ICON_MAP.get(key);
}
