# Ghi chú SEO - 2025-12-01

- Cập nhật `apps/web/src/app/layout.tsx`: đặt `lang="vi"`, giới hạn `description` 132/160 ký tự, sửa title/keywords tiếng Việt, dùng ảnh OG/Twitter tuyệt đối `https://pv-erp.com/logo.png`, chèn JSON-LD `Organization` (name/url/logo/description/areaServed) vào `<head>`.
- Thêm `apps/web/src/app/sitemap.ts`: BASE_URL `https://pv-erp.com`, liệt kê `/` và `/todos`, tự quét `content/docs/*.mdx` để sinh các URL docs, `lastModified` lấy từ `fs.statSync`, nếu thiếu file thì fallback `new Date()`.
- Nhớ kiểm tra bằng `bunx tsc --project apps/web/tsconfig.json --noEmit` rồi `bun run --cwd apps/web build` khi cần xác nhận build (không tự chạy vì mất thời gian).
