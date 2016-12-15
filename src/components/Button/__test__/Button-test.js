import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Button from '..';

chai.use(sinonChai);
chai.use(chaiEnzyme());

describe('<Button />', () => {
  it('renders', () => {
    expect(
      shallow(<Button theme={{}}>children</Button>).html()
    ).to.equal(
      '<span class="toolbar-button"><span class="toolbar-button__inner"><span class="toolbar-button__body">children</span></span></span>'
    );
  });
  it('simulate click', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Button theme={{}} onClick={onClick}>children</Button>);
    wrapper.find('.toolbar-button').simulate('click');
    expect(onClick.calledOnce).to.be.true();
  });
  it('simulate mouseDown', () => {
    const onMouseDown = sinon.spy();
    const wrapper = mount(<Button theme={{}} onMouseDown={onMouseDown}>children</Button>);
    wrapper.find('.toolbar-button').simulate('mouseDown');
    expect(onMouseDown.calledOnce).to.be.true();
  });
});
