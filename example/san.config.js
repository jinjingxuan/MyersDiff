/**
 * @file san config
 */

const path = require('path');
const dayjs = require('dayjs');
const resolve = pathname => path.resolve(__dirname, pathname);

const outputDir = 'output';
const isProduction = process.env.NODE_ENV === 'production';

const isFCNAP = process.env.FCNAP === 'true'; // 一站式环境
const FCNAP_PATH = `${process.env.FCNAP_CDN_HOST}/${process.env.FCNAP_CDN_PATH}`;

const assetsDir = dayjs().format('YYYYMMDDHHmm');

module.exports = {
    assetsDir,
    publicPath: isFCNAP ? FCNAP_PATH : '/',
    outputDir,
    filenameHashing: isProduction,
    pages: {
        index: {
            entry: './app.js',
            template: './pages.template.ejs',
            filename: 'index.html'
        }
    },
    css: {
        sourceMap: isProduction,
        cssPreprocessor: 'less'
    },
    esModule: true,
    alias: {
        '@assets': resolve('src/assets'),
        '@components': resolve('src/components'),
        '@app': resolve('src/lib/App.js')
    },
    sourceMap: isProduction
};
