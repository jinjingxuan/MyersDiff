const babel = require('@rollup/plugin-babel');
const {terser} = require('rollup-plugin-terser');

module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'esm',
    },
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        terser(),
    ],
};
