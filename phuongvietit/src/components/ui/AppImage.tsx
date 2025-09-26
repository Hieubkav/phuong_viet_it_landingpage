// src/components/ui/AppImage.tsx
import Image, { ImageProps } from "next/image";
import { withBasePath } from "@/utils/path";

export default function AppImage({
  alt = "",
  src,
  unoptimized = true,
  ...rest
}: ImageProps) {
  const resolved = typeof src === "string" ? withBasePath(src) : src;
  return <Image alt={alt} src={resolved} unoptimized={unoptimized} {...rest} />;
}
