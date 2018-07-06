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
            if (name1Words[i] === name2Words[i]) {
                rating.addWordSameChars(name1Words[i].length, name1Words[i], name2Words[i], wordsCount, name1, name2);
                continue;
            }
            const sameChars = compareChars(name1Words[i], name2Words[i]);
            // !
            if (sameChars < name1Words[i].length / 2) {
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
