# Dashboard Media Module

- Backend (`packages/backend/convex/media.ts`)
  - Soft delete bằng `deletedAt`, sử dụng index `by_kind` và `by_deleted`.
  - `saveImage`, `replaceImage` luôn `try/catch` khi xóa storage để tránh lỗi blob missing.
  - `list` trả về `url` cho ảnh, sắp xếp desc theo `createdAt`.
- API Next (`apps/web/src/app/api/media/[upload|replace]/route.ts`)
  - Nhận form-data, convert ảnh sang WebP bằng `sharp`, đẩy lên Convex storage, sau đó gọi mutation tương ứng.
  - Validate dung lượng 10MB, phản hồi JSON `{ ok, message }`.
- Dashboard UI (`apps/web/src/app/(dashboard)/dashboard/media/page.tsx`)
  - Bảng danh sách với filter theo kind, bulk select, copy URL, đổi tên, thay ảnh (gọi `/api/media/replace`) và soft delete.
  - `forceRemove` fallback khi xóa storage thất bại.
- Global modal (`apps/web/src/components/media`) và provider gắn trong layout `(dashboard)`
  - `MediaTopbarActions` mở modal để tải ảnh/đăng ký video.
  - `MediaModal` upload ảnh qua API và tạo video link, đóng modal sau khi thao tác thành công.
- Khi phát triển nhớ chạy `bunx tsc --project apps/web/tsconfig.json --noEmit` trước, chỉ build khi được yêu cầu.
