import { Map } from 'immutable';
import createPDFPreviewDecorator from './decorators/pdfPreview';
import convertHTML from './encoding/convertHTML';

const createOneteamRTEPlugin = (config) => {
  const store = {};
  return {
    store,
    convertHTML,
    initialize({ setEditorState, getEditorState }) {
      store.setEditorState = setEditorState;
      store.getEditorState = getEditorState;
    },
    decorators: [
      createPDFPreviewDecorator(config, store)
    ],
    blockRenderMap: Map({
      'pdf-preview': {
        element: 'pdf-preview'
      }
    }),
  };
};

export default createOneteamRTEPlugin;
