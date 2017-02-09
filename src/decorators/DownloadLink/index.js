import createDownloadLinkStrategy from './createDownloadLinkStrategy';
import DownloadLink from '../../components/DownloadLink';

const createDownloadLinkDecorator = (config) => ({
  strategy: createDownloadLinkStrategy(config),
  component: DownloadLink,
});

export default createDownloadLinkDecorator;
