
export class Rating {
    private rating = 0;

    addWordSameChars(same: number, word1: string, word2: string, wordsCount: number, name1: string, name2: string) {
        const nameChars = Math.max(name1.length, name2.length) - (wordsCount - 1);
        const maxWordLength = Math.max(word1.length, word2.length);
        // const minWordLength = Math.min(word1.length, word2.length);
        // console.log(name1, name2, word1, word2, same, nameChars, maxWordLength, maxWordLength / nameChars)
        this.rating += (same / maxWordLength) * (maxWordLength / nameChars);
    }

    getRating() {
        return this.rating;
    }
}
