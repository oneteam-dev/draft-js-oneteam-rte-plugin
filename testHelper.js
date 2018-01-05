import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
import hook from 'css-modules-require-hook';
import { jsdom } from 'jsdom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

process.env.NODE_ENV = 'test';

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).concat(
  'HTMLElement',
  'HTMLAnchorElement'
).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

Enzyme.configure({ adapter: new Adapter() });

chai.use(dirtyChai);
chai.use(chaiEnzyme());
