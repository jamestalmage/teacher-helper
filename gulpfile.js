var gulp = require('gulp');

require('./gulp/browserify')('./app/js/index.js','./dist/js');

require('./gulp/karma')();

require('./gulp/gh-pages')({
  src:'./dist/ghpages/**/*',
  prerequisites:['copy-gh-pages-index', 'copy-gh-pages-js']
});

gulp.task('test',['karma']);
gulp.task('test-min',['karma-min']);
gulp.task('coverage',['karma-coverage']);
gulp.task('watch-test',['watch-karma']);
gulp.task('watch-test-min',['watch-karma-min']);
gulp.task('watch-coverage',['watch-karma-coverage']);
gulp.task('watch-coverage-min',['watch-karma-min-coverage']);

gulp.task('copy-gh-pages-index', function(){
  return gulp.src('./app/index.html').pipe(gulp.dest('./dist/ghpages/'));
});
gulp.task('copy-gh-pages-js', ['bundle-debug', 'bundle-min'], function(){
  return gulp.src('./dist/js/*.*').pipe(gulp.dest('./dist/ghpages/dist/js'));
});


// SERVER

var server = require('gulp-express');


gulp.task('server', ['bundle-min','bundle-debug'], function() {
  server.run(['./server/server.js']);

  gulp.watch(['app/js/*.js','app/**/*.js'], ['bundle-min','bundle-debug']);

  gulp.watch(['./app/index.html','./app/sandbox/*.*','./app/templates/*.html', './dist/js/*.js'], server.notify);

});