// @flow

import { EditorState } from 'draft-js';

const applyBlockData = (editorState: EditorState, blockKey: string, blockData: Object): EditorState => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const newBlockMap = blockMap.map((b) => (
    b.key === blockKey ? b.merge(blockData) : b)
  );
  const newContent = content.merge({ blockMap: newBlockMap });

  return EditorState.push(
    editorState,
    newContent,
    'split-block' // TODO: will this do ?
  );
};

export default applyBlockData;
