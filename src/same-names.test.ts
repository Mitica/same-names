
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
            { name: 'names one', rating: 0.88 },
            { name: 'name one', rating: 1 },
        ]
    );
    t.deepEqual(getSameNames('Владимир Путин', ['Владимира Путина', 'Владимира Путине', 'Владимира Путиным', 'Putin']),
        [
            { name: 'Владимира Путина', rating: 0.87 },
            { name: 'Владимира Путине', rating: 0.87 },
            { name: 'Владимира Путиным', rating: 0.81 },
        ]
    );
    const snames = getSameNames('R. Moldova', ['Republica Moldova', 'RISE Moldova']);
    t.deepEqual(snames, []);

    t.deepEqual(getSameNames('Америка', ['Америку', 'Америкой', 'Американски']),
        [{ "name": "Америку", "rating": 0.86 }, { "name": "Америкой", "rating": 0.75 }, { "name": "Американски", "rating": 0.64 }]);
})

test('Don`t allow numbers', t => {
    t.deepEqual(getSameNames('name24', ['name22']), []);
});