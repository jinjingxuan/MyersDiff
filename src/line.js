/**
 * @file line diff
 * @author jinjingxuan
 */
import MyersDiff from './base.js';

const lineSeparateChars = /\n|\r\n/;

class LineDiff extends MyersDiff {
    equals(left, right) {
        const ignoreCase = this.options.ignoreCase;
        // ignore case
        if (ignoreCase) {
            left = left.toLowerCase();
            right = right.toLowerCase();
        }
        return left === right;
    };

    // separated by line separators
    tokenize(string) {
        const lines = string.split(lineSeparateChars);
        const ignoreSpace = this.options.ignoreSpace;

        if (!lines[lines.length - 1]) {
            lines.pop();
        }

        const resultLines = [];
        // Merge the content and line separators
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            if (ignoreSpace) {
                line = line.trim();
            }
            resultLines.push(line);
        }
        return resultLines;
    };

    // \n is not need to merge in line diff.
    extractCommonPath(path) {
        return path;
    };
};

const line = new LineDiff();

export default line;
