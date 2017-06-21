import { expect } from 'chai';
import Draft from 'draft-js';

import converToHTML from '..';

describe('convertContentStateToHTML', () => {
  it('has link URL in inline styled', () => {
    const rawContentState = {
      entityMap: {},
      blocks: [
        {
          key: 'item2',
          text: 'All Bold https://one-team.com',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [
            {
              length: 29,
              offset: 0,
              style: 'BOLD'
            }
          ],
          entityRanges: [],
          data: {}
        }
      ]
    };
    const contentState = Draft.convertFromRaw(rawContentState);

    const actual = converToHTML(contentState);
    expect(actual).to.equal('<div><strong>All Bold <a href="https://one-team.com" target="_blank">https://one-team.com</a></strong></div>');
  });
  it('Dose Not render IMAGE', () => {
    const rawContentState = {
      entityMap: {
        0: {
          data: {
            src: 'https://one-team.com/og.jpg',
            alt: 'og',
            title: 'og',
            status: 'uploading'
          },
          mutability: 'IMMUTABLE',
          type: 'IMAGE'
        }
      },
      blocks: [
        {
          key: 'item1',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: 'item2',
          text: ' ',
          type: 'atomic',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{
            key: 0,
            length: 1,
            offset: 0
          }],
          data: {}
        },
        {
          key: 'item3',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    };
    const contentState = Draft.convertFromRaw(rawContentState);
    const actual = converToHTML(contentState);
    expect(actual).to.equal('<div><br/></div><figure>&nbsp;</figure><div><br/></div>');
  });
  it('Dose Not render FILE_PLACEHOLDER', () => {
    const rawContentState = {
      entityMap: {
        0: {
          data: {
            status: 'uploading'
          },
          mutability: 'IMMUTABLE',
          type: 'FILE_PLACEHOLDER'
        }
      },
      blocks: [
        {
          key: 'item1',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: 'item2',
          text: ' ',
          type: 'atomic',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{
            key: 0,
            length: 1,
            offset: 0
          }],
          data: {}
        },
        {
          key: 'item3',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    };
    const contentState = Draft.convertFromRaw(rawContentState);
    const actual = converToHTML(contentState);
    expect(actual).to.equal('<div><br/></div><figure>&nbsp;</figure><div><br/></div>');
  });
});

describe('convertContentStateToHTML with options', () => {
  it('entityRenderers', () => {
    const rawContentState = {
      entityMap: {
        0: {
          data: {
            mention: {
              name: 'Shingo Sato',
              userName: 'sugarshin'
            }
          },
          mutability: 'IMMUTABLE',
          type: 'mention'
        }
      },
      blocks: [
        {
          key: 'item1',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        },
        {
          key: 'item2',
          text: 'Shingo Sato',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [{
            key: 0,
            length: 11,
            offset: 0
          }],
          data: {}
        },
        {
          key: 'item3',
          text: '',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    };
    const contentState = Draft.convertFromRaw(rawContentState);

    const actual = converToHTML(contentState, {
      entityRenderers: {
        mention: (entity) => `<span>@${entity.getData().mention.userName}</span>`
      }
    });
    expect(actual).to.equal('<div><br/></div><div><span>@sugarshin</span></div><div><br/></div>');
  });
});
