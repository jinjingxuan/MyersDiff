import {lineDiff} from '../src/index';

test('line base diff', () => {
    const oldStr = 'ab\nb\n\n\n';
    const newStr = 'cd\nb';
    expect(lineDiff.diff(oldStr, newStr)).toEqual(
        [
            {value: 'ab', option: 'remove'},
            {value: 'cd', option: 'add'},
            {value: 'b', option: 'equal'},
            {value: '', option: 'remove'},
            {value: '', option: 'remove'},
        ]
    );
});

test('line igonre case', () => {
    const oldStr = 'CD\nb\n\n\n';
    const newStr = 'cd\nb';
    expect(lineDiff.diff(oldStr, newStr, {ignoreCase: true})).toEqual(
        [
            {value: 'CD', option: 'equal'},
            {value: 'b', option: 'equal'},
            {value: '', option: 'remove'},
            {value: '', option: 'remove'},
        ]
    );
});

test('line igonre space', () => {
    const oldStr = ' cd \nb\n';
    const newStr = 'cd\n b \n';
    expect(lineDiff.diff(oldStr, newStr, {ignoreSpace: true})).toEqual([]);
});

test('line igonre case and space', () => {
    const oldStr = ' CD \nb\n';
    const newStr = 'cd\n B \n';
    expect(lineDiff.diff(oldStr, newStr, {ignoreCase: true, ignoreSpace: true})).toEqual([]);
});
