/**
 * @file word diff
 * @author jinjingxuan
 */
import MyersDiff from './base.js';

const spaceChars = /^\s+$/;

class WordDiff extends MyersDiff {
    equals(left, right) {
        const ignoreCase = this.options.ignoreCase;
        const ignoreSpace = this.options.ignoreSpace;

        // ignore case
        if (ignoreCase) {
            left = left.toLowerCase();
            right = right.toLowerCase();
        }

        // ignore spaces
        if (ignoreSpace && spaceChars.test(left) && spaceChars.test(right)) {
            return true;
        }
        return left === right;
    };

    // separated by a word boundary, the position between a word and a space
    tokenize(string) {
        return string.split(/\b/);
    };
};

const word = new WordDiff();

export default word;
