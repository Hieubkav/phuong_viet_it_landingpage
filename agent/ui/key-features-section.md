# Key Features Section

## 2025-09-30 Update 1
- Schema block keyFeatures bỏ preset hình minh họa cố định, dùng widget mediaImage để chọn từ Media.
- Renderer kiểm tra key preset cũ để giữ SVG fallback, nếu nhập URL thì render <img> lazy với alt theo tiêu đề.
## 2025-09-30 Update 2
- isMediaUrl doi sang check prefix http/https thay regex de tranh build loi escaping.

## 2025-09-30 Update 3
- Render anh minh hoa keyFeatures voi `w-full h-auto` thay cho `max-h-48 w-full object-contain` de anh full width va giu ti le.
- Giu lazy load nhu cu, phu hop voi anh upload tu CMS.
