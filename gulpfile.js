var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var paths = {
  scriptsVendor: [
    'js/livequery.js',
    'js/retina.js',
    'js/queryloader2.js',
    'js/appear.js',
    'js/parallax.js',
    'js/easing.js',
    'js/isotope.js',
    'js/flexslider.js',
    'js/fitvids.js',
    'js/custom.js'
  ],
  vendorPath: 'js/vendor.js',
  scripts: 'js/custom.js',
  styles: ['css/**/*.css']
};

gulp.task('build-scripts-vendor', function() {
  return gulp.src(paths.scriptsVendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('js/'));
});

gulp.task('build-scripts', ['build-scripts-vendor'], function() {
  return gulp.src([paths.vendorPath, paths.scripts])
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'));
});

gulp.task('build-styles', function () {
  return gulp.src(paths.styles)
    .pipe(concat('all.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('css/'));
});

gulp.task('default', ['build-scripts', 'build-styles'], function() {

});
