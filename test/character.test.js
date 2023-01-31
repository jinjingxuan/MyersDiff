import {characterDiff} from '../src/index';

test('character base diff', () => {
    const oldStr = 'AaaD';
    const newStr = 'aaad';
    expect(characterDiff.diff(oldStr, newStr)).toEqual(
        [
            {value: 'A', option: 'remove'},
            {value: 'aa', option: 'equal'},
            {value: 'D', option: 'remove'},
            {value: 'ad', option: 'add'},
        ]
    );
});

test('character igonre case', () => {
    const oldStr = 'AaaD';
    const newStr = 'aaad';
    expect(characterDiff.diff(oldStr, newStr, {ignoreCase: true})).toEqual([]);
});
