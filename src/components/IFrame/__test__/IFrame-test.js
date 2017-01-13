import React from 'react';
import { Entity } from 'draft-js';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import IFrame from '..';

chai.use(chaiEnzyme());

describe('<IFrame />', () => {
  it('renders', () => {
    const entityKey = Entity.create('IFRAME', 'IMMUTABLE', {
      src: 'https://one-team.com',
      width: 400,
      height: 280,
      allowFullScreen: true
    });
    const block = {
      getEntityAt() {
        return entityKey;
      }
    };
    expect(
      shallow(<IFrame block={block} />).html()
    ).to.equal(
      '<iframe src="https://one-team.com" width="400" height="280" allowfullscreen="" class=""></iframe>'
    );
  });
});
