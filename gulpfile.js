const { src, dest, parallel, watch, series } = require('gulp');
const Less = require('gulp-less');
const Rename = require('gulp-rename');
const Path = require('path');
const Csso = require('gulp-csso');
const Clean = require('gulp-clean');
const GulpIf = require('gulp-if');
const ESLint = require('gulp-eslint');
const Alias = require('gulp-wechat-weapp-src-alisa');
const ts = require("gulp-typescript");
const tsProject = ts.createProject(Path.resolve(__dirname, './tsconfig.json'));

// 匹配文件路径
const path = {
    lessPath: ['src/**/*.less', 'src/**/*.wxss', '!src/theme/**',],
    jsPath: ['src/**/*.ts'],
    copy: ['src/**/*.wxml', 'src/**/*.json', 'src/**/*.wxs'],
    jsonPath: 'src/**/*.json',
};

const dist = 'miniprogram/'

function _join(dirname) {
    return Path.join(process.cwd(), 'src', dirname);
}

// 路径别名配置
const aliasConfig = {
    '@Utils': _join('utils'),
    '@Components': _join('components'),
    '@lessVar': _join('theme/variable.less'),
    '@wxsVar': _join('theme/variable.wxs'),
    '@dynamic': _join('theme/dynamic.wxs'),
};

function wxss() {
    return src(path.lessPath, { base: 'src/' })
        .pipe(Alias(aliasConfig))
        .pipe(Less())
        .pipe(GulpIf(process.env.NODE_ENV === 'production', Csso()))
        .pipe(Rename({
            extname: '.wxss',
        }))
        .pipe(dest(dist));
}


function js() {
    return src(path.jsPath)
        .pipe(Alias(aliasConfig))
        // .pipe(ESLint())
        // .pipe(ESLint.format())
        .pipe(tsProject())
        .pipe(dest(dist));
}

function copy() {
    return src(path.copy)
        .pipe(Alias(aliasConfig))
        .pipe(dest(dist));
}

function clean() {
    return src(dist, { read: false, allowEmpty: true })
        .pipe(Clean());
}


watch(path.lessPath, wxss);
watch(path.jsPath, js);
watch(path.copy, copy);

// exports.build = series(clean, parallel(copy, wxss, js));
exports.default = series(clean, parallel(copy, wxss, js));