"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@pv-erp/backend/convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { BlockForm, formSupportedKinds, hasBlockSchema } from "@/components/blocks/block-form";
import { getTemplate } from "@/components/blocks/block-templates";

export default function HomeBlockCreatePage() {
  const router = useRouter();

  const page = useQuery(api.pages.getBySlug, { slug: "home" });
  const blocks = useQuery(
    api.pageBlocks.getForPage,
    page?._id ? { pageId: page._id as any } : "skip",
  );
  const create = useMutation(api.pageBlocks.create);

  const kinds = formSupportedKinds();
  const [kind, setKind] = useState<string>(kinds[0] ?? "hero");
  const [mode, setMode] = useState<"form" | "json">("json");
  const [formData, setFormData] = useState<any>(() => getTemplate(kinds[0] ?? "") || {});
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(getTemplate(kinds[0] ?? "") || {}, null, 2),
  );
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    const tpl = getTemplate(kind) || {};
    setFormData(tpl);
    setJsonText(JSON.stringify(tpl, null, 2));
    setMode(hasBlockSchema(kind) ? "form" : "json");
  }, [kind]);

  const nextOrder = useMemo(() => blocks?.length ?? 0, [blocks?.length]);

  async function onCreate() {
    if (!page?._id) {
      toast.error("Chưa có trang 'home'");
      return;
    }

    try {
      const data = mode === "form" ? formData ?? {} : JSON.parse(jsonText || "{}");
      const result = await create({
        pageId: page._id as any,
        kind,
        order: nextOrder,
        isVisible,
        active,
        data,
      } as any);

      toast.success("Đã tạo block");

      if (result?._id) {
        router.push(`/dashboard/home-blocks/${String(result._id)}`);
      } else {
        router.push(`/dashboard/home-blocks`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể tạo block. Kiểm tra JSON hoặc dữ liệu.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/home-blocks">
            <ArrowLeft className="size-4" /> Quay lại
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Tạo block mới</h1>
        <div className="ms-auto flex items-center gap-1 rounded border p-1">
          <Button
            type="button"
            size="sm"
            variant={mode === "form" ? "default" : "ghost"}
            onClick={() => setMode("form")}
            disabled={!hasBlockSchema(kind)}
          >
            Form
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "json" ? "default" : "ghost"}
            onClick={() => setMode("json")}
          >
            JSON
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Thông tin block</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="kind">Kind</Label>
              <select
                id="kind"
                className="flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none selection:bg-primary selection:text-primary-foreground md:text-sm"
                value={kind}
                onChange={(event) => setKind(event.target.value)}
              >
                {kinds.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="visible"
                checked={isVisible}
                onCheckedChange={() => setIsVisible((prev) => !prev)}
              />
              <Label htmlFor="visible">Visible</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="active" checked={active} onCheckedChange={() => setActive((prev) => !prev)} />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="space-y-1">
              <Label>Order kế tiếp</Label>
              <Input value={nextOrder} readOnly />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const tpl = getTemplate(kind) || {};
                setFormData(tpl);
                setJsonText(JSON.stringify(tpl, null, 2));
                toast.success("Đã chèn template mặc định");
              }}
            >
              <Lightbulb className="mr-1 size-4" /> Chèn template
            </Button>
            {mode === "json" && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  try {
                    const parsed = JSON.parse(jsonText || "{}");
                    setFormData(parsed);
                    toast.success("Đã áp dụng JSON vào form");
                  } catch {
                    toast.error("JSON không hợp lệ");
                  }
                }}
              >
                Áp dụng JSON vào form
              </Button>
            )}
          </div>

          {mode === "form" ? (
            <BlockForm
              kind={kind}
              value={formData}
              onChange={(value) => {
                setFormData(value);
                setJsonText(JSON.stringify(value ?? {}, null, 2));
              }}
            />
          ) : (
            <div className="space-y-2">
              <Label htmlFor="json">JSON</Label>
              <Textarea
                id="json"
                className="min-h-[420px] font-mono text-sm"
                value={jsonText}
                onChange={(event) => setJsonText(event.target.value)}
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={onCreate}>Tạo block</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
