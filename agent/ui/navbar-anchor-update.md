# Navbar anchor mapping
- Khi thêm mục mới vào navbar landing page, cập nhật hằng `NAV` trong `apps/web/src/components/layout/site-header.tsx` bằng slug anchor tương ứng.
- Anchor fallback mặc định được định nghĩa tại `apps/web/src/app/(site)/page.tsx` trong `BLOCK_ANCHORS`; nhớ đồng bộ giá trị khi muốn menu cuộn chính xác.
- SectionAnchor sẽ auto render trừ block `quickCta`, vì vậy anchor cho CTAs cần truyền qua prop `anchorId`.
- Scroll mượt sử dụng `scrollIntoView({ behavior: "smooth" })`; giữ nguyên logic khi tái cấu trúc header.
- Navbar init kiểm tra anchor theo chu kỳ 200ms cho tới khi Convex render xong, nhớ disconnect & clearTimeout trong cleanup.
