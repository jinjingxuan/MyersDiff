import {wordDiff} from '../src/index';

test('word base diff', () => {
    const oldStr = 'aaab ad';
    const newStr = 'AaaB      ad';
    expect(wordDiff.diff(oldStr, newStr)).toEqual(
        [
            {value: 'aaab ', option: 'remove'},
            {value: 'AaaB      ', option: 'add'},
            {value: 'ad', option: 'equal'},
        ]
    );
});

test('word igonre space', () => {
    const oldStr = 'aaab ad';
    const newStr = 'AaaB      ad';
    expect(wordDiff.diff(oldStr, newStr, {ignoreSpace: true})).toEqual(
        [
            {value: 'aaab', option: 'remove'},
            {value: 'AaaB', option: 'add'},
            {value: ' ad', option: 'equal'},
        ]
    );
});

test('word igonre case and space', () => {
    const oldStr = 'aaab ad';
    const newStr = 'AaaB      ad';
    expect(wordDiff.diff(oldStr, newStr, {ignoreCase: true, ignoreSpace: true})).toEqual([]);
});
