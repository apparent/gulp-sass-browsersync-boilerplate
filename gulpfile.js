var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var cleanCSS 	= require('gulp-clean-css');
var rename 		= require('gulp-rename');
var sourcemaps 	= require('gulp-sourcemaps');

// Static Server + watching scss/html files
gulp.task('serve', function() {

  browserSync.init({
      server: "./public"
  });

  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("scss/styles.scss")
    .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'expanded' //pretty print
    }).on('error', sass.logError))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
  return gulp
    .src("scss/styles.scss")
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
            suffix: '.min',
            extname: ".css"
        }))
    .pipe(gulp.dest('public/css'))
});

gulp.task('default', ['sass', 'serve']);