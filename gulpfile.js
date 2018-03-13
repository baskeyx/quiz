'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const maps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const replace = require('gulp-replace');

// convert sass into css and create source map
gulp.task('sass', function () {
  gulp.src(['sass/*.scss'])
    .pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', function (err) {
        console.log(err.toString());

        this.emit('end');
    })
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

// concatonate all js in the scripts directory and output to js
gulp.task('concat', function () {
  gulp.src('scripts/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream({match: '**/*.js'}));
});

// minify JavaScript
gulp.task('compress', function () {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
});


gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// replace scripts with minified version and minify html markup
gulp.task('html', function (){
  gulp.src('*.html')
    .pipe(replace('js/script.js', 'js/script.min.js'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// move files to dist
gulp.task('move', function (){
  gulp.src('img/*')
  .pipe(gulp.dest('dist/img'));
  gulp.src('css/*')
  .pipe(gulp.dest('dist/css'));
})

gulp.task('build', ['html', 'compress', 'move']);

gulp.task('watch', function(){
	gulp.watch('sass/**', ['sass']);
  gulp.watch('scripts/**',['concat']);
});

gulp.task('default', ['sass','concat','watch','browser-sync']);
