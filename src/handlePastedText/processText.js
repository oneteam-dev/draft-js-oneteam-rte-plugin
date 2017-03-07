import { EditorState, CharacterMetadata, Modifier, BlockMapBuilder } from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import getEntityKeyForSelection from 'draft-js/lib/getEntityKeyForSelection';

const processText = (editorState: EditorState, text: string): EditorState => {
  const character = CharacterMetadata.create({
    style: editorState.getCurrentInlineStyle(),
    entity: getEntityKeyForSelection(
      editorState.getCurrentContent(),
      editorState.getSelection()
    )
  });

  const textFragment = DraftPasteProcessor.processText(
    text.split('\n'),
    character
  );

  const textMap = BlockMapBuilder.createFromArray(textFragment);
  const withInsertedText = Modifier.replaceWithFragment(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    textMap
  );

  return EditorState.push(
    editorState,
    withInsertedText,
    'insert-fragment'
  );
};

export default processText;
