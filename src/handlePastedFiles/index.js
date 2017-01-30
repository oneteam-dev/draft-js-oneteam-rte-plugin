// @flow

import isFunction from 'lodash/isFunction';

import type { DraftHandleValue } from 'draft-js';

import type { Config } from '../types/Config';
// import type { PluginFunctions } from '../types/PluginFunctions';

const createHandlePastedFiles = (config: Config): Function => (
  (files: FileList/* , pluginFunctions: PluginFunctions */): DraftHandleValue => {
    const { onPastedFiles } = config;
    if (isFunction(onPastedFiles)) {
      onPastedFiles(files);
      return 'handled';
    }
    return 'not-handled';
  }
);

export default createHandlePastedFiles;
