import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as ENV from '../../config/uvu/env';

import BlockLink from './BlockLink.svelte';

test.before(ENV.setup);
test.before.each(ENV.reset);

test('Parses the block number out of the order id', () => {
    const { container } = ENV.render(BlockLink, { id: 'v0001-100' });
    const links = container.querySelectorAll('a');
    assert.equal(links.length, 1, 'There is a link');

    const a = links[0];
    assert.equal(a.href, '/blocks/1', 'HREF attribute is correct')
    assert.equal(a.text, '1', 'Text is set to block number')
});

test('Parses the block number out of the trade id', () => {
    const { container } = ENV.render(BlockLink, { id: 'v000279-100' });
    const links = container.querySelectorAll('a');
    assert.equal(links.length, 1, 'There is a link');

    const a = links[0];
    assert.equal(a.href, '/blocks/279', 'HREF attribute is correct');
    assert.equal(a.text, '279', 'Text is set to block number');
});

test('Handles a lack of id gracefully', () => {
    const { container } = ENV.render(BlockLink);
    const links = container.querySelectorAll('a');
    assert.equal(links.length, 0, 'There is no link');
});

test.run();
