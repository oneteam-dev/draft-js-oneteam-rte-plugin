// @flow

import merge from 'lodash/merge';
import handleKeyCommand from './handleKeyCommand';
import handleReturn from './handleReturn';
import onTab from './onTab';
import onBlur from './onBlur';
import blockRendererFn from './blockRendererFn';
import handlePastedText from './handlePastedText';
import handlePastedFiles from './handlePastedFiles';
import blockStyleFn from './blockStyleFn';
import createLinkDecorator from './decorators/Link';
import createDownloadLinkDecorator from './decorators/DownloadLink';
import createBoundModifiers from './helpers/createBoundModifiers';
import convertHTML from './encoding/convertHTMLToContentState';
import convertState from './encoding/convertContentStateToHTML';
import { OLD_INLINE_STYLES } from './constants';

import type { Config } from './types/Config';

const defaultConfig = {
  maxDepth: 4,
  atomicBlockRenderMap: {}
};

const createOneteamRTEPlugin = (options: Config): Object => {
  const store = {};

  const config = merge({}, defaultConfig, options);

  return {
    convertHTML,
    convertState,
    store,
    initialize(pluginFunctions) {
      Object.keys(pluginFunctions).forEach((k) => {
        store[k] = pluginFunctions[k];
      });
    },

    decorators: [
      createLinkDecorator(config),
      createDownloadLinkDecorator(config)
    ],

    handleKeyCommand: handleKeyCommand(config),

    handleReturn: handleReturn(config),

    onTab: onTab(config),

    blockRendererFn: blockRendererFn(config),

    handlePastedText: handlePastedText(config),

    // should change to configurable
    customStyleMap: {
      ...OLD_INLINE_STYLES,
      CODE: {
        padding: '2px 4px',
        fontFamily: 'Menlo, Monaco, Consolas, Courier New, monospace',
        color: '#c7254e',
        backgroundColor: '#f9f2f4',
        borderRadius: 4
      }
    },

    blockStyleFn: blockStyleFn(config),

    handlePastedFiles: handlePastedFiles(config),

    onBlur: onBlur(config),

    modifiers: createBoundModifiers(store),
  };
};

export default createOneteamRTEPlugin;
