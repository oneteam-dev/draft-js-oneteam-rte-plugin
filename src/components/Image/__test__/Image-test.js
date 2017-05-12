import React from 'react';
import { ContentState } from 'draft-js';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import Image from '..';

chai.use(chaiEnzyme());

describe('<Image />', () => {
  it('renders', () => {
    const contentState = ContentState.createFromText('').createEntity('IMAGE', 'IMMUTABLE', {
      src: 'https://one-team.com/images/news/2016-06-14-oneteam-launch/product-image.png',
      alt: 'Oneteam OG image',
      'data-original-url': 'https://one-team.com/images/news/2016-06-14-oneteam-launch/product-image.png'
    });
    const entityKey = contentState.getLastCreatedEntityKey();
    const block = {
      getEntityAt() {
        return entityKey;
      }
    };
    expect(
      shallow(<Image block={block} contentState={contentState} />).html()
    ).to.equal(
      '<img src="https://one-team.com/images/news/2016-06-14-oneteam-launch/product-image.png" alt="Oneteam OG image" role="presentation" class=""/>'
    );
  });
});
