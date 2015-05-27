module.exports = setupTasks;
var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

function setupTasks(config){
  config = config || {};
  gulp.task('gh-pages', config.prerequisites || [], function() {
    return gulp.src(config.src).pipe(ghPages(config.options));
  });
}