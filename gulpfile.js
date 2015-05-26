var gulp = require('gulp');

require('./gulp/browserify')('./app/js/index.js','./dist/js');

require('./gulp/karma')();

gulp.task('test',['karma']);
gulp.task('test-min',['karma-min']);
gulp.task('coverage',['karma-coverage']);
gulp.task('watch-test',['watch-karma']);
gulp.task('watch-test-min',['watch-karma-min']);
gulp.task('watch-coverage',['watch-karma-coverage']);
gulp.task('watch-coverage-min',['watch-karma-min-coverage']);


// SERVER

var server = require('gulp-express');


gulp.task('server', ['bundle-min','bundle-debug'], function() {
  server.run(['./server/server.js']);

  gulp.watch(['app/js/*.js','app/**/*.js'], ['bundle-min','bundle-debug']);

  gulp.watch(['./app/index.html','./app/sandbox/*.*','./app/templates/*.html', './dist/js/*.js'], server.notify);

});