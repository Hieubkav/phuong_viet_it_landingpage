# Challenges Solution Section

## Issue
- Tab column on the right felt too wide on desktop.
- Switching between tabs caused the main content card to change height noticeably.

## Fix
- Switched the layout to a custom two-column grid with the right column capped at 320px.
- Added `lg:min-h-[560px]` and flex layout to the detail card so content height stays consistent, with a fixed-height media area.

## Notes
- Adjust the min-height if future content grows significantly beyond the current copy.

## 2025-09-28 Update
- Reworked layout container to stack on mobile, showing tab list first and detail second.
- Tabs become a horizontal scroll list on small screens (`min-w-[240px]`, `overflow-x-auto`) for easier browsing.
- Ensured cards stretch equally on desktop with `lg:items-stretch` and `lg:shrink` overrides so both columns stay aligned.

## 2025-09-28 Update 2
- Thu nhỏ tab button: giảm min-width xuống 220px, padding `py-4` (desktop `py-5`), gap `gap-3/4`, icon container còn `h-9 w-9`.
- Giảm padding nội dung tab (`p-4`, gap 2) và icon xuống `h-4 w-4` để toàn bộ nút thấp hơn.

## 2025-09-28 Update 3
- Tăng cỡ chữ danh sách bullet trong thẻ chi tiết lên `text-base` và thêm `leading-relaxed` để nội dung nhỏ dễ đọc hơn.

## 2025-09-30 Update 4
- Cho phep tab Challenges chon anh minh hoa tu Media voi widget mediaImage thay cho danh sach preset co dinh.
- Renderer kiem tra key preset cu va giu SVG fallback, neu gia tri la URL thi render the <img> lazy.

## 2025-09-30 Update 5
- Tang 20% kich thuoc tieu de tab Giai phap: the detail chinh dung `text-[1.8rem] md:text-[2.1rem]`, nut tab dung `text-lg`.

## 2025-09-30 Update 6
- isMediaUrl doi sang check prefix http/https thay regex de tranh build loi escaping.




