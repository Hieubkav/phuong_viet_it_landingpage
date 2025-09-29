import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";
import { BLOCK_PRESETS } from "./block-presets";

type TemplateMap = Record<string, Record<string, unknown>>;

const TEMPLATE_MAP: TemplateMap = Object.fromEntries(
  BLOCK_PRESETS.filter((preset) => preset.template).map((preset) => [preset.kind, clone(preset.template!)])
);

export function getTemplate(kind: string) {
  const template = TEMPLATE_MAP[kind];
  return template ? clone(template) : undefined;
}

export function listTemplates(): HomeBlockKind[] {
  return BLOCK_PRESETS.map((preset) => preset.kind as HomeBlockKind);
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
