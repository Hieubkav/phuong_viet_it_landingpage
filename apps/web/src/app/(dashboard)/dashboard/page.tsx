export const dynamic = "force-static";

import Link from "next/link";
import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const quickLinks = [
  {
    title: "Blocks trang chủ",
    description: "Quản lý nội dung, bật/tắt và sắp xếp thứ tự block của landing page.",
    href: "/dashboard/home-blocks",
    action: "Quản lý block",
    Icon: Layers,
  },
  {
    title: "Tạo block",
    description: "Khởi tạo block mới từ preset hoặc JSON tùy chỉnh.",
    href: "/dashboard/home-blocks/new",
    action: "Tạo block mới",
    Icon: Plus,
  },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trang quản trị nội dung</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Từ đây bạn có thể chỉnh sửa toàn bộ giao diện trang chủ PV-ERP. Chọn hành động phù hợp bên dưới để bắt đầu.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map(({ title, description, href, action, Icon }) => (
          <Card key={title} className="h-full border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Icon className="size-4 text-primary" />
                {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={href}>{action}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Lưu ý quy trình</CardTitle>
          <CardDescription>
            Một vài bước quan trọng để đồng bộ dữ liệu giữa dashboard và giao diện landing page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Nếu trang "home" chưa có dữ liệu, dùng nút <span className="font-medium">"Khởi tạo dữ liệu mẫu"</span> trong màn hình
              Blocks để chạy mutation <code>seedHome</code>.
            </li>
            <li>
              Khi tạo hoặc chỉnh sửa block, tab Form sẽ hiển thị auto từ preset; tab JSON vẫn hỗ trợ các trường tuỳ chỉnh nâng cao.
            </li>
            <li>
              Sau khi hoàn tất thay đổi, nhớ chạy <code>bunx tsc --project apps/web/tsconfig.json --noEmit</code> rồi
              <code> bun run --cwd apps/web build</code> trước khi deploy.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
