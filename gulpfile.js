var gulp     = require('gulp'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-uglifycss'),
    minify       = require('gulp-minify'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    less         = require('gulp-less'),
    cache        = require('gulp-cache');

gulp.task('browser-sync', function() {
    var files = [
        '**/*.html',
        '**/*.{png,jpg,gif}'
    ];
    browserSync.init(files, {
        proxy: 'http://localhost/hangman',
           port: 8080,
        injectChanges: true
    });
});
gulp.task('styles', function () {
    gulp.src('assets/less/*.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('assets/css_dev'))
        .pipe(reload({stream:true}))
        .pipe(notify({ message: 'Styles task complete', onLast: true }))
});
gulp.task('stylesprd', function(){
    gulp.src('assets/css_dev/*.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss({
            maxLineLen: 80
        }))
        .pipe(gulp.dest('assets/css_prd'))
});

gulp.task('images', function() {
    return  gulp.src(['assets/img/*.{png,jpg,gif}'])
        .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img/compiledimg/'))
        .pipe( notify( {message: 'Images task complete', onLast: true }));
});
gulp.task('clear', function () {
    cache.clearAll();
});
gulp.task('default', ['styles', 'stylesprd', 'images', 'browser-sync'], function () {
    gulp.watch('assets/img/raw/**/*', ['images']);
    gulp.watch('assets/less/*.less', ['styles']);
    gulp.watch('assets/css_dev/*.css', ['stylesprd']);
    gulp.watch('assets/js/newjs/*.js', ['scriptsJs', browserSync.reload]);
});
