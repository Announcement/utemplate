var gulp;
var gutil;
var sourcemaps;
var uglify;
var concat;
var rename;
var webpack;

var paths;

gulp = require('gulp');
gutil = require('gulp-util');

sourcemaps = require('gulp-sourcemaps');
uglify = require('gulp-uglify');
concat = require('gulp-concat');

rename = require('gulp-rename');

webpack = require('gulp-webpack');

paths = {
  src: 'src/**/*.js'
};

gulp.task('stream', function() {
  return gulp.src('src/utemplate.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(webpack({
      watch: true
    }))
    .pipe(rename({
      dirname: ".",
      basename: "index",
    }))
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'));
});

gulp.task('compile', function() {
  return gulp.src(paths.src)
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(concat('index.js'))
      .pipe(gulp.dest('.'))
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(rename({
        suffix: '.min'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function(){
  gulp.watch(paths.src, ['compile']);
});

//gulp.task('default', ['stream']);
gulp.task('default', ['compile', 'watch']);
