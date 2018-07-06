import { ISameNamesOptions, DEFAULT_OPTIONS } from "./options";
import { INameComparer } from "./comparers/comparer";
import { EqualComparer } from "./comparers/equal-comparer";
import { WordPrefixComparer } from "./comparers/word-prefix-comparer";

export function getSameNames(name: string, names: string[], options?: ISameNamesOptions) {
    if (!isValidName(name)) {
        throw new Error(`Invalid 'name'=${name}`);
    }

    name = normalizeName(name);

    if (!names || !names.length) {
        return [];
    }

    names = names
        .filter(item => isValidName(item))
        .map(item => normalizeName(item));

    if (!names || !names.length) {
        return [];
    }

    options = { ...DEFAULT_OPTIONS, ...options };

    const comparers = getComparers(options);

    const sameNames: SameName[] = [];

    for (let oneName of names) {
        for (let comparer of comparers) {
            const rating = comparer.compare(name, oneName);
            if (rating > 0.5) {
                sameNames.push({
                    name: oneName,
                    rating: parseFloat(rating.toFixed(2)),
                });
                break;
            }
        }
    }

    return sameNames;
}

export type SameName = {
    name: string
    rating: number
}

function getComparers(_options: ISameNamesOptions): INameComparer[] {
    const equal = new EqualComparer();
    const wordPrefix = new WordPrefixComparer();
    return [
        equal,
        wordPrefix
    ];
}

function isValidName(name: string) {
    return !!name && !!name.trim();
}

function normalizeName(name: string) {
    return name.replace(/\s+/g, ' ').trim();
}
