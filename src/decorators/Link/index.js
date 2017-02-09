import createLinkStrategy from './createLinkStrategy';
import Link from '../../components/Link';

const createLinkDecorator = (config) => ({
  strategy: createLinkStrategy(config),
  component: Link,
});

export default createLinkDecorator;
