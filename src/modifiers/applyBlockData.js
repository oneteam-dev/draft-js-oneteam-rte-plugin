// @flow

import { EditorState, ContentBlock } from 'draft-js';

const applyBlockData = (editorState: EditorState, blockKey: string, blockData: ContentBlock): EditorState => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  // eslint-disable-next-line no-confusing-arrow
  const newBlockMap = blockMap.map((b) => b.key === blockKey ? b.merge(blockData) : b);
  const newContent = content.merge({ blockMap: newBlockMap });

  return EditorState.push(
    editorState,
    newContent,
    'split-block'
  );
};

export default applyBlockData;
