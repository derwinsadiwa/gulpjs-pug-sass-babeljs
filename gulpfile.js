var gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    autoprefixer    = require('gulp-autoprefixer'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    babel           = require("gulp-babel");

/* SASS Transpiler */

gulp.task('sass', function () {
  return gulp.src('./app/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
});

/* ES6 Transpiler */

gulp.task('es6', function () {
  return gulp.src('./app/es6/main.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});

/* Static Server BrowserSync */

gulp.task('serve', ['sass', 'es6'], function() {

    browserSync.init({
      server: './dist'
    });

    gulp.watch('./app/sass/**/*.scss', ['sass']);
    gulp.watch('./app/es6/*.js', ['es6']);

    gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

/* Task Default */

gulp.task('default', ['serve']);
