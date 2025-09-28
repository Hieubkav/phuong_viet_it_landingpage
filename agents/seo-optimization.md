# SEO Optimization - PV-ERP Website

## Tổng quan
Đã thực hiện tối ưu hóa SEO toàn diện cho website PV-ERP, bao gồm việc thay đổi branding từ "dohy" sang "PV-ERP" và cải thiện metadata.

## Công việc đã thực hiện

### 1. Thay đổi Branding (dohy → PV-ERP)
- **apps/web/src/app/layout.tsx**: Cập nhật metadata title và description
- **README.md**: Đổi tiêu đề dự án và cấu trúc thư mục
- **packages/backend/package.json**: Đổi tên package từ "@dohy/backend" thành "@pv-erp/backend"
- **package.json**: Đổi tên project và scripts turbo
- **apps/web/package.json**: Cập nhật dependency reference

### 2. Cấu hình Favicon và Icons
- Sử dụng `/logo.png` (đã có sẵn trong public folder)
- Xóa `favicon.ico` cũ trong app directory
- Cấu hình icons trong metadata: icon, shortcut, apple

### 3. Open Graph và Twitter Cards
- **og:title**: "PV-ERP | Hệ thống ERP toàn diện cho doanh nghiệp"
- **og:description**: "PV-ERP - Giải pháp quản lý doanh nghiệp toàn diện, tích hợp quản lý bán hàng, kho hàng, nhân sự và tài chính"
- **og:image**: `/logo.png`
- **og:type**: website
- **Twitter card**: summary_large_image

### 4. SEO Files
- **robots.txt**: Tạo file robots.txt cơ bản với sitemap reference
- **sitemap.xml**: Tạo sitemap bao gồm các routes chính:
  - Homepage (/)
  - Dashboard (/dashboard)
  - Todos (/todos) 
  - Units (/units)
  - Docs (/docs)

### 5. Metadata Base
- Cấu hình metadataBase: `https://pv-erp.com`

## Files đã thay đổi
```
├── apps/web/src/app/layout.tsx (metadata update)
├── apps/web/package.json (dependency update)
├── apps/web/public/robots.txt (new)
├── apps/web/public/sitemap.xml (new)
├── apps/web/src/app/favicon.ico (deleted)
├── packages/backend/package.json (package name)
├── package.json (project name, scripts)
└── README.md (project title, structure)
```

## Lưu ý cho lần sau
- Khi có route mới, nhớ cập nhật sitemap.xml
- Domain trong metadata và sitemap cần được cập nhật khi deploy production
- Logo.png đã tối ưu kích thước (298KB) phù hợp cho web và SEO
- Bun.lock sẽ tự động cập nhật khi chạy lệnh install tiếp theo

## Kiểm tra
Sau khi deployment, nên kiểm tra:
- [ ] Google Search Console để submit sitemap
- [ ] Meta tags debugging tools (Facebook, Twitter)
- [ ] Google PageSpeed Insights
- [ ] Structured data testing (nếu cần)
