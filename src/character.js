/**
 * @file character diff
 * @author jinjingxuan
 */
import MyersDiff from './base.js';

class CharacterDiff extends MyersDiff {
    equals(left, right) {
        const ignoreCase = this.options.ignoreCase;
        if (ignoreCase) {
            return left.toLowerCase() === right.toLowerCase();
        }
        return left === right;
    };
};

const character = new CharacterDiff();

export default character;