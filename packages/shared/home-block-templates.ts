export const HOME_BLOCK_TEMPLATES = {
  hero: {
    title: "ERP Phương Việt – ERP Cần Thơ, ERP ĐBSCL trên nền Odoo",
    highlight: "ERP Cần Thơ",
    subtitle: "Giải pháp ERP Cần Thơ (Phần mềm ERP Cần Thơ) dựa trên Odoo Cần Thơ và Odoo ĐBSCL, tối ưu quản trị doanh nghiệp Cần Thơ, mở rộng toàn ĐBSCL. Phần mềm ERP ĐBSCL linh hoạt cho bán hàng, kho, tài chính, nhân sự.",
    video: {
      src: "/video_homepage.webm",
      poster: "/hero-fallback.svg",
    },
    ctas: [
      {
        label: "Liên hệ nhận tư vấn ngay",
        href: "tel:0852949258",
        variant: "primary",
      },
    ],
    stats: [
      { value: "100%", label: "TUỲ CHỈNH" },
      { value: "10+", label: "CHUYÊN GIA" },
      { value: "24/7", label: "HỖ TRỢ" },
    ],
  },
  painPoints: {
    badge: "Thách thức - Khó khăn",
    title: "Vấn đề doanh nghiệp",
    highlight: "gặp phải",
    description:
      "Doanh nghiệp Cần Thơ/ĐBSCL thường gặp nút thắt vận hành, thiếu dữ liệu thời gian thực khi chưa có giải pháp ERP Cần Thơ phù hợp, làm chậm tăng trưởng bền vững",
    cards: [
      {
        icon: "Link2",
        title: "Quản lý rời rạc",
        description:
          "Hệ thống tách biệt, quy trình đứt gãy khiến dữ liệu không liền mạch.",
      },
      {
        icon: "PiggyBank",
        title: "Chi phí khó kiểm soát",
        description: "Vốn bị giam, chi phí phát sinh và vòng quay tồn kho chậm.",
      },
      {
        icon: "BarChart3",
        title: "Báo cáo chậm trễ",
        description: "Thiếu số liệu thời gian thực nên quyết định luôn bị chậm trễ.",
      },
      {
        icon: "Brain",
        title: "Quyết định cảm tính",
        description: "Thiếu KPI minh bạch khiến lãnh đạo phải dựa vào cảm tính.",
      },
    ],
  },
  challenges: {
    badge: "Giải pháp PV-ERP",
    title: "Tối ưu - Hợp nhất - Hiệu quả",
    highlight: "Hiệu quả",
    description:
      "PV-ERP (ERP Phương Việt) là phần mềm ERP ĐBSCL hợp nhất quy trình, nâng hiệu quả quản trị doanh nghiệp Cần Thơ và toàn vùng",
    tabs: [
      {
        key: "integration",
        icon: "Layers",
        title: "Hợp nhất quy trình",
        summary: "Một nền tảng xuyên suốt các phòng ban và chi nhánh.",
        description:
          "PV-ERP kết nối dữ liệu giữa bán hàng, kho, kế toán và vận hành để loại bỏ các điểm tắc nghẽn thủ công, đảm bảo thông tin luôn đồng nhất.",
        points: [
          "Luồng phê duyệt tự động theo vai trò",
          "Đồng bộ tồn kho và trạng thái đơn hàng thời gian thực",
          "Kho dữ liệu tập trung, dễ dàng truy vấn",
        ],
        media: "nodesFlow",
      },
      {
        key: "finance",
        icon: "Wallet",
        title: "Kiểm soát tài chính",
        summary: "Theo dõi chi phí, dòng tiền và công nợ tức thời.",
        description:
          "Bảng điều khiển tài chính của PV-ERP giúp doanh nghiệp chủ động ngân sách, cảnh báo vượt chi và quản lý công nợ chính xác tới từng hóa đơn.",
        points: [
          "Tổng hợp thu chi theo dự án và trung tâm chi phí",
          "Dự báo dòng tiền dựa trên kế hoạch thu - chi",
          "Báo cáo công nợ đa chiều cho nhà cung cấp và khách hàng",
        ],
        media: "donutCashflow",
      },
      {
        key: "reporting",
        icon: "Gauge",
        title: "Dashboard thời gian thực",
        summary: "Ra quyết định nhanh với chỉ số cập nhật liên tục.",
        description:
          "Hệ thống báo cáo trực quan giúp lãnh đạo theo dõi KPI, cảnh báo bất thường và so sánh hiệu suất theo thời gian chỉ bằng vài cú nhấp chuột.",
        points: [
          "Thư viện báo cáo KPI theo từng phòng ban",
          "Cảnh báo email / chat khi chỉ số vượt ngưỡng",
          "Trích xuất dữ liệu linh hoạt cho phân tích chuyên sâu",
        ],
        media: "sparkMini",
      },
      {
        key: "strategy",
        icon: "BrainCog",
        title: "Ra quyết định dựa dữ liệu",
        summary: "Quyết định chiến lược chính xác và kịp thời.",
        description:
          "Dữ liệu được chuẩn hóa và chia sẻ trên một nguồn duy nhất giúp ban lãnh đạo xây dựng kế hoạch tăng trưởng, tối ưu nguồn lực và theo dõi hiệu quả triển khai.",
        points: [
          "Mô hình dự báo đa kịch bản theo thị trường",
          "Phân bổ nguồn lực dựa trên hiệu suất thực tế",
          "Lưu vết quyết định và kết quả thực thi",
        ],
        media: "barsLongStrategy",
      },
    ],
  },
  erpPreview: {
    badge: "Nền tảng Odoo Cần Thơ - Odoo ĐBSCL",
    title: "ERP Phương Việt kết nối Odoo cho doanh nghiệp Cần Thơ",
    highlight: "ERP Phương Việt",
    description:
      "Giải pháp ERP Cần Thơ trên nền Odoo Cần Thơ/Odoo ĐBSCL hợp nhất dữ liệu và quy trình, tạo dòng chảy quản trị xuyên suốt từ vận hành đến chiến lược",
    modules: [
      { id: "accounting", name: "Kế toán", iconSrc: "https://download.odoocdn.com/icons/account_accountant/static/description/icon.svg" },
      { id: "knowledge", name: "Kiến thức", iconSrc: "https://download.odoocdn.com/icons/knowledge/static/description/icon.svg" },
      { id: "sign", name: "Ký tên", iconSrc: "https://download.odoocdn.com/icons/sign/static/description/icon.svg" },
      { id: "crm", name: "CRM", iconSrc: "https://download.odoocdn.com/icons/crm/static/description/icon.svg" },
      { id: "studio", name: "Studio", iconSrc: "https://download.odoocdn.com/icons/web_studio/static/description/icon.svg" },
      { id: "subscription", name: "Gói đăng ký", iconSrc: "https://download.odoocdn.com/icons/sale_subscription/static/description/icon.svg" },
      { id: "rental", name: "Cho thuê", iconSrc: "https://download.odoocdn.com/icons/fleet/static/description/icon.svg" },
      { id: "pos", name: "POS", iconSrc: "https://download.odoocdn.com/icons/point_of_sale/static/description/icon.svg" },
      { id: "discuss", name: "Thảo luận", iconSrc: "https://download.odoocdn.com/icons/mail/static/description/icon.svg" },
      { id: "docs", name: "Tài liệu", iconSrc: "https://download.odoocdn.com/icons/documents/static/description/icon.svg" },
      { id: "project", name: "Dự án", iconSrc: "https://download.odoocdn.com/icons/project/static/description/icon.svg" },
      { id: "timesheet", name: "Bảng chấm công", iconSrc: "https://download.odoocdn.com/icons/hr_timesheet/static/description/icon.svg" },
      { id: "field-service", name: "Dịch vụ hiện trường", iconSrc: "https://download.odoocdn.com/icons/industry_fsm/static/description/icon.svg" },
      { id: "planning", name: "Kế hoạch", iconSrc: "https://download.odoocdn.com/icons/planning/static/description/icon.svg" },
      { id: "helpdesk", name: "Hỗ trợ", iconSrc: "https://download.odoocdn.com/icons/helpdesk/static/description/icon.svg" },
      { id: "website", name: "Trang web", iconSrc: "https://download.odoocdn.com/icons/website/static/description/icon.svg" },
      { id: "social", name: "Marketing MXH", iconSrc: "https://download.odoocdn.com/icons/social/static/description/icon.svg" },
      { id: "email", name: "Marketing email", iconSrc: "https://download.odoocdn.com/icons/mass_mailing/static/description/icon.svg" },
      { id: "purchase", name: "Mua hàng", iconSrc: "https://download.odoocdn.com/icons/purchase/static/description/icon.svg" },
      { id: "inventory", name: "Tồn kho", iconSrc: "https://download.odoocdn.com/icons/stock/static/description/icon.svg" },
      { id: "mrp", name: "Sản xuất", iconSrc: "https://download.odoocdn.com/icons/mrp/static/description/icon.svg" },
      { id: "sales", name: "Bán hàng", iconSrc: "https://download.odoocdn.com/icons/sale_management/static/description/icon.svg" },
      { id: "hr", name: "Nhân sự", iconSrc: "https://download.odoocdn.com/icons/hr/static/description/icon.svg" },
      { id: "dashboard", name: "Bảng điều khiển", iconSrc: "https://download.odoocdn.com/icons/spreadsheet_dashboard/static/description/icon.svg" },
    ],
    cta: {
      label: "Xem tất cả module",
      href: "https://www.odoo.com/vi_VN/page/all-apps",
      target: "_blank",
    },
  },
  keyFeatures: {
    badge: "Phần mềm quản trị Cần Thơ cho mọi ngành nghề",
    title: "Tùy chỉnh chuyên biệt cho từng lĩnh vực",
    highlight: "Tùy chỉnh",
    description:
      "Với khả năng tùy chỉnh chuyên sâu, PV-ERP (ERP Cần Thơ) phù hợp đặc thù từng ngành và hỗ trợ quản trị doanh nghiệp Cần Thơ/ĐBSCL",
    features: [
      {
        key: "commerce",
        icon: "ShoppingBag",
        title: "Thương mại",
        summary: "Chuỗi cung ứng mượt mà, kho hàng chính xác, bán hàng minh bạch",
        bullets: [
          "Tối ưu cung ứng & logistics đa kênh",
          "Quản lý tồn kho, định mức và cảnh báo chính xác",
          "Dashboard doanh số theo thời gian thực cho mọi phòng ban",
        ],
        media: "barsCommerce",
        accent: "from-emerald-500 to-lime-400",
      },
      {
        key: "manufacturing",
        icon: "Factory",
        title: "Sản xuất",
        summary: "Lập kế hoạch thông minh, kiểm soát chất lượng chặt chẽ, theo dõi OEE liên tục",
        bullets: [
          "MPS/MRP thông minh theo năng lực chuyền",
          "Quy trình QC nhiều công đoạn chuẩn hóa",
          "Giám sát hiệu suất dây chuyền với cảnh báo bất thường",
        ],
        media: "gearsManufacturing",
        accent: "from-sky-500 to-indigo-400",
      },
      {
        key: "services",
        icon: "Briefcase",
        title: "Dịch vụ",
        summary: "CRM, dự án, hỗ trợ khách hàng hợp nhất – vận hành tự động hóa",
        bullets: [
          "CRM đa kênh và chăm sóc khách hàng 360°",
          "Quản lý dự án linh hoạt theo Agile/Kanban",
          "Tự động hóa quy trình nội bộ và phối hợp đội nhóm",
        ],
        media: "lineServicesSmooth",
        accent: "from-rose-500 to-orange-400",
      },
    ],
  },
  benefits: {
    badge: "Giá trị cho doanh nghiệp",
    title: "Tiết kiệm, hiệu quả, minh bạch và bền vững cho doanh nghiệp",
    highlight: "bền vững",
    description:
      "PV-ERP tối ưu chi phí, gia tăng năng suất, minh bạch dữ liệu cho quản trị doanh nghiệp Cần Thơ và tạo nền tảng tăng trưởng bền vững tại ĐBSCL",
    tabs: [
      {
        key: "saving",
        icon: "PiggyBank",
        title: "Tối ưu chi phí vận hành",
        summary: "Loại bỏ trùng lặp, minh bạch nguồn lực giúp doanh nghiệp tiết kiệm tới 30% chi phí vận hành.",
        description:
          "Tự động hóa quy trình giúp cắt giảm chi phí lặp lại và kiểm soát ngân sách chính xác.",
        bullets: [
          "Tự động đối soát công nợ, lập hóa đơn",
          "Cảnh báo tồn kho và đặt hàng thông minh",
          "Báo cáo chi phí theo dự án, phòng ban",
        ],
        image: "/images/benefits/cost-control.png",
      },
      {
        key: "productivity",
        icon: "BarChart3",
        title: "Năng suất tăng vượt trội",
        summary: "Luồng công việc số hóa giúp đội ngũ hoàn thành nhiều hơn trong cùng quỹ thời gian.",
        description:
          "Hợp nhất các quy trình tạo luồng thông tin xuyên suốt, giảm thời gian chờ đợi.",
        bullets: [
          "Tự động phê duyệt và giao việc",
          "Dashboard hiệu suất theo thời gian thực",
          "Ứng dụng di động cập nhật tức thời",
        ],
        image: "/images/benefits/productivity.png",
      },
      {
        key: "transparency",
        icon: "LineChart",
        title: "Quyết định dữ liệu minh bạch",
        summary: "Tất cả phòng ban truy cập chung một nguồn dữ liệu chính xác để ra quyết định nhanh chóng.",
        description:
          "Báo cáo thời gian thực giúp lãnh đạo nắm bắt tình hình và ra quyết định nhanh.",
        bullets: [
          "Dashboard KPI cá nhân hóa",
          "Cảnh báo vượt ngưỡng tự động",
          "Dữ liệu tập trung, chia sẻ dễ dàng",
        ],
        image: "/images/benefits/transparency.png",
      },
      {
        key: "growth",
        icon: "TrendingUp",
        title: "Nền tảng tăng trưởng bền vững",
        summary: "Kiến trúc linh hoạt giúp doanh nghiệp mở rộng quy mô mà không phải thay đổi hệ thống lõi.",
        description:
          "Kiến trúc linh hoạt với API và workflow tùy biến giúp doanh nghiệp mở rộng dễ dàng.",
        bullets: [
          "Hơn 40 module sẵn có",
          "Tích hợp dễ với hệ thống cũ",
          "Bảo mật cao, đạt chuẩn hiện đại",
        ],
        image: "/images/benefits/growth.png",
      },
    ],
  },
  implementationTimeline: {
    badge: "Hành trình PV-ERP thành công",
    title: "Lộ trình rõ ràng, triển khai hiệu quả",
    highlight: "Lộ trình rõ ràng",
    description:
      "Các giai đoạn được thiết kế bài bản bởi đội ERP Cần Thơ, đảm bảo triển khai PV-ERP thành công và mang lại giá trị tối đa cho doanh nghiệp ĐBSCL",
    steps: [
      {
        key: "consult",
        order: 1,
        title: "Liên hệ tư vấn",
        description: "Tư vấn giải pháp phù hợp với đặc thù cơ quan",
        icon: "MessageCircle",
      },
      {
        key: "setup",
        order: 2,
        title: "Cài đặt & Cấu hình",
        description: "Triển khai và cấu hình theo quy trình ISO hiện tại",
        icon: "Cog",
      },
      {
        key: "training",
        order: 3,
        title: "Tập huấn sử dụng",
        description: "Hướng dẫn chi tiết sử dụng phần mềm",
        icon: "GraduationCap",
      },
      {
        key: "support",
        order: 4,
        title: "Vận hành & Hỗ trợ",
        description: "Hỗ trợ 24/7 trong các ngày làm việc",
        icon: "Headphones",
      },
    ],
  },
  quickCta: {
    badge: "Giải pháp ERP Cần Thơ",
    title: "Sẵn sàng chuyển đổi số cùng Odoo ĐBSCL?",
    highlight: "Odoo ĐBSCL",
    description:
      "Dùng thử Odoo Cần Thơ, nhận tư vấn 1:1 từ chuyên gia ERP Phương Việt ngay tại Cần Thơ/ĐBSCL.",
    actions: [
      {
        label: "Đăng ký Demo",
        href: "tel:0852949258",
        style: "primary",
      },
      {
        label: "Liên hệ tư vấn",
        href: "tel:0852949258",
        style: "outline",
      },
    ],
  },
} as const;

type Templates = typeof HOME_BLOCK_TEMPLATES;

export type HomeBlockKind = keyof Templates;

export const HOME_BLOCK_KINDS = Object.keys(HOME_BLOCK_TEMPLATES) as HomeBlockKind[];

export function cloneHomeBlockTemplate(kind: HomeBlockKind) {
  const template = HOME_BLOCK_TEMPLATES[kind];
  return template ? JSON.parse(JSON.stringify(template)) : {};
}
