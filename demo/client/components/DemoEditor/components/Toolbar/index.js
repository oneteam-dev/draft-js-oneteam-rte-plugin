import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import * as constants from '../../../../../../src/constants';
import { toggleBlockType, toggleInlineStyle } from '../../../../../../src/modifiers';
import Button from './components/Button';

const blockTypes = [
  constants.H1,
  constants.H2,
  constants.H3,
  constants.H4,
  constants.H5,
  constants.BLOCKQUOTE,
  constants.ORDERED_LIST_ITEM,
  constants.UNORDERED_LIST_ITEM,
  constants.CODE_BLOCK
];

const inlineStyles = [
  constants.BOLD,
  constants.ITALIC,
  constants.STRIKETHROUGH,
  constants.CODE
];

const buttonNameMap = {
  'header-one': 'H1',
  'header-two': 'H2',
  'header-three': 'H3',
  'header-four': 'H4',
  'header-five': 'H5',
  blockquote: 'BQ',
  'ordered-list-item': 'OL',
  'unordered-list-item': 'UL',
  'code-block': 'CODE',
  BOLD: 'Bold',
  ITALIC: 'Italic',
  STRIKETHROUGH: 'Strikethrough',
  CODE: 'Code'
};

export default class Toolbar extends Component {
  hasCurrentInlineStyle(type) {
    return this.props.editorState.getCurrentInlineStyle().has(type);
  }

  renderBlockTypeButtons() {
    const { editorState, onChange } = this.props;
    return blockTypes.map((key) => (
      <Button
        key={key}
        onMouseDown={(e) => {
          e.preventDefault();
          onChange(toggleBlockType(editorState, key));
        }}
        active={RichUtils.getCurrentBlockType(editorState) === key}
      >
        {buttonNameMap[key]}
      </Button>
    ));
  }

  renderInlineStyleButtons() {
    const { editorState, onChange } = this.props;
    return inlineStyles.map((key) => (
      <Button
        key={key}
        onMouseDown={(e) => {
          e.preventDefault();
          onChange(toggleInlineStyle(editorState, key));
        }}
        active={this.hasCurrentInlineStyle(key)}
      >
        {buttonNameMap[key]}
      </Button>
    ));
  }

  render() {
    return (
      <div className="toolbar">
        {[
          ...this.renderBlockTypeButtons(),
          <span key="spacer" style={{ display: 'inline-block', width: '2em' }} />,
          ...this.renderInlineStyleButtons()
        ]}
      </div>
    );
  }
}
