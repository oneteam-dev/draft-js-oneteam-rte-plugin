// @flow

import type { ContentBlock } from 'draft-js';
import { ALIGN_CENTER, ALIGN_RIGHT, ALIGN_JUSTIFY } from '../constants';

import type { Config } from '../types/Config';
// import type { PluginFunctions } from '../types/PluginFunctions';

const createBlockStyleFn = (config: Config): Function => (
  (block: ContentBlock/* , pluginFunctions: PluginFunctions */): ?string => {
    const type = block.getType();

    if (config.blockStyleMap && config.blockStyleMap[type]) {
      return config.blockStyleMap[type];
    }

    switch (type) {
      case ALIGN_CENTER:
      case ALIGN_RIGHT:
      case ALIGN_JUSTIFY:
        return type;
      default: // noop
    }
  }
);

export default createBlockStyleFn;
