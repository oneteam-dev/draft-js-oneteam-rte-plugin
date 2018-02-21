// @flow

import { EntityInstance } from 'draft-js';

import type { ContentBlock } from 'draft-js';
import type { PluginFunctions } from './PluginFunctions';

type AtomicBlockRenderMap = {
  [key: string]: React$Element<*>
}

export type Config = {
  blockStyleMap?: ?Object,
  maxDepth: number,
  customBlockRendererFn?: ?(contentBlock: ContentBlock, pluginFunctions: PluginFunctions) => ?Object,
  customAtomicBlockRendererFn?: ?(entry: EntityInstance, block: ContentBlock, pluginFunctions: PluginFunctions) => ?Object,
  onReturnWithCommand?: ?(event: SyntheticKeyboardEvent<*>) => void,
  onPastedFiles?: ?(files: FileList) => void,
  atomicBlockRenderMap: AtomicBlockRenderMap,
  disableWebCardCreation: ?boolean
}
