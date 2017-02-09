import { DOWNLOAD_LINK } from '../../constants';
import createFindEntitiesBy from '../../utils/createFindEntitiesBy';

const createDownloadLinkStrategy = (/* config: Config */): Function => createFindEntitiesBy(DOWNLOAD_LINK);

export default createDownloadLinkStrategy;
