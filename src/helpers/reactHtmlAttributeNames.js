import reactHtmlAttributes from 'react-html-attributes';
import omit from 'lodash/omit';
import flatten from 'lodash/flatten';
import values from 'lodash/values';
import uniq from 'lodash/uniq';

const names = uniq(
  flatten(
    values(
      omit(reactHtmlAttributes, 'elements')
    )
  )
);

export default names;
