
import test from 'ava';
import { getSameNames } from './same-names';

test('invalid names', t => {
    t.throws(() => getSameNames('', []));
    t.deepEqual(getSameNames('name', []), []);
    t.deepEqual(getSameNames('name', ['name']), [{ name: 'name', rating: 1 }]);
    t.deepEqual(getSameNames('name', ['name', 'name one']), [{ name: 'name', rating: 1 }]);
    t.deepEqual(getSameNames('name one', ['name', 'name one']), [{ name: 'name one', rating: 1 }]);
    t.deepEqual(getSameNames('name one', ['names one', 'name one']),
        [
            { name: 'names one', rating: 0.875 },
            { name: 'name one', rating: 1 },
        ]
    );
})
