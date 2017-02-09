import type { DraftBlockType } from 'draft-js/lib/DraftBlockType';
import type { DraftInlineStyle } from 'draft-js/lib/DraftInlineStyle';

export type Block = {
  type: DraftBlockType;
  depth: number;
};

export type Chunk = {
  text: string;
  inlines: Array<DraftInlineStyle>;
  entities: Array<string>;
  blocks: Array<Block>;
};
