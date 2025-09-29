import type { HomeBlockKind } from "@pv-erp/shared/home-block-templates";
import { HOME_BLOCK_KINDS, cloneHomeBlockTemplate } from "@pv-erp/shared/home-block-templates";

export type BlockTemplateData = Record<string, unknown>;

export const BLOCK_DEFAULT_DATA: Record<HomeBlockKind, BlockTemplateData> = Object.fromEntries(
  HOME_BLOCK_KINDS.map((kind) => [kind, cloneHomeBlockTemplate(kind)])
) as Record<HomeBlockKind, BlockTemplateData>;

export function cloneBlockDefault(kind: string): BlockTemplateData | undefined {
  if ((HOME_BLOCK_KINDS as string[]).includes(kind)) {
    return cloneHomeBlockTemplate(kind as HomeBlockKind);
  }
  return undefined;
}
