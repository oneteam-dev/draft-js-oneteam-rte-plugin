import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';

import createOneteamRTEPlugin from 'draft-js-oneteam-rte-plugin'; // eslint-disable-line
import Draft, {
  convertToRaw,
  EditorState
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import Toolbar from './components/Toolbar';
import WebCard from './components/WebCard';
import FilePlaceholder from './components/FilePlaceholder';
import PDFPreview from './components/PDFPreview';
import styles from './styles.css';

const rtePlugin = createOneteamRTEPlugin({
  atomicBlockRenderMap: {
    WEB_CARD: WebCard,
    PLACEHOLDER: PDFPreview,
    FILE_PLACEHOLDER: FilePlaceholder
  },
});

window.Draft = Draft;

const plugins = [
  rtePlugin
];

const content = rtePlugin.convertHTML(`<h1>draft-js-oneteam-rte-plugin</h1><figure>
  <pdf-preview
    src="https://foo.bar.baz/preview"
    original-file-url="https://foo.bar.baz/original"
    original-file-name="qux.docx"
    original-file-content-type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    width="612" height="792">
    <a href="https://foo.bar.baz/download" data-name="qux.docx" data-size="244897" target="_blank" download>test1.docx</a>
  </pdf-preview>
</figure><div><br /></div><div><strong>Bold</strong></div><div><br /></div>`);
const initialEditorState = EditorState.createWithContent(content);

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
        <Toolbar
          editorState={editorState}
          onChange={this.onChange}
        />
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
