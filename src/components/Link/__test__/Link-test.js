import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import Link from '..';

chai.use(chaiEnzyme());

describe('<Link />', () => {
  it('renders', () => {
    expect(
      shallow(<Link>children</Link>).html()
    ).to.equal(
      '<span class="link">children</span>'
    );
  });
});
