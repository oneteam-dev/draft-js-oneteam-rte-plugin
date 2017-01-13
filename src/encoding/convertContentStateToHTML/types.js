import { ContentBlock } from 'draft-js';

export type BlockRenderer = (block: ContentBlock) => ?string;
export type BlockRendererMap = {[blockType: string]: BlockRenderer};
export type Options = {
  blockRenderers?: BlockRendererMap;
};
