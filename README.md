# same-names

A nodejs module for identifying same names.

## Usage

```js
import getSameNames from 'same-names'

const putin = 'Владимир Путин';
const putinSameNames = getSameNames(putin, ['Владимира Путина', 'Владимира Путине', 'Владимира Путиным', 'Putin']);
//[
//    { name: 'Владимира Путина', rating: 0.87 },
//    { name: 'Владимира Путине', rating: 0.87 },
//    { name: 'Владимира Путиным', rating: 0.81 },
//]

```

## API

### (name: string, names: string[]): SameName[]

Finds same names in `names` for the given `name`.

```ts
type SameName = {
    name: string
    rating: number
}
```

`rating` is between `0` and `1`.
