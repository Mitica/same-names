
import test from 'ava';
import { WordPrefixComparer } from './word-prefix-comparer';

// test('empty names', t => {
//     const comparer = new WordPrefixComparer();

//     t.is(comparer.compare('', ''), 0);
//     t.is(comparer.compare('', ' '), 0);
//     t.is(comparer.compare(' ', ' '), 0);
// })

test('diff count words', t => {
    const comparer = new WordPrefixComparer();

    t.is(comparer.compare('name', 'name one'), 0);
    t.is(comparer.compare('Name one', 'name'), 0);
    t.is(comparer.compare('name 1', 'name 1 2'), 0);
})

test('same count words', t => {
    const comparer = new WordPrefixComparer();

    t.is(comparer.compare('name', 'name'), 1);
    t.is(comparer.compare('Name one', 'name one'), 1);
    t.is(comparer.compare('name 1', 'name 1'), 1);
    t.true(comparer.compare('Name One', 'Names One') > 0.7);
    t.true(comparer.compare('Vlad Filata', 'Vladimir Filat') > 0.6);
    t.true(comparer.compare('Moldova', 'Moldovei', 'ro') > 0.7);
    t.true(comparer.compare('Republica Moldova', 'Republicii Moldova', 'ro') > 0.7);
    t.true(comparer.compare('Respublica Moldova', 'Republica Moldova', 'ro') === 0);
    t.true(comparer.compare('REP Moldova', 'Rep Moldova') === 1);
    t.true(comparer.compare('RIS Moldova', 'RISE Moldova') === 0);
})
