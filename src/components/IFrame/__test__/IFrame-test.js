import React from 'react';
import { ContentState } from 'draft-js';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import IFrame from '..';

chai.use(chaiEnzyme());

describe('<IFrame />', () => {
  it('renders', () => {
    const contentState = ContentState.createFromText('').createEntity('IFRAME', 'IMMUTABLE', {
      src: 'https://one-team.com',
      width: 400,
      height: 280,
      allowFullScreen: true
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    const block = {
      getEntityAt() {
        return entityKey;
      }
    };
    expect(
      shallow(<IFrame block={block} contentState={contentState} />).html()
    ).to.equal(
      '<iframe src="https://one-team.com" width="400" height="280" allowfullscreen="" class=""></iframe>'
    );
  });
});
