import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import editExceptOuterLink, { isolate, retrieve, createPlaceholder } from '../editExceptOuterLink';

chai.use(sinonChai);

describe('editExceptOuterLink', () => {
  const raw = `
some :x: text
<a href="http://example.com/:x:/a" target="_blank">http://example.com/:x:/a</a> <a href="https://example.com/:x:/b" target="_blank">https://example.com/:x:/b</a>
<a href="http://example.com/:x:/a" target="_blank">http://example.com/:x:/a</a>
`;
  const isolated = `
some :x: text
<a href="http://${createPlaceholder(0)}" target="_blank">http://${createPlaceholder(1)}</a> <a href="http://${createPlaceholder(2)}" target="_blank">http://${createPlaceholder(3)}</a>
<a href="http://${createPlaceholder(4)}" target="_blank">http://${createPlaceholder(5)}</a>
`;
  const placeholders = [
    {
      marking: `http://${createPlaceholder(0)}`,
      replaced: 'http://example.com/:x:/a',
    },
    {
      marking: `http://${createPlaceholder(1)}`,
      replaced: 'http://example.com/:x:/a',
    },
    {
      marking: `http://${createPlaceholder(2)}`,
      replaced: 'https://example.com/:x:/b',
    },
    {
      marking: `http://${createPlaceholder(3)}`,
      replaced: 'https://example.com/:x:/b',
    },
    {
      marking: `http://${createPlaceholder(4)}`,
      replaced: 'http://example.com/:x:/a',
    },
    {
      marking: `http://${createPlaceholder(5)}`,
      replaced: 'http://example.com/:x:/a',
    },
  ];

  it('isolate', () => {
    expect(isolate(raw)).to.deep.equal({ isolated, placeholders });
  });

  it('retrieve', () => {
    expect(retrieve(isolated, placeholders)).to.equal(raw);
  });

  it('editExceptOuterLink', () => {
    /* eslint-disable max-len */
    expect(editExceptOuterLink({
      string: raw,
      fn: (s) => s.replace(/:[a-z]+?:/g, 'replaced')
    })).to.equal(`
some replaced text
<a href="http://example.com/:x:/a" target="_blank">http://example.com/:x:/a</a> <a href="https://example.com/:x:/b" target="_blank">https://example.com/:x:/b</a>
<a href="http://example.com/:x:/a" target="_blank">http://example.com/:x:/a</a>
`);
    /* eslint-enable max-len */
  });
});
