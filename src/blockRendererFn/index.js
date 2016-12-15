import type { ContentBlock } from 'draft-js';

import merge from 'lodash/merge';
import decorateComponentWithProps from 'decorate-component-with-props';
import Image from '../components/Image';
import atomicBlockRenderer from './atomicBlockRenderer';
import { ATOMIC, FILE_PLACEHOLDER } from '../constants';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const createBlockRendererFn = (config: Config): Function => (
  (block: ContentBlock, pluginFunctions: PluginFunctions): ?Object => {
    if (typeof config.customBlockRendererFn === 'function') {
      const ret = config.customBlockRendererFn(block, pluginFunctions);
      if (ret) {
        return ret;
      }
    }

    if (block.getType() === ATOMIC) {
      const atomicBlockRenderMap = config.atomicBlockRenderMap[FILE_PLACEHOLDER] ?
         merge({}, config.atomicBlockRenderMap, {
           [FILE_PLACEHOLDER]: decorateComponentWithProps(
             config.atomicBlockRenderMap[FILE_PLACEHOLDER],
             { ImageComponent: Image }
           ),
         }) :
         config.atomicBlockRenderMap;
      const atomicBlockRendererConfig = merge({}, config, { atomicBlockRenderMap });
      return atomicBlockRenderer(atomicBlockRendererConfig, block, pluginFunctions);
    }
  }
);

export default createBlockRendererFn;
