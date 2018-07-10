import { NameComparer } from "./comparer";
import { Rating } from "./rating";

const WORD_SPLIT = /\s+/g;

export class WordPrefixComparer extends NameComparer {
    compare(name1: string, name2: string): number {
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
            if (!sameWords(sameChars, word1, word2)) {
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

function sameWords(same: number, word1: string, word2: string) {
    if (same < 2 || same < Math.max(word1.length, word2.length) / 2) {
        return false;
    }
    let rests = [word1.substr(same - 1), word2.substr(same - 1)];
    for (let rest of rests) {
        if (rest && rest.toLowerCase() !== rest) {
            return false;
        }
    }

    return true;
}

// function startWithUpper(word: string) {
//     return word[0].toUpperCase() + word.substr(1).toLowerCase();
// }
