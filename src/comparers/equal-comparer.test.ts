
import test from 'ava';
import { EqualComparer } from './equal-comparer';

test('empty names', t => {
    const comparer = new EqualComparer();
    t.is(comparer.compare('', ''), 1);
    t.is(comparer.compare('', ' '), 0);
})

test('equal names', t => {
    const comparer = new EqualComparer();
    t.is(comparer.compare(' ', ' '), 1);
    t.is(comparer.compare('a', 'a'), 1);
    t.is(comparer.compare('A', 'a'), 0);
    t.is(comparer.compare('aI', 'ai'), 0);
    t.is(comparer.compare('name', 'name'), 1);
})
