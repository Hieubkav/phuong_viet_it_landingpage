# Homepage Editable Schema

## 2025-09-29
- Điều chỉnh `packages/backend/convex/schema.ts` theo phiên bản KISS đã dùng ở dự án mẫu.
- Bảng `settings`: `key`, `value`, `updatedAt` + index `by_key`.
- Bảng `pages`: `slug`, `title`, `active`, `updatedAt`, `seoOverride` (optional object) + index `by_slug`.
- Bảng `page_blocks`: `pageId`, `kind`, `order`, `isVisible`, `active`, `data`, `locale?`, `updatedAt`, `updatedBy?` + index `by_page_order`, `by_page_kind`.
- Bảng `media`: phân loại `image|video`, metadata tùy chọn, theo dõi `deletedAt` để soft delete + index `by_kind`, `by_deleted`.
- Những bảng khác sẽ bổ sung khi cần, tránh dư thừa để giữ tốc độ triển khai CRUD.
