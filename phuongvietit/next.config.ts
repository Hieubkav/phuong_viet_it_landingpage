// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // GH Pages không có Image Optimizer
  basePath: isProd ? "/phuongvietit" : "",
  assetPrefix: isProd ? "/phuongvietit/" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/phuongvietit" : "",
  },
};

export default nextConfig;
