import { LINK } from '../../constants';
import createFindEntitiesBy from '../../utils/createFindEntitiesBy';

const createLinkStrategy = (/* config: Config */): Function => createFindEntitiesBy(LINK);

export default createLinkStrategy;
