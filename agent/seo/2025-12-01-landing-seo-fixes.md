# Ghi chú SEO landing page 2025-12-01

- Tách `apps/web/src/app/(site)/page.tsx` thành server wrapper + `landing-page.client.tsx` để khai báo `metadata` riêng (title/description/OG/Twitter) và vẫn dùng Convex client.
- Luôn render `FALLBACK_BLOCKS` khi chưa có dữ liệu hoặc danh sách block rỗng => đảm bảo H1 từ Hero luôn xuất hiện, tránh fallback chỉ còn H2.
- Bổ sung CTA mặc định dẫn tới `/docs` trong Hero và thêm các liên kết nội bộ ở footer (trang chủ, docs, todos) để tăng internal linking.
- Thêm metadata + robots cho `/todos` (noindex) và biến môi trường `INCLUDE_TODOS` trong `sitemap.ts` để dễ loại bỏ trang placeholder khỏi sitemap.
- Xóa `apps/web/public/sitemap.xml` tĩnh; sitemap giờ dùng `sitemap.ts` với `NEXT_PUBLIC_SITE_URL` fallback.
- Chèn JSON-LD (Product, LocalBusiness, FAQPage, BreadcrumbList) vào `apps/web/src/app/layout.tsx` bên cạnh Organization.
- Sửa alt text biểu tượng Zalo/Messenger trong `ContactWidget` và đặt `preload` mặc định `metadata` cho `AppVideo` để nhẹ hơn ở hero.

Nhớ chạy `bunx tsc --project apps/web/tsconfig.json --noEmit` rồi (nếu cần) `bun run --cwd apps/web build` khi review xong.
