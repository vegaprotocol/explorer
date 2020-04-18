import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as ENV from '../../config/uvu/env';

import TwoColumnData from './TwoColumnData.svelte';

test.before(ENV.setup);
test.before.each(ENV.reset);

test('Renders a basic dl', () => {
    const rows = [{
        title: 'Test',
        value: 'Data'
    }]

    const { container, window } = ENV.render(TwoColumnData, { rows });
    const dl = container.querySelectorAll('dl');
    assert.equal(dl.length, 1, 'There is a definition list');

    const dt = container.querySelectorAll('dt');
    assert.equal(dt.length, 1, 'There is one title');
    assert.equal(dt[0].textContent.trim(), rows[0].title);

    const dd = container.querySelectorAll('dd');
    assert.equal(dd.length, 1, 'There is one data row');
    assert.equal(dd[0].textContent.trim(), rows[0].value);
});

test('Renders - in place of data with no value', () => {
    const rows = [
        { title: 'Test', type: 'party' },
        { title: 'Test', type: 'hash' },
        { title: 'Test', type: 'order' },
        { title: 'Test', type: 'order-reference' },
        { title: 'Test', type: 'market' },
        { title: 'Test', type: 'raw' },
        { title: 'Test', type: 'price' },
    ]

    const { container, window } = ENV.render(TwoColumnData, { rows });
    const dd = container.querySelectorAll('dd');

    const res = []
    dd.forEach(d => {
        if (res.indexOf(d.textContent.trim()) == -1) {
            res.push(d.textContent.trim())
        }
    })
    assert.equal(res.length, 1, 'All rows have the same value');
    assert.equal(res[0], '-', 'Theyre all -');
});


test('Handles a lack of data gracefully', () => {
    const { container } = ENV.render(TwoColumnData);
    const dl = container.querySelectorAll('dl');
    assert.equal(dl.length, 0, 'There is no definition list');
});

test.run();
