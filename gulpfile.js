// nakPostCSS gulpfile by @nabaroa

const gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssimport = require('postcss-import'),
  customproperties = require('postcss-custom-properties'),
  apply = require('postcss-apply'),
  mixins = require('postcss-mixins'),
  nested = require('postcss-nested'),
  customMedia = require("postcss-custom-media")
  nano = require('gulp-cssnano'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync'),
  image = require('gulp-image'),
  runSequence = require('run-sequence');

gulp.task('css', () =>{
  const processors = [
    cssimport,
    autoprefixer,
    customproperties,
    apply,
    mixins,
    nested,
    customMedia
  ];
  const configNano = {
    autoprefixer: {
      browsers: 'last 2 versions'
    },
    discardComments: {
      removeAll: true
    },
    safe: true
  };
  return gulp.src('./nakDS-src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'))
    .pipe(nano(configNano))
    .pipe(gulp.dest('./docs/css'))
    .pipe(notify({
      message: 'Your CSS is ready ♡'
    }));
});

gulp.task('browser-sync', () =>{
  browserSync({
    server: {
      baseDir: './docs/'
    }
  });
});

gulp.task('image', function () {
  gulp.src('./docs/assets-source/**/*')
    .pipe(image())
    .pipe(gulp.dest('./docs/assets/'));
});


gulp.task('watch', () =>{
  gulp.watch('nakDS-src/**/*.css', ['css']);

});

gulp.task('default', ['css', 'browser-sync', 'watch']);
