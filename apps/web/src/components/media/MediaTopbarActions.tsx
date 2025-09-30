"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Folder, Image as ImageIcon, PlaySquare } from "lucide-react";
import { useMediaModal } from "./MediaModalProvider";

export function MediaTopbarActions() {
  const { openModal } = useMediaModal();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" size="sm" onClick={() => openModal("image")}>
        <ImageIcon className="mr-2 size-4" />
        Tải ảnh
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => openModal("video")}>
        <PlaySquare className="mr-2 size-4" />
        Thêm video
      </Button>
      <Button type="button" size="sm" asChild>
        <Link href="/dashboard/media" className="inline-flex items-center">
          <Folder className="mr-2 size-4" />
          Thư viện
        </Link>
      </Button>
    </div>
  );
}
