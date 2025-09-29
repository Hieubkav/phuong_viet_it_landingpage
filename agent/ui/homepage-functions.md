# Homepage Editable Functions

## 2025-09-29
- Thêm API Convex tối giản:
  - `packages/backend/convex/settings.ts`: getAll/getByKey/upsert.
  - `packages/backend/convex/pages.ts`: getBySlug/upsert.
  - `packages/backend/convex/pageBlocks.ts`: getById/getForPage/create/update/remove/reorder/toggleVisibility/bulkToggleVisibility.
  - `packages/backend/convex/media.ts`: generateUploadUrl/saveImage/createVideo/list/remove/update/replaceImage/getImageUrl/forceRemove.
- Tất cả tuân thủ index `by_key`, `by_slug`, `by_page_order`, `by_kind` để tránh `.filter` theo `convex_rule.md`.
- Reorder/bulk toggle giữ KISS: patch vòng lặp, không tính step.
- Media API trả lại URL tạm cho ảnh nếu blob còn tồn tại; xử lý an toàn khi blob thiếu.
