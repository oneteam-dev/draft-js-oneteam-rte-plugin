import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';

import createOneteamRTEPlugin from 'draft-js-oneteam-rte-plugin'; // eslint-disable-line
import Draft, {
  convertToRaw,
  EditorState,
  DefaultDraftBlockRenderMap
} from 'draft-js';
import styles from './styles.css';

const rtePlugin = createOneteamRTEPlugin();

window.Draft = Draft;

const plugins = [
  rtePlugin
];

const html = rtePlugin.convertHTML(`<figure>
  <pdf-preview
    src="https://foo.bar.baz/preview"
    original-file-url="https://foo.bar.baz/preview"
    original-file-name="qux.docx"
    original-file-content-type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    width="612" height="792">
    <a href="https://foo.bar.baz/download" data-name="qux.docx" data-size="244897" target="_blank" download>test1.docx</a>
  </pdf-preview>
</figure>`);
const blockArray = Draft.convertFromHTML(html, undefined, DefaultDraftBlockRenderMap.merge(rtePlugin.blockRenderMap));
const contentState = Draft.ContentState.createFromBlockArray(blockArray);
const initialEditorState = EditorState.createWithContent(contentState);

export default class DemoEditor extends Component {

  state = {
    editorState: initialEditorState
  };

  componentDidMount = () => {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }

  onChange = (editorState) => {
    window.editorState = editorState;
    window.rawContent = convertToRaw(editorState.getCurrentContent());

    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    const placeholder = editorState.getCurrentContent().hasText() ? null : <div className={styles.placeholder}>Write something here...</div>;
    return (
      <div className={styles.root}>
        {placeholder}
        <div className={styles.editor} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            plugins={plugins}
            spellCheck
            ref={(element) => { this.editor = element; }}
          />
        </div>
      </div>
    );
  }
}
