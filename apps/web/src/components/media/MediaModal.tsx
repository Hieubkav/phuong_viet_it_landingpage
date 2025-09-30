"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@pv-erp/backend/convex/_generated/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MediaModalTab } from "./MediaModalProvider";
import { toast } from "sonner";
import { Loader2, UploadCloud, Video as VideoIcon } from "lucide-react";

const TAB_CONFIG: { value: MediaModalTab; label: string; description: string }[] = [
  { value: "image", label: "Tải ảnh", description: "Upload ảnh, tự chuyển sang định dạng WebP." },
  { value: "video", label: "Thêm video", description: "Nhập URL video (YouTube, Vimeo, v.v.)." },
];

type MediaModalProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  initialTab: MediaModalTab;
};

export function MediaModal({ open, onOpenChange, initialTab }: MediaModalProps) {
  const [currentTab, setCurrentTab] = useState<MediaModalTab>(initialTab);

  useEffect(() => {
    if (open) {
      setCurrentTab(initialTab);
    }
  }, [open, initialTab]);

  const handleCompleted = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Quản lý media</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 border-b pb-2">
          {TAB_CONFIG.map((tab) => {
            const isActive = currentTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setCurrentTab(tab.value)}
                className={`rounded-md border px-3 py-2 text-left transition ${
                  isActive ? "border-[var(--brand-green)] bg-[var(--brand-green)]/10 text-[var(--brand-green)]" : "border-transparent bg-muted/40 text-muted-foreground hover:border-muted"
                }`}
              >
                <div className="text-sm font-semibold">{tab.label}</div>
                <div className="text-xs text-muted-foreground">{tab.description}</div>
              </button>
            );
          })}
        </div>

        <div className="pt-4">
          {currentTab === "image" ? (
            <ImageUploadPanel onCompleted={handleCompleted} />
          ) : (
            <VideoCreatePanel onCompleted={handleCompleted} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

type ImageUploadPanelProps = {
  onCompleted: () => void;
};

function ImageUploadPanel({ onCompleted }: ImageUploadPanelProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const selectFile = (next: File | null) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(next);
    setPreviewUrl(next ? URL.createObjectURL(next) : null);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files?.length) {
      selectFile(event.dataTransfer.files[0]);
    }
  };

  const onPick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.target.files?.[0];
    selectFile(next ?? null);
    event.target.value = "";
  };

  const upload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast.error("Vui lòng chọn ảnh trước");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file, file.name);
      if (title.trim()) {
        formData.append("title", title.trim());
      }

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Upload thất bại" }));
        throw new Error(error.message ?? "Upload thất bại");
      }

      toast.success("Đã tải ảnh lên thư viện");
      selectFile(null);
      setTitle("");
      onCompleted();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể tải ảnh");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={upload}>
      <div
        className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/40 p-6 text-center transition hover:border-[var(--brand-green)]"
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        role="presentation"
        onClick={() => inputRef.current?.click()}
      >
        <UploadCloud className="mb-3 size-8 text-[var(--brand-green)]" />
        <p className="text-sm font-medium">Kéo thả ảnh vào đây hoặc bấm để chọn</p>
        <p className="mt-1 text-xs text-muted-foreground">Hỗ trợ PNG, JPG, SVG... hệ thống sẽ tự chuyển sang WebP.</p>
        {file ? <p className="mt-2 text-xs text-muted-foreground">Đã chọn: {file.name}</p> : null}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
      </div>

      {previewUrl ? (
        <div className="rounded-md border bg-muted/30 p-3">
          <img src={previewUrl} alt="Preview" className="max-h-64 w-auto rounded-md object-contain" />
        </div>
      ) : null}

      <div className="grid gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="media-title">Tiêu đề (tuỳ chọn)</Label>
          <Input
            id="media-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ví dụ: Hero banner"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="ghost" onClick={() => selectFile(null)} disabled={loading}>
          Xoá lựa chọn
        </Button>
        <Button type="submit" disabled={loading || !file}>
          {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          Tải ảnh
        </Button>
      </div>
    </form>
  );
}

type VideoCreatePanelProps = {
  onCompleted: () => void;
};

function VideoCreatePanel({ onCompleted }: VideoCreatePanelProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const createVideo = useMutation(api.media.createVideo);

  const canSubmit = useMemo(() => url.trim().length > 0, [url]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) {
      toast.error("Vui lòng nhập URL video");
      return;
    }

    setLoading(true);
    try {
      await createVideo({ externalUrl: url.trim(), title: title.trim() || undefined });
      toast.success("Đã thêm video vào thư viện");
      setTitle("");
      setUrl("");
      onCompleted();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không thể thêm video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid gap-1.5">
        <Label htmlFor="video-url">URL video</Label>
        <Input
          id="video-url"
          type="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="video-title">Tiêu đề (tuỳ chọn)</Label>
        <Input
          id="video-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ví dụ: Giới thiệu sản phẩm"
        />
      </div>

      <div className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <VideoIcon className="size-4" />
          <span>Chúng tôi lưu liên kết video, không tải lên máy chủ.</span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!canSubmit || loading}>
          {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          Lưu video
        </Button>
      </div>
    </form>
  );
}
