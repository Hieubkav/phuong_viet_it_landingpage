# Homepage Blocks Dashboard

## 2025-09-29
- Tạo package chia sẻ `@pv-erp/shared` với `HOME_BLOCK_TEMPLATES` cho cả frontend/backend dùng chung.
- Thêm bộ preset/form hoàn chỉnh: `apps/web/src/components/blocks/(block-defaults|block-presets|block-form|block-templates).ts[x]` kết nối RJSF + Convex media picker.
- Dashboard trang chủ (`/dashboard/home-blocks`) hỗ trợ CRUD, reorder, bulk toggle, chèn template mặc định.
- Bổ sung `packages/backend/convex/seed.ts` (mutation `seedHome`) để khởi tạo trang + block mẫu khi chưa có dữ liệu.
- Icon dùng chung khai báo tại `apps/web/src/lib/lucide-icons.ts` (map tên icon ↔ Lucide component).
- Cập nhật layout dashboard: sidebar & topnav chỉ giữ liên kết thật (`/dashboard`, `/dashboard/home-blocks`, `/dashboard/home-blocks/new`) và trang tổng quan mới hướng dẫn quy trình.
- Frontend landing page nay render động: query `api.homepage.getHomepage`, map từng block `kind` → section tương ứng, fallback dữ liệu từ template khi thiếu.
- Khi triển khai nhớ chạy `bunx tsc --project apps/web/tsconfig.json --noEmit`, sau đó nếu sạch lỗi mới build `bun run --cwd apps/web build`.
