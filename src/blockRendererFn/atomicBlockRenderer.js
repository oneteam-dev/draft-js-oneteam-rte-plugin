import { Entity, ContentBlock } from 'draft-js';
import { mergeEntityData } from 'draft-js-modifiers';
import Image from '../components/Image';
import DownloadLink from '../components/DownloadLink';
import IFrame from '../components/IFrame';
import removeBlock from '../modifiers/removeBlock';
import replaceToAtomicBlock from '../modifiers/replaceToAtomicBlock';
import { IMAGE, DOWNLOAD_LINK, IFRAME, WEB_CARD, PLACEHOLDER, FILE_PLACEHOLDER } from '../constants';

import type { Config } from '../types/Config';
import type { PluginFunctions } from '../types/PluginFunctions';

const atomicBlockRenderer = (
  config: Config,
  block: ContentBlock,
  pluginFunctions: PluginFunctions
): ?Object => {
  const entityKey = block.getEntityAt(0);
  if (!entityKey) {
    return null;
  }

  // TODO: update this when DraftEntity removed entirely
  const entity = Entity.__get(entityKey);

  if (typeof config.customAtomicBlockRendererFn === 'function') {
    const atomicBlock = config.customAtomicBlockRendererFn(entity, block, pluginFunctions);
    if (atomicBlock) {
      return atomicBlock;
    }
  }

  const type = entity.getType();

  switch (type) {
    case WEB_CARD: {
      const { getEditorState, setEditorState } = pluginFunctions;
      const editorState = getEditorState();
      const { url, imageRemoved } = entity.getData();
      return {
        component: config.atomicBlockRenderMap[WEB_CARD],
        editable: false,
        props: {
          url,
          imageRemoved,
          onDelete: () => setEditorState(removeBlock(editorState, block)),
          onRemoveImage: () => {
            setEditorState(
              mergeEntityData(editorState, entityKey, { imageRemoved: true })
            );
          }
        },
      };
    }
    case PLACEHOLDER: {
      const data = entity.getData();
      return {
        component: config.atomicBlockRenderMap[PLACEHOLDER],
        props: {
          name: data.name,
          contentType: data.content_type,
        },
        editable: false,
      };
    }
    case FILE_PLACEHOLDER: {
      const { getEditorState, setEditorState } = pluginFunctions;
      const editorState = getEditorState();

      return {
        component: config.atomicBlockRenderMap[FILE_PLACEHOLDER],
        props: {
          ...entity.getData(),
          onComplete: (data) => {
            if (typeof config.onCompleteFileUpload === 'function') {
              config.onCompleteFileUpload(data, block);
            }

            let newEditorState;
            if (data.isImage) {
              newEditorState = replaceToAtomicBlock(
                editorState,
                block,
                IMAGE,
                'IMMUTABLE',
                {
                  src: data.src,
                  alt: data.alt,
                  'data-original-url': data['data-original-url'],
                }
              );
            } else {
              newEditorState = mergeEntityData(editorState, entityKey, data);
            }

            setEditorState(newEditorState);
          },
          onDelete: () => setEditorState(removeBlock(editorState, block)),
        },
        editable: false
      };
    }
    case IMAGE:
      return {
        component: config.Image || Image,
        editable: false,
      };
    case DOWNLOAD_LINK:
      return {
        component: config.DownloadLink || DownloadLink,
        editable: true,
      };
    case IFRAME:
      return {
        component: config.IFrame || IFrame,
        editable: false,
      };
    default: // noop
  }
};

export default atomicBlockRenderer;
