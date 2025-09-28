# ERP Preview Section

## Issue
- Icon container quá lớn khiến grid trông nặng và chiếm nhiều diện tích.

## Fix
- Giảm kích thước khung icon xuống `h-16 w-16`, chuyển bo góc về `rounded-2xl`.
- Thu nhỏ ảnh icon còn `h-12 w-12` và giảm khoảng cách quanh (gap 3) để bố cục tinh gọn hơn.

## Notes
- Nếu cần nhấn mạnh icon hơn trong tương lai có thể dùng hiệu ứng hover thay vì tăng kích thước.

## 2025-09-28 Update 2
- Giữ khung icon gọn nhưng tăng kích thước icon lên `h-14 w-14` để giảm viền trắng và đảm bảo icon nổi bật.


## 2025-09-28 Update 3
- Thu nhỏ viền gradient còn `h-[60px] w-[60px]` và set icon gần full khung `h-[58px] w-[58px]` để icon lớn mà không chiếm quá nhiều khoảng trống.

