"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@pv-erp/backend/convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { BlockForm, hasBlockSchema } from "@/components/blocks/block-form";
import { getTemplate } from "@/components/blocks/block-templates";

export function HomeBlockEditor({ id }: { id: string }) {
  const router = useRouter();
  const block = useQuery(api.pageBlocks.getById, id ? { id: id as any } : "skip");
  const update = useMutation(api.pageBlocks.update);
  const remove = useMutation(api.pageBlocks.remove);

  const [mode, setMode] = useState<"form" | "json">("form");
  const [formData, setFormData] = useState<any>({});
  const [jsonText, setJsonText] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    if (!block?._id) return;
    const data = block.data ?? {};
    setFormData(data);
    setJsonText(JSON.stringify(data, null, 2));
    setIsVisible(!!block.isVisible);
    setActive(!!block.active);
    setMode(hasBlockSchema(block.kind) ? "form" : "json");
  }, [block?._id, block?.kind, block?.data, block?.isVisible, block?.active]);

  async function onSave() {
    if (!block?._id) return;
    try {
      const data = mode === "form" ? formData ?? {} : JSON.parse(jsonText || "{}");
      await update({ id: block._id as any, data, isVisible, active });
      toast.success("Đã lưu block");
    } catch (error) {
      console.error(error);
      toast.error("Không thể lưu. Kiểm tra JSON hoặc dữ liệu.");
    }
  }

  async function onDelete() {
    if (!block?._id) return;
    try {
      await remove({ id: block._id as any });
      toast.success("Đã xóa block");
      router.push("/dashboard/home-blocks");
    } catch (error) {
      console.error(error);
      toast.error("Không thể xóa block");
    }
  }

  if (!block) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/home-blocks">
              <ArrowLeft className="size-4" /> Quay lại
            </Link>
          </Button>
          <div className="text-sm text-muted-foreground">Đang tải…</div>
        </div>
      </div>
    );
  }

  if (block === null) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/home-blocks">
            <ArrowLeft className="size-4" /> Quay lại
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Không tìm thấy block</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/home-blocks">
            <ArrowLeft className="size-4" /> Quay lại
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Chỉnh sửa block</h1>
        <div className="ms-auto flex items-center gap-1 rounded border p-1">
          <Button
            type="button"
            size="sm"
            variant={mode === "form" ? "default" : "ghost"}
            onClick={() => setMode("form")}
            disabled={!hasBlockSchema(block.kind)}
            title={hasBlockSchema(block.kind) ? "Dùng giao diện form" : "Kind này chưa có form"}
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
          <CardTitle className="text-base">Kind: {block.kind}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const tpl = getTemplate(block.kind);
                if (!tpl) {
                  toast.message("Chưa có template cho kind này");
                  return;
                }
                setFormData(tpl);
                setJsonText(JSON.stringify(tpl, null, 2));
              }}
            >
              <Lightbulb className="mr-1 size-4" /> Chèn template
            </Button>
            {mode === "json" && hasBlockSchema(block.kind) && (
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
              kind={block.kind}
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

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button variant="destructive" onClick={onDelete}>
              Xóa block
            </Button>
            <Button onClick={onSave}>Lưu thay đổi</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
