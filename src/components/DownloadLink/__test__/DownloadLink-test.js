import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import DownloadLink from '..';

chai.use(chaiEnzyme());

describe('<DownloadLink />', () => {
  it('renders', () => {
    expect(
      shallow(<DownloadLink>children</DownloadLink>).html()
    ).to.equal(
      '<span class="download-link">children</span>'
    );
  });
});
