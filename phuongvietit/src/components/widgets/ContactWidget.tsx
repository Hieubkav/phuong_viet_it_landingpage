"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Phone, MessageCircle, MessagesSquare } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  phoneNumber: string; // "0706780790"
  zaloUrl: string; // "https://zalo.me/0706780790"
  messengerUrl: string; // "https://m.me/phuongvietit.vn"
  position?: "br" | "bl";
  className?: string;
};

export default function ContactWidget({
  phoneNumber,
  zaloUrl,
  messengerUrl,
  position = "br",
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const isBR = position === "br";
  const basePos = isBR
    ? "right-4 md:right-6 bottom-4 md:bottom-6"
    : "left-4 md:left-6 bottom-4 md:bottom-6";

  return (
    <TooltipProvider delayDuration={150}>
      <div className={cn("fixed z-[70] select-none", basePos, className)}>
        {/* child buttons */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          {/* Phone */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={`tel:${phoneNumber}`}
                className={cn(
                  "pointer-events-auto absolute grid h-12 w-12 place-items-center rounded-full",
                  "bg-[var(--brand-green)] text-white shadow-lg ring-1 ring-black/5",
                  "transition-all duration-300",
                  open
                    ? "translate-y-[-64px] opacity-100"
                    : "translate-y-0 opacity-0"
                )}
                title="Gọi điện"
              >
                <Phone className="h-5 w-5" />
                <span className="sr-only">Gọi {phoneNumber}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side={isBR ? "left" : "right"}>
              Gọi điện
            </TooltipContent>
          </Tooltip>

          {/* Zalo (dùng icon MessagesSquare của lucide) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "pointer-events-auto absolute grid h-12 w-12 place-items-center rounded-full",
                  "bg-white text-[var(--brand-green)] shadow-lg ring-1 ring-black/5",
                  "transition-all duration-300",
                  open
                    ? "translate-y-[-116px] opacity-100"
                    : "translate-y-0 opacity-0"
                )}
                title="Zalo"
              >
                <MessagesSquare className="h-5 w-5" />
                <span className="sr-only">Zalo</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side={isBR ? "left" : "right"}>Zalo</TooltipContent>
          </Tooltip>

          {/* Messenger (dùng icon MessageCircle của lucide) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "pointer-events-auto absolute grid h-12 w-12 place-items-center rounded-full",
                  "bg-white text-[#0084ff] shadow-lg ring-1 ring-black/5",
                  "transition-all duration-300",
                  open
                    ? "translate-y-[-168px] opacity-100"
                    : "translate-y-0 opacity-0"
                )}
                title="Messenger"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Messenger</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side={isBR ? "left" : "right"}>
              Messenger
            </TooltipContent>
          </Tooltip>
        </div>

        {/* FAB */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Hỗ trợ liên hệ nhanh"
          className={cn(
            "relative grid h-14 w-14 place-items-center rounded-full text-white",
            "bg-[linear-gradient(135deg,var(--brand-green),var(--brand-lime))]",
            "shadow-xl ring-1 ring-black/5 transition active:scale-95"
          )}
        >
          <Phone className={cn("h-6 w-6 transition", open && "rotate-45")} />
          <span
            className={cn(
              "absolute inset-0 rounded-full",
              "motion-safe:animate-[ping_2s_ease-in-out_infinite]",
              "bg-[var(--brand-green)] opacity-20"
            )}
            aria-hidden
          />
        </button>
      </div>
    </TooltipProvider>
  );
}
