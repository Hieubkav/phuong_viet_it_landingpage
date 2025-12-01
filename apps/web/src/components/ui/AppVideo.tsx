// src/components/ui/AppVideo.tsx
import { withBasePath } from "@/utils/path";

type Source = { src: string; type: string };

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  sources: Source[];
  decorative?: boolean;
};

export default function AppVideo({
  sources,
  poster,
  decorative = false,
  preload,
  ...rest
}: Props) {
  const posterUrl = poster ? withBasePath(poster) : undefined;

  return (
    <video
      poster={posterUrl}
      playsInline
      preload={preload ?? "metadata"}
      {...(decorative ? { "aria-hidden": true } : {})}
      {...rest}
    >
      {sources.map((s, i) => (
        <source key={i} src={withBasePath(s.src)} type={s.type} />
      ))}
      Trình duyệt của bạn không hỗ trợ video.
    </video>
  );
}
