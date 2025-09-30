"use client";

import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@pv-erp/backend/convex/_generated/api";
import type { Id } from "@pv-erp/backend/convex/_generated/dataModel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Copy,
  Edit,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Trash2,
  Video as VideoIcon,
} from "lucide-react";

const KIND_FILTERS = [
  { value: "all" as const, label: "Tất cả" },
  { value: "image" as const, label: "Ảnh" },
  { value: "video" as const, label: "Video" },
];

type MediaKind = "image" | "video";

type MediaItem = {
  _id: Id<"media">;
  kind: MediaKind;
  title?: string;
  storageId?: Id<"_storage">;
  format?: string;
  width?: number;
  height?: number;
  sizeBytes?: number;
  externalUrl?: string;
  url?: string;
  createdAt: number;
};

type TitleDialogState = {
  id: Id<"media">;
  currentTitle: string;
};

export default function MediaDashboardPage() {
  const [filter, setFilter] = useState<(typeof KIND_FILTERS)[number]["value"]>("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [titleDialog, setTitleDialog] = useState<TitleDialogState | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [updatingTitle, setUpdatingTitle] = useState(false);

  const args = useMemo(() => (filter === "all" ? {} : { kind: filter }), [filter]);
  const media = useQuery(api.media.list, args as { kind?: MediaKind });

  const remove = useMutation(api.media.remove);
  const forceRemove = useMutation(api.media.forceRemove);
  const update = useMutation(api.media.update);

  const isSelected = (id: Id<"media">) => selected.includes(String(id));

  const toggleOne = (id: Id<"media">, checked: boolean) => {
    setSelected((prev) => {
      const strId = String(id);
      if (checked) {
        return prev.includes(strId) ? prev : [...prev, strId];
      }
      return prev.filter((item) => item !== strId);
    });
  };

  const toggleAll = (checked: boolean) => {
    if (!media) return;
    const ids = media.map((item) => String(item._id));
    setSelected((prev) => (checked ? Array.from(new Set([...prev, ...ids])) : prev.filter((item) => !ids.includes(item))));
  };

  const handleCopy = async (item: MediaItem) => {
    const value = item.kind === "video" ? item.externalUrl : item.url;
    if (!value) {
      toast.error("Không tìm thấy URL để sao chép");
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Đã sao chép URL vào clipboard");
    } catch (_error) {
      toast.error("Trình duyệt không cho sao chép tự động");
    }
  };

  const handleRemove = async (id: Id<"media">) => {
    try {
      const res = await remove({ id });
      if (!(res as any)?.ok) {
        throw new Error("remove failed");
      }
      toast.success("Đã xoá media");
    } catch (_error) {
      try {
        const resForce = await forceRemove({ id });
        if (!(resForce as any)?.ok) {
          throw new Error("force remove failed");
        }
        toast.message("Storage lỗi, đã xoá bản ghi media");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Không thể xoá media");
      }
    }
  };

  const handleBulkRemove = async () => {
    if (!selected.length) return;
    const ids = [...selected];
    setSelected([]);
    for (const id of ids) {
      await handleRemove(id as unknown as Id<"media">);
    }
  };

  const openTitleDialog = (item: MediaItem) => {
    setTitleDialog({ id: item._id, currentTitle: item.title ?? "" });
    setTitleInput(item.title ?? "");
  };

  const submitTitle = async () => {
    if (!titleDialog) return;
    setUpdatingTitle(true);
    try {
      await update({ id: titleDialog.id, title: titleInput.trim() || undefined });
      toast.success("Đã cập nhật tiêu đề");
      setTitleDialog(null);
      setTitleInput("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể cập nhật tiêu đề");
    } finally {
      setUpdatingTitle(false);
    }
  };

  const selectedCount = selected.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Thư viện media</h1>
        <p className="mt-1 text-sm text-muted-foreground">Quản lý ảnh và video dùng cho trang chủ.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle className="text-xl font-semibold">Danh sách media</CardTitle>
            <Separator orientation="vertical" className="hidden h-5 md:inline-flex" />
            <div className="flex flex-wrap gap-2 text-sm">
              {KIND_FILTERS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={filter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Đã chọn: {selectedCount}</span>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleBulkRemove}
                disabled={selectedCount === 0}
              >
                <Trash2 className="mr-2 size-4" />
                Xoá đã chọn
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!media && <div className="text-sm text-muted-foreground">Đang tải dữ liệu...</div>}
          {media && media.length === 0 && <div className="text-sm text-muted-foreground">Chưa có media nào.</div>}
          {media && media.length > 0 && (
            <MediaTable
              items={media}
              isSelected={isSelected}
              toggleOne={toggleOne}
              toggleAll={toggleAll}
              onCopy={handleCopy}
              onRemove={handleRemove}
              onEditTitle={openTitleDialog}
            />
          )}
        </CardContent>
      </Card>

      <TitleDialog
        state={titleDialog}
        value={titleInput}
        onChange={setTitleInput}
        onClose={() => setTitleDialog(null)}
        onSubmit={submitTitle}
        submitting={updatingTitle}
      />
    </div>
  );
}

