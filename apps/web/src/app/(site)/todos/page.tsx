import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pv-erp.com").replace(/\/$/, "");
const pageTitle = "Todo demo placeholder | PV-ERP";
const pageDescription =
  "Trang demo Todo chưa được kích hoạt. Thêm module Convex \"todos\" và chạy lại để sử dụng tính năng quản lý việc cần làm.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/todos",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/todos`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function TodosPage() {
  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Todo Demo Unavailable</CardTitle>
          <CardDescription>
            The backend module for todos is not configured. Remove this page or add a Convex module "todos" with queries
            and mutations, then regenerate Convex types.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This route is a placeholder to allow the app to build. Set the env <code>INCLUDE_TODOS</code> when the module
            is ready and update the sitemap accordingly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
