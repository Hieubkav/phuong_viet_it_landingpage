"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type MediaModalTab = "image" | "video";

type MediaModalContextValue = {
  open: boolean;
  initialTab: MediaModalTab;
  openModal: (tab?: MediaModalTab) => void;
  closeModal: () => void;
  setOpen: (value: boolean) => void;
};

const MediaModalContext = createContext<MediaModalContextValue | null>(null);

export function MediaModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<MediaModalTab>("image");

  const openModal = useCallback((tab: MediaModalTab = "image") => {
    setInitialTab(tab);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo<MediaModalContextValue>(
    () => ({ open, initialTab, openModal, closeModal, setOpen }),
    [open, initialTab, openModal, closeModal],
  );

  return <MediaModalContext.Provider value={value}>{children}</MediaModalContext.Provider>;
}

export function useMediaModal() {
  const context = useContext(MediaModalContext);
  if (!context) {
    throw new Error("useMediaModal must be used within MediaModalProvider");
  }
  return context;
}
