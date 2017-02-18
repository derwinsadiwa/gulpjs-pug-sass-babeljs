var gulp            = require('gulp'),
    browserSync     = require('browser-sync').create(),
    pug             = require('gulp-pug'),
    autoprefixer    = require('gulp-autoprefixer'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    babel           = require("gulp-babel");

/* Pug Transpiler */

gulp.task('pug', function () {
  return gulp.src('./src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

/* SASS Transpiler */

gulp.task('sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(browserSync.stream());
});

/* ES6 Transpiler */

gulp.task('es6', function () {
  return gulp.src('./src/es6/main.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(browserSync.stream());
});

/* Static Server BrowserSync */

gulp.task('serve', ['pug', 'sass', 'es6'], function() {

    browserSync.init({
      server: './dist'
    });

    gulp.watch('./src/**/*.pug', ['pug']);
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/es6/*.js', ['es6']);

    gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

/* Task Default */

gulp.task('default', ['serve']);
