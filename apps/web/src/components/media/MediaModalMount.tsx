"use client";

import { MediaModal } from "./MediaModal";
import { useMediaModal } from "./MediaModalProvider";

export function MediaModalMount() {
  const { open, setOpen, initialTab } = useMediaModal();
  return <MediaModal open={open} onOpenChange={setOpen} initialTab={initialTab} />;
}
