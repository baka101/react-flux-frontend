var gulp = require('gulp'),
  less = require('gulp-less'),
  minifyCSS = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  livereload = require('gulp-livereload'),
  prefix = require('gulp-autoprefixer'),
  runSequence = require('run-sequence'),
  browserify = require('browserify'),
  del = require('del'),
  reactify = require('reactify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer');

//Scripts : Browserify, Reactify
gulp.task('scripts', function () {
  browserify('dev/js/main.js')
    .transform('reactify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(gulp.dest('dist'));
});

//Styles: Compile, Minify 
gulp.task('styles', function () {
  gulp.src('dev/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(prefix())
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

//Copy HTML files & Image assets
gulp.task('copyhtml', function () {
  gulp.src('dev/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('./'));
  gulp.src('dev/assets/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('copyassets', function () {
  gulp.src('dev/assets/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('copy', function () {
  runSequence('copyhtml', 'copyassets');
});


//Clean tasks 
gulp.task('clean', function (done) {
  del(['./dist/**/*'], done);
});

gulp.task('cleanhtml', function (done) {
  del(['./index.html'], done);
});

gulp.task('cleanjs', function (done) {
  del(['./dist/*.js'], done);
});

gulp.task('cleancss', function (done) {
  del(['./dist/*.ss'], done);
});

gulp.task('cleanassets', function (done) {
  del(['./dist/assets/**/*', './dist/assets'], done);
});


// Watch: Scripts, Styles, Images, LiveReload
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('dev/index.html', function () {
    return runSequence('cleanhtml', 'copyhtml');
  });
  gulp.watch('dev/assets/*', function () {
    return runSequence('cleanassets', 'copyassets');
  });
  gulp.watch('dev/js/**/*.js', function () {
    return runSequence('cleanjs', 'scripts');
  });
  gulp.watch('dev/less/**/*.less', function () {
    return runSequence('cleancss', 'styles');
  });
});


gulp.task('default', function () {
  runSequence('clean', 'scripts', 'styles', 'copy', 'watch');
});


