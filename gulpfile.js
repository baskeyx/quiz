const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

//sass
gulp.task('sass', function () {
    gulp.src(['sass/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

// browserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

// javaScript
gulp.task('lint', function() {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('compress', function () {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('html-min', function(){
  gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('css',['sass']);

gulp.task('js', ['lint', 'compress']);

gulp.task('watch', function(){
	gulp.watch('sass/**', ['sass']);
  gulp.watch('js/**',['js']);
  gulp.watch('*.html',['html-min']);
});

gulp.task('default', ['browser-sync', 'watch']);
