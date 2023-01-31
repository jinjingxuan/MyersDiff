/**
 * @file base diff
 * @author jinjingxuan
 */
class MyersDiff {
    /**
     * @param {string} oldString
     * @param {string} newString
     * @param {Object} options - optional parameters
     * @return {array} diff result
     * @example diff('ABCABBA', 'CBABAC')
     */
    diff(oldString, newString, options = {}) {
        this.options = options;

        this.oldString = this.tokenize(oldString);
        this.newString = this.tokenize(newString);

        const {traceMap, editLength} = this.execEditPath();
        const snakes = this.trace(traceMap, editLength);
        const path = this.getEditPath(snakes);
        return this.extractCommonPath(path);
    };

    /**
     * execute edit path in edit graph, return trace map.
     * trace map contains all "k" in the "d" the farthest x value.
     * The structure is {k: x}. For detail, see README.
     * @return {array} trace map
     */
    execEditPath() {
        const oldLen = this.oldString.length;
        const newLen = this.newString.length;
        const maxEditLength = oldLen + newLen;

        // V contains the endpoints of the furthest reaching D-paths.
        const V = [];

        // set start point (0, -1)
        V[1] = 0;
        const traceMap = [{'1': 0}];

        // current edit length
        let editLength;

        for (editLength = 0; editLength <= maxEditLength; editLength++) {
            let tmpV = {};

            // whether to stop outside loop
            let outSideLoopFlag = false;

            for (let diagonalCurrent = -1 * editLength; diagonalCurrent <= editLength; diagonalCurrent += 2) {
                let x;

                // if prev step direction is down
                if (
                    diagonalCurrent === -1 * editLength
                    || (diagonalCurrent !== editLength && V[diagonalCurrent + 1] > V[diagonalCurrent - 1])
                ) {
                    x = V[diagonalCurrent + 1];
                }
                else {
                    x = V[diagonalCurrent - 1] + 1;
                }

                // calculate y
                let y = x - diagonalCurrent;

                // if equal, go diagonal
                while (x < oldLen && y < newLen && this.equals(this.oldString[x], this.newString[y])) {
                    x++;
                    y++;
                }

                V[diagonalCurrent] = x;
                tmpV[diagonalCurrent] = x;

                // reach destination
                if (x === oldLen && y === newLen) {
                    traceMap[editLength] = tmpV;
                    outSideLoopFlag = true;
                    break;
                }
            }
            traceMap[editLength] = tmpV;

            if (outSideLoopFlag) {
                break;
            }
        }

        return {traceMap, editLength};
    };

    /**
     * Trace from back to front, return coordinate point array also called snakes.
     * example snakes: [
     * [ 0, 0, 1, 0, 1, 0 ],
     * [ 1, 0, 2, 0, 3, 1 ],
     * [ 3, 1, 3, 2, 5, 4 ],
     * [ 5, 4, 6, 4, 7, 5 ],
     * [ 7, 5, 7, 6, 7, 6 ],
     * ]
     * optimal path:
     * (0,0) => (1,0) => (2,0) => (3,1) => (3,2) => (5,4) => (6,4) => (7,5) => (7,6)
     * @param {array} traceMap
     * @param {number} editLength
     * @return {array} snakes
     */
    trace(traceMap, editLength) {
        const oldLen = this.oldString.length;
        const newLen = this.newString.length;

        const snakes = [];
        const pos = {x: oldLen, y: newLen};

        while (editLength > 0) {
            const V = traceMap[editLength];
            const VPrev = traceMap[editLength - 1];

            const diagonalCurrent = pos.x - pos.y;
            const xEnd = V[diagonalCurrent];
            const yEnd = xEnd - diagonalCurrent;

            const down = diagonalCurrent === -1 * editLength
                || (diagonalCurrent !== editLength && VPrev[diagonalCurrent + 1] > VPrev[diagonalCurrent - 1]);

            const diagonalPrev = down ? diagonalCurrent + 1 : diagonalCurrent - 1;

            // prev point
            const xStart = VPrev[diagonalPrev];
            const yStart = xStart - diagonalPrev;

            // start go diagonal point, if not go diagonal then xMid === xEnd.
            const xMid = down ? xStart : xStart + 1;
            const yMid = xMid - diagonalCurrent;

            snakes.unshift([xStart, yStart, xMid, yMid, xEnd, yEnd]);

            pos.x = xStart;
            pos.y = yStart;

            editLength--;
        }

        return snakes;
    };

    /**
     * Get editPath according to snakes.
     * example path: [
     * { value: 'A', option: 'remove' },
     * { value: 'B', option: 'add' },
     * ]
     * @param {array} snakes
     * @return {array} diff path
     */
    getEditPath(snakes) {
        const oldString = this.oldString;
        const newString = this.newString;

        let newPos = 0;
        const editPathResult = [];

        snakes.forEach((snake, index) => {
            let startPoint = {x: snake[0], y: snake[1]};
            let midPoint = {x: snake[2], y: snake[3]};
            let endPoint = {x: snake[4], y: snake[5]};

            let oldPos = startPoint.x;

            // go diagonal
            if (index === 0 && startPoint.x !== 0) {
                for (let i = 0; i < startPoint.x; i++) {
                    editPathResult.push({value: oldString[i], option: 'equal'});
                    newPos++;
                }
            }

            // delelte
            if (midPoint.x - startPoint.x === 1) {
                editPathResult.push({value: oldString[oldPos], option: 'remove'});
                oldPos = midPoint.x;
            }

            // add
            else if (midPoint.y - startPoint.y === 1) {
                editPathResult.push({value: newString[newPos], option: 'add'});
                newPos++;
            }

            // equal
            for (let i = 0; i < endPoint.x - oldPos; i++) {
                editPathResult.push({value: oldString[oldPos + i], option: 'equal'});
                newPos++;
            }
        });

        return editPathResult;
    };

    // left is equal to right
    equals(left, right) {
        return left === right;
    };

    // Separate string into independent fragments for comparison.
    tokenize(string) {
        return string.split('');
    };

    /**
     * Extract items with the same operation
     * before extract:
     * { value: 'A', option: 'remove' },
     * { value: 'B', option: 'remove' },
     *
     * after extract:
     * { value: 'AB', option: 'remove' },
     *
     * @param {path} path
     * @return {path} after extract path
     */
    extractCommonPath(path) {
        if (!path.length) {
            return [];
        }

        const extractCommonPath = [];
        extractCommonPath.push(path[0]);

        for (let i = 1; i < path.length; i++) {
            const extractLen = extractCommonPath.length - 1;
            if (path[i].option === extractCommonPath[extractLen].option) {
                extractCommonPath[extractLen].value += path[i].value;
            }
            else {
                extractCommonPath.push(path[i]);
            }
        }
        return extractCommonPath;
    };
}

export default MyersDiff;
