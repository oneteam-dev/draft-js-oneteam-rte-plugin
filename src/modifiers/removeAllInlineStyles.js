// @flow

import { EditorState, ContentState, Modifier } from 'draft-js';
import getCurrentBlock from '../utils/getCurrentBlock';
import { INLINE_STYLES } from '../constants';

const removeAllInlineStyles = (editorState: EditorState, otherInlineStyles: { [id: string]: string } = {}): EditorState => {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  let newContent;

  if (selection.isCollapsed()) {
    const block = getCurrentBlock(editorState);
    const characterList = block.getCharacterList();
    const key = block.getKey();
    const updatedCharacterList = characterList.map((c) => c.set('style', c.get('style').clear()));
    const updatedBlock = block.set('characterList', updatedCharacterList);
    const blockMap = content.getBlockMap().merge({ [key]: updatedBlock });
    newContent = content.merge({ blockMap });
  } else {
    newContent = Object.keys({ ...INLINE_STYLES, ...otherInlineStyles }).reduce(
      (contentState: ContentState, style: string): ContentState => (
        Modifier.removeInlineStyle(
          contentState,
          selection,
          style
        )
      ),
      content
    );
  }

  return EditorState.push(editorState, newContent, 'change-inline-style');
};

export default removeAllInlineStyles;
