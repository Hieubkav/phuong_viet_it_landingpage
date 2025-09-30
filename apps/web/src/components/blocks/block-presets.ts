import type { RJSFSchema, UiSchema } from "@rjsf/utils";
import { BLOCK_DEFAULT_DATA } from "./block-defaults";
import { ICON_ONE_OF } from "@/lib/lucide-icons";

export type BlockPreset = {
  kind: string;
  name: string;
  schema: RJSFSchema;
  uiSchema?: UiSchema;
  template?: Record<string, unknown>;
};

const CTA_VARIANTS = [
  { const: "primary", title: "Primary" },
  { const: "outline", title: "Outline" },
];

const KEY_FEATURE_MEDIA_OPTIONS = [
  { const: "barsCommerce", title: "Biểu đồ Thương mại" },
  { const: "gearsManufacturing", title: "Bánh răng Sản xuất" },
  { const: "lineServicesSmooth", title: "Đường dịch vụ" },
];

const ACTION_STYLE_OPTIONS = [
  { const: "primary", title: "Primary" },
  { const: "outline", title: "Outline" },
];

export const BLOCK_PRESETS: BlockPreset[] = [
  {
    kind: "hero",
    name: "Hero",
    schema: {
      type: "object",
      properties: {
        title: { type: "string", title: "Tiêu đề" },
        highlight: { type: "string", title: "Từ nhấn mạnh" },
        subtitle: { type: "string", title: "Mô tả" },
        video: {
          type: "object",
          title: "Video",
          properties: {
            src: { type: "string", title: "Video URL", format: "uri" },
            poster: { type: "string", title: "Poster URL" },
          },
        },
        ctas: {
          type: "array",
          title: "CTA",
          items: {
            type: "object",
            properties: {
              label: { type: "string", title: "Nhãn" },
              href: { type: "string", title: "Liên kết", format: "uri" },
              variant: { type: "string", title: "Kiểu nút", oneOf: CTA_VARIANTS },
            },
            required: ["label", "href"],
          },
        },
        stats: {
          type: "array",
          title: "Chỉ số",
          items: {
            type: "object",
            properties: {
              value: { type: "string", title: "Giá trị" },
              label: { type: "string", title: "Nhãn" },
            },
            required: ["value", "label"],
          },
        },
      },
      required: ["title", "subtitle"],
    },
    uiSchema: {
      subtitle: { "ui:widget": "textarea" },
      video: {
        src: { "ui:placeholder": "https://..." },
        poster: { "ui:placeholder": "/hero-fallback.svg" },
      },
      ctas: {
        "ui:options": { addButtonLabel: "Thêm CTA" },
        items: {
          label: { "ui:placeholder": "Liên hệ" },
          href: { "ui:placeholder": "tel:0706780790" },
        },
      },
      stats: {
        "ui:options": { addButtonLabel: "Thêm chỉ số" },
      },
    } satisfies UiSchema,
    template: BLOCK_DEFAULT_DATA.hero,
  },
  {
    kind: "painPoints",
    name: "Business Pain Points",
    schema: {
      type: "object",
      properties: {
        badge: { type: "string", title: "Badge" },
        title: { type: "string", title: "Tiêu đề" },
        highlight: { type: "string", title: "Từ nhấn mạnh" },
        description: { type: "string", title: "Mô tả" },
        cards: {
          type: "array",
          title: "Thẻ vấn đề",
          items: {
            type: "object",
            properties: {
              icon: { type: "string", title: "Icon", oneOf: ICON_ONE_OF },
              title: { type: "string", title: "Tiêu đề" },
              description: { type: "string", title: "Mô tả" },
            },
            required: ["title", "description"],
          },
        },
      },
      required: ["title", "description"],
    },
    uiSchema: {
      description: { "ui:widget": "textarea" },
      cards: {
        "ui:options": { addButtonLabel: "Thêm thẻ" },
        items: {
          icon: { "ui:widget": "iconPicker" },
          description: { "ui:widget": "textarea" },
        },
      },
    } satisfies UiSchema,
    template: BLOCK_DEFAULT_DATA.painPoints,
  },
  {
    kind: "challenges",
    name: "Challenges & Solutions",
    schema: {
      type: "object",
      properties: {
        badge: { type: "string", title: "Badge" },
        highlight: { type: "string", title: "Từ nhấn mạnh" },
title: { type: "string", title: "Tiêu đề" },
        description: { type: "string", title: "Mô tả" },
        tabs: {
          type: "array",
          title: "Tab giải pháp",
          items: {
            type: "object",
            properties: {
              key: { type: "string", title: "Key" },
              icon: { type: "string", title: "Icon", oneOf: ICON_ONE_OF },
              title: { type: "string", title: "Tiêu đề" },
              summary: { type: "string", title: "Tóm tắt" },
              description: { type: "string", title: "Mô tả" },
              points: {
                type: "array",
                title: "Điểm nổi bật",
                items: { type: "string", title: "Điểm" },
              },
              media: { type: "string", title: "Minh họa" },
            },
            required: ["key", "title"],
          },
        },
      },
      required: ["title", "description"],
    },
    uiSchema: {
      description: { "ui:widget": "textarea" },
      tabs: {
        "ui:options": { addButtonLabel: "Thêm tab" },
        items: {
          icon: { "ui:widget": "iconPicker" },
          summary: { "ui:widget": "textarea" },
          description: { "ui:widget": "textarea" },
          points: {
            "ui:options": { addButtonLabel: "Thêm ý" },
          },
          media: { "ui:widget": "mediaImage" },
        },
      },
    } satisfies UiSchema,
    template: BLOCK_DEFAULT_DATA.challenges,
  },
  {
    kind: "erpPreview",
    name: "ERP Preview",
    schema: {
      type: "object",
      properties: {
        badge: { type: "string", title: "Badge" },
        highlight: { type: "string", title: "Từ nhấn mạnh" },
title: { type: "string", title: "Tiêu đề" },
        description: { type: "string", title: "Mô tả" },
        modules: {
          type: "array",
          title: "Module",
          items: {
            type: "object",
            properties: {
              id: { type: "string", title: "ID" },
              name: { type: "string", title: "Tên" },
              iconSrc: { type: "string", title: "Icon URL", format: "uri" },
            },
            required: ["id", "name", "iconSrc"],
          },
        },
        cta: {
          type: "object",
          title: "CTA",
          properties: {
            label: { type: "string", title: "Nhãn" },
            href: { type: "string", title: "Liên kết", format: "uri" },
            target: { type: "string", title: "Target" },
          },
        },
      },
      required: ["title", "description"],
    },
    uiSchema: {
      description: { "ui:widget": "textarea" },
      modules: {
        "ui:options": { addButtonLabel: "Thêm module" },
        items: {
          iconSrc: { "ui:placeholder": "https://...svg" },
        },
      },
      cta: {
        href: { "ui:placeholder": "https://..." },
      },
    } satisfies UiSchema,
    template: BLOCK_DEFAULT_DATA.erpPreview,
  },
  {
    kind: "keyFeatures",
    name: "Key Features",
    schema: {
      type: "object",
      properties: {
        badge: { type: "string", title: "Badge" },
        highlight: { type: "string", title: "Từ nhấn mạnh" },
title: { type: "string", title: "Tiêu đề" },
        description: { type: "string", title: "Mô tả" },
        features: {
          type: "array",
          title: "Tính năng",
          items: {
            type: "object",
            properties: {
              key: { type: "string", title: "Key" },
              icon: { type: "string", title: "Icon", oneOf: ICON_ONE_OF },
              title: { type: "string", title: "Tiêu đề" },
              summary: { type: "string", title: "Tóm tắt" },
              bullets: {
                type: "array",
                title: "Điểm mạnh",
                items: { type: "string", title: "Điểm" },
              },
              media: { type: "string", title: "Minh họa", oneOf: KEY_FEATURE_MEDIA_OPTIONS },
              accent: { type: "string", title: "Gradient" },
            },
            required: ["key", "title"],
          },
        },
      },
      required: ["title", "description"],
    },
    uiSchema: {
      description: { "ui:widget": "textarea" },
      features: {
        "ui:options": { addButtonLabel: "Thêm tính năng" },
        items: {
          icon: { "ui:widget": "iconPicker" },
          summary: { "ui:widget": "textarea" },
          bullets: {
            "ui:options": { addButtonLabel: "Thêm điểm" },
          },
        },
      },
    } satisfies UiSchema,
    template: BLOCK_DEFAULT_DATA.keyFeatures,
  },
  {
    kind: "benefits",
    name: "Benefits",
    schema: {
      type: "object",
      properties: {
        badge: { type: "string", title: "Badge" },
        highlight: { type: "string", title: "Từ nhấn mạnh" },
title: { type: "string", title: "Tiêu đề" },
        description: { type: "string", title: "Mô tả" },
        tabs: {
          type: "array",
          title: "Tab lợi ích",
          items: {
            type: "object",
            properties: {
              key: { type: "string", title: "Key" },
              icon: { type: "string", title: "Icon", oneOf: ICON_ONE_OF },
              title: { type: "string", title: "Tiêu đề" },
              summary: { type: "string", title: "Tóm tắt" },
              description: { type: "string", title: "Mô tả" },
              bullets: {
                type: "array",
                title: "Điểm nhấn",
                items: { type: "string", title: "Điểm" },
              },
              image: { type: "string", title: "Ảnh" },
            },
            required: ["key", "title"],
          },
        },
      },
      required: ["title", "description"],
    },
    uiSchema: {
      description: { "ui:widget": "textarea" },
      tabs: {
        "ui:options": { addButtonLabel: "Thêm tab" },
        items: {
          icon: { "ui:widget": "iconPicker" },
          summary: { "ui:widget": "textarea" },
          description: { "ui:widget": "textarea" },
          image: { "ui:widget": "mediaImage" },
          bullets: {
            "ui:options": { addButtonLabel: "Thêm điểm" },
          },
        },
      },
    } satisfies UiSchema,
    template: BLOCK_DEFAULT_DATA.benefits,
  },
  {
    kind: "implementationTimeline",
    name: "Implementation Timeline",
    schema: {
      type: "object",
      properties: {
        badge: { type: "string", title: "Badge" },
        highlight: { type: "string", title: "Từ nhấn mạnh" },
title: { type: "string", title: "Tiêu đề" },
        description: { type: "string", title: "Mô tả" },
        steps: {
          type: "array",
          title: "Các bước",
          items: {
            type: "object",
            properties: {
              key: { type: "string", title: "Key" },
              order: { type: "number", title: "Thứ tự" },
              title: { type: "string", title: "Tiêu đề" },
              description: { type: "string", title: "Mô tả" },
              icon: { type: "string", title: "Icon", oneOf: ICON_ONE_OF },
            },
            required: ["key", "title"],
          },
        },
      },
      required: ["title", "description"],
    },
    uiSchema: {
      description: { "ui:widget": "textarea" },
      steps: {
        "ui:options": { addButtonLabel: "Thêm bước" },
        items: {
          icon: { "ui:widget": "iconPicker" },
          description: { "ui:widget": "textarea" },
        },
      },
    } satisfies UiSchema,
    template: BLOCK_DEFAULT_DATA.implementationTimeline,
  },
  {
    kind: "quickCta",
    name: "Quick CTA",
    schema: {
      type: "object",
      properties: {
        badge: { type: "string", title: "Badge" },
        title: { type: "string", title: "Tiêu đề" },
        highlight: { type: "string", title: "Từ nhấn mạnh" },
        description: { type: "string", title: "Mô tả" },
        actions: {
          type: "array",
          title: "Hành động",
          items: {
            type: "object",
            properties: {
              label: { type: "string", title: "Nhãn" },
              href: { type: "string", title: "Liên kết", format: "uri" },
              style: { type: "string", title: "Kiểu", oneOf: ACTION_STYLE_OPTIONS },
            },
            required: ["label", "href"],
          },
        },
      },
      required: ["title", "description"],
    },
    uiSchema: {
      description: { "ui:widget": "textarea" },
      actions: {
        "ui:options": { addButtonLabel: "Thêm hành động" },
        items: {
          href: { "ui:placeholder": "tel:0706780790" },
        },
      },
    } satisfies UiSchema,
    template: BLOCK_DEFAULT_DATA.quickCta,
  },
];
