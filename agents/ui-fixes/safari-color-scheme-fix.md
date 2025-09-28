# Sửa lỗi Color Scheme trên iPhone Safari

## Vấn đề
Web trên máy tính và Android hiển thị màu sắc ổn, nhưng trên iPhone Safari màu bị loang lỗ do tự động chuyển dark/light mode mặc dù không có thiết kế dark/light mode.

## Nguyên nhân
1. CSS có `@media (prefers-color-scheme: dark)` với `color-scheme: dark`
2. CSS có `@custom-variant dark (&:where(.dark, .dark *))`
3. CSS có các dark theme variables trong `.dark { ... }`
4. Safari trên iPhone tự động áp dụng dark mode khi hệ thống bật dark mode

## Giải pháp đã thực hiện

### 1. File `src/index.css`
- **Trước:**
```css
@custom-variant dark (&:where(.dark, .dark *));

html, body {
    @apply bg-white dark:bg-gray-950;
    
    @media (prefers-color-scheme: dark) {
        color-scheme: dark;
    }
}

.dark { /* dark theme variables */ }
```

- **Sau:**
```css
/* @custom-variant dark (&:where(.dark, .dark *)); */

html, body {
    @apply bg-white;
    color-scheme: light only;
}

/* .dark { ... } removed */
```

### 2. File `src/pv-landing.css`
- **Trước:**
```css
--brand-green-dark: #2c8a40;
--brand-blue-dark: var(--brand-green-dark);

.dark {
    /* dark theme variables */
}
```

- **Sau:**
```css
/* Dark mode completely removed */
/* --brand-green-dark: removed */
/* --brand-blue-dark: removed */
```

### 3. File `src/app/layout.tsx`
- **Thêm meta tags:**
```tsx
other: {
    'color-scheme': 'light only',
    'theme-color': '#ffffff',
},
```

## Backup files
- `src/index_backup.css` - backup của index.css
- `src/pv-landing_backup.css` - backup của pv-landing.css

## Kết quả mong đợi
- iPhone Safari sẽ không tự động chuyển dark mode
- Màu sắc hiển thị nhất quán trên tất cả thiết bị
- Chỉ sử dụng light theme duy nhất

## Test
Kiểm tra trên iPhone với:
- Safari thường
- Safari trong Private mode
- Hệ thống Dark mode bật/tắt

## Tham khảo
- [CSS color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme)
- [Safari color-scheme behavior](https://webkit.org/blog/8840/dark-mode-support-in-webkit/)
