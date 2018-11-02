// @flow
import { randomBytes } from 'crypto';

const URL_PATTERN = new RegExp("(https?|ftp)(:\\/\\/[-_.!~*\\'()a-zA-Z0-9;\\/?:\\@&=+\\$,%#]+)", 'im');

type Placeholder = {
  marking: string,
  replaced: string,
};

type Isolation = {
  isolated: string,
  placeholders: Placeholder[],
}

type EditExceptOuterLinkParameters = {
  string: string,
  fn: (s: string) => string,
}

const placeholderPrefix = randomBytes(16).toString('hex');

export function createPlaceholder(id: number): string {
  return `replacement-${placeholderPrefix}-${id}.com/placeholder`;
}

export function isolate(raw: string): Isolation {
  const placeholders: Placeholder[] = [];

  let isolated = raw;
  for (
    let i = 0, matched = isolated.match(URL_PATTERN);
    matched;
    matched = isolated.match(URL_PATTERN)
  ) {
    const marking = createPlaceholder(i++);
    const replaced = matched[0];
    isolated = isolated.replace(replaced, marking);
    placeholders.push({
      marking,
      replaced,
    });
  }

  // add 'http://' prefix to placeholders for url management features.
  placeholders.forEach((set) => {
    const marking = `http://${set.marking}`;
    isolated = isolated.replace(set.marking, marking);
    set.marking = marking; // eslint-disable-line no-param-reassign
  });

  return {
    isolated,
    placeholders,
  };
}

export function retrieve(isolated: string, placeholders: Placeholder[]): string {
  return placeholders.reduce(
    (a, { marking, replaced }) => a.replace(marking, replaced),
    isolated,
  );
}

export default function editExceptOuterLink({ string, fn }: EditExceptOuterLinkParameters): string {
  const { isolated, placeholders } = isolate(string);
  const edited = fn(isolated);
  return retrieve(edited, placeholders);
}