type MediaTableProps = {
  items: MediaItem[];
  isSelected: (id: Id<"media">) => boolean;
  toggleOne: (id: Id<"media">, checked: boolean) => void;
  toggleAll: (checked: boolean) => void;
  onCopy: (item: MediaItem) => void;
  onRemove: (id: Id<"media">) => Promise<void>;
  onEditTitle: (item: MediaItem) => void;
};

function MediaTable({ items, isSelected, toggleOne, toggleAll, onCopy, onRemove, onEditTitle }: MediaTableProps) {
  const allSelected = items.length > 0 && items.every((item) => isSelected(item._id));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead>
          <tr className="bg-muted/40 text-left">
            <th className="w-12 px-3 py-2">
              <Checkbox checked={allSelected} onCheckedChange={(value) => toggleAll(value === true)} aria-label="Chọn tất cả" />
            </th>
            <th className="w-20 px-3 py-2">Preview</th>
            <th className="px-3 py-2">Thông tin</th>
            <th className="w-48 px-3 py-2">Chi tiết</th>
            <th className="w-64 px-3 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {items.map((item) => (
            <tr key={String(item._id)} className="align-top">
              <td className="px-3 py-3">
                <Checkbox
                  checked={isSelected(item._id)}
                  onCheckedChange={(value) => toggleOne(item._id, value === true)}
                  aria-label="Chọn media"
                />
              </td>
              <td className="px-3 py-3">
                <MediaPreview item={item} />
              </td>
              <td className="px-3 py-3">
                <div className="font-medium">{item.title || "(Chưa đặt tên)"}</div>
                <div className="text-xs text-muted-foreground">ID: {String(item._id)}</div>
                <div className="text-xs text-muted-foreground">Tạo lúc: {formatDate(item.createdAt)}</div>
              </td>
              <td className="px-3 py-3 text-xs text-muted-foreground">
                {item.kind === "image" ? (
                  <div className="space-y-1">
                    <div>Định dạng: {item.format ?? "webp"}</div>
                    <div>Kích thước: {item.width && item.height ? `${item.width}×${item.height}px` : "Không rõ"}</div>
                    <div>Dung lượng: {formatBytes(item.sizeBytes)}</div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div>Loại: Video</div>
                    <div className="truncate text-xs text-blue-600">{item.externalUrl}</div>
                  </div>
                )}
              </td>
              <td className="px-3 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => onCopy(item)}>
                    <Copy className="mr-2 size-4" /> Sao chép URL
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => onEditTitle(item)}>
                    <Edit className="mr-2 size-4" /> Đổi tên
                  </Button>
                  {item.kind === "image" ? <ReplaceButton media={item} /> : null}
                  <Button type="button" variant="destructive" size="sm" onClick={() => onRemove(item._id)}>
                    <Trash2 className="mr-2 size-4" /> Xoá
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MediaPreview({ item }: { item: MediaItem }) {
  if (item.kind === "video") {
    return (
      <div className="flex h-14 w-20 items-center justify-center rounded-md border bg-muted/40 text-muted-foreground">
        <VideoIcon className="size-5" />
      </div>
    );
  }

  if (item.url) {
    return <img src={item.url} alt={item.title ?? "image"} className="h-14 w-20 rounded-md object-cover" />;
  }

  return (
    <div className="flex h-14 w-20 items-center justify-center rounded-md border bg-muted/40 text-muted-foreground">
      <ImageIcon className="size-5" />
    </div>
  );
}

function ReplaceButton({ media }: { media: MediaItem }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", String(media._id));
      formData.append("file", file, file.name);
      const response = await fetch("/api/media/replace", { method: "POST", body: formData });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Thay ảnh thất bại" }));
        throw new Error(error.message ?? "Thay ảnh thất bại");
      }
      toast.success("Đã thay ảnh thành công");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể thay ảnh");
    } finally {
      setLoading(false);
    }
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await execute(file);
    event.target.value = "";
  };

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
      <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={loading}>
        {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <RefreshCw className="mr-2 size-4" />}
        Thay ảnh
      </Button>
    </>
  );
}

type TitleDialogProps = {
  state: TitleDialogState | null;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
  submitting: boolean;
};

function TitleDialog({ state, value, onChange, onClose, onSubmit, submitting }: TitleDialogProps) {
  return (
    <Dialog open={!!state} onOpenChange={(open) => (!open ? onClose() : null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đổi tên media</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Nhập tiêu đề" autoFocus />
          <div className="text-xs text-muted-foreground">Bỏ trống nếu bạn muốn xoá tiêu đề.</div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
            Huỷ
          </Button>
          <Button type="button" onClick={onSubmit} disabled={submitting}>
            {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function formatDate(timestamp: number) {
  try {
    return new Date(timestamp).toLocaleString("vi-VN");
  } catch (_error) {
    return "--";
  }
}

function formatBytes(bytes?: number) {
  if (!bytes || Number.isNaN(bytes)) return "Không rõ";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}
