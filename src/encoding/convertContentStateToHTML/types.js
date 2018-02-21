// @flow

import { ContentBlock, EntityInstance } from 'draft-js';
import { OrderedSet } from 'immutable';

export type BlockRenderer = (block: ContentBlock) => ?string;
export type BlockRendererMap = {[blockType: string]: BlockRenderer};
export type Style = OrderedSet<string>;
export type StyleRange = [string, Style];
export type EntityRenderer = (entity: EntityInstance, styleRanges: Array<StyleRange>) => ?string;
export type EntityRendererMap = {[entityType: string]: EntityRenderer};
export type Options = {
  blockRenderers?: BlockRendererMap;
  entityRenderers?: EntityRendererMap;
};
