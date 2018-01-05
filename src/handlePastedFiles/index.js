// @flow

import type { DraftHandleValue } from 'draft-js/lib/DraftHandleValue';
import type { Config } from '../types/Config';
// import type { PluginFunctions } from '../types/PluginFunctions';

const createHandlePastedFiles = (config: Config): Function => (
  (files: FileList/* , pluginFunctions: PluginFunctions */): DraftHandleValue => {
    const { onPastedFiles } = config;
    if (typeof onPastedFiles === 'function') {
      onPastedFiles(files);
      return 'handled';
    }
    return 'not-handled';
  }
);

export default createHandlePastedFiles;
