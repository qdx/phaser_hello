//var gulp = require('gulp');
//var ts = require('gulp-typescript');
//var tsProject = ts.createProject('tsconfig.json');

//gulp.task('default', function () {
    //return tsProject.src()
        //.pipe(tsProject())
        //.js.pipe(gulp.dest('dist'));
//});

//----------------------------------------------------

//var gulp = require('gulp');
//var browserify = require('browserify');
//var source = require('vinyl-source-stream');
//var tsify = require('tsify');
//var paths = {
    //pages: ['src/*.html']
//};

//gulp.task('copy-html', function () {
    //return gulp.src(paths.pages)
        //.pipe(gulp.dest('dist'));
//});

//gulp.task('default', ['copy-html'], function () {
    //return browserify({
        //basedir: '.',
        //debug: true,
        //entries: ['src/main.ts'],
        //cache: {},
        //packageCache: {}
    //})
    //.plugin(tsify)
    //.bundle()
    //.pipe(source('bundle.js'))
    //.pipe(gulp.dest('dist'));
//});

//----------------------------------------------------

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var gutil = require('gulp-util');
var del = require('del');
var paths = {
    pages: ['src/*.html'],
    assets: ['assets/*'],
    phaser: ['bower_components/phaser/build/phaser.js']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('copy-assets', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-html', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy-libs', function () {
    return gulp.src(paths.phaser)
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return del(['dist/*.js'])
})

gulp.task('default', ['copy-html', 'clean', 'copy-assets', 'copy-libs'], bundle);

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
}

watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);

