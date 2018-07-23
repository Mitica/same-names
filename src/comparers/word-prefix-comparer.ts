import { NameComparer } from "./comparer";
import { Rating } from "./rating";
const DATA: { [lang: string]: (string | { value: string })[] } = require('../../data/accepted-suffixes.json');
const ACCEPTED_SUFFIXES: AcceptedSuffixes = {};

Object.keys(DATA).forEach(lang => {
    const data = DATA[lang].map(item => typeof item === 'string' ? item : item.value);
    ACCEPTED_SUFFIXES[lang] = data;
});

const WORD_SPLIT = /\s+/g;

export class WordPrefixComparer extends NameComparer {
    compare(name1: string, name2: string, lang?: string): number {
        const name1Words = name1.trim().split(WORD_SPLIT);
        const name2Words = name2.trim().split(WORD_SPLIT);

        if (name1Words.length !== name2Words.length || name1Words.length === 0) {
            return 0;
        }
        const rating = new Rating();
        const wordsCount = name1Words.length;

        for (let i = 0; i < wordsCount; i++) {
            const word1 = name1Words[i];
            const word2 = name2Words[i];
            if (word1 === word2 || wordsCount > 1 && word1.toLowerCase() === word2.toLowerCase()) {
                rating.addWordSameChars(name1Words[i].length, word1, word2, wordsCount, name1, name2);
                continue;
            }

            const sameChars = compareChars(word1, word2);
            // !
            if (!sameWords(sameChars, word1, word2, lang || '')) {
                return 0;
            }
            rating.addWordSameChars(sameChars, name1Words[i], name2Words[i], wordsCount, name1, name2);
        }

        return rating.getRating();
    }
}

function compareChars(word1: string, word2: string): number {
    let matchCount = 0;
    for (let i = 0; i < word1.length && i < word2.length; i++) {
        if (word1[i] === word2[i]) {
            matchCount++;
        } else {
            break;
        }
    }
    return matchCount;
}

function sameWords(same: number, word1: string, word2: string, lang?: string) {
    if (same < 2 || same < Math.max(word1.length, word2.length) / 2) {
        return false;
    }
    const suffixes = [word1.substr(same), word2.substr(same)].filter(item => !!item);

    if (lang) {
        const langSuffixes = ACCEPTED_SUFFIXES[lang];
        if (langSuffixes) {
            for (let suffix of suffixes) {
                if (~langSuffixes.indexOf(suffix)) {
                    return true;
                }
            }
            return false;
        }
    }

    for (let suffix of suffixes) {
        if (suffix.toLowerCase() !== suffix) {
            return false;
        }
        if (/\d/.test(suffix)) {
            return false;
        }
    }

    return true;
}

type AcceptedSuffixes = {
    [lang: string]: string[]
}

// function startWithUpper(word: string) {
//     return word[0].toUpperCase() + word.substr(1).toLowerCase();
// }
