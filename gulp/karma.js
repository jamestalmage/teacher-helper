module.exports = setupTasks;

var gulp = require('gulp');
var karma = require('karma').server;
var karmaConfig = require('./karma-config');
var path = require('path');
var args = require('yargs').argv;
var open = require('gulp-open');

function setupTasks(karmaConfFile, prefix){

  karmaConfFile = karmaConfFile || 'karma.conf.js';
  karmaConfFile = path.resolve(process.cwd(), karmaConfFile);

  if(typeof prefix !== 'string') {
    prefix = '';
  }
  else if(prefix.charAt(prefix.length - 1) !== '-') {
    prefix = prefix + '-';
  }

  /**
   * Run test once and exit
   */
  gulp.task(prefix + 'karma', karmaTask(false, false, false));
  gulp.task(prefix + 'karma-min', karmaTask(false, false, true));
  gulp.task(prefix + 'karma-coverage', karmaTask(false, true, false));
  gulp.task(prefix + 'karma-min-coverage', karmaTask(false, true, true));

  /**
   * watch files for changes and run tests on every change
   */
  gulp.task(prefix + 'watch-karma', karmaTask(true, false, false));
  gulp.task(prefix + 'watch-karma-min', karmaTask(true, false, true));
  gulp.task(prefix + 'watch-karma-coverage', karmaTask(true, true, false));
  gulp.task(prefix + 'watch-karma-min-coverage', karmaTask(true, true, true));

  function karmaTask (auto, coverage, minify){
    return function (done) {
      var cb = done;
      if(coverage && (args.o || args.open)){
        cb = function(err){
          if(err){
            done(err);
            return;
          }
          gulp.src('./coverage/' + (args.chrome ? 'Chrome' : 'PhantomJS') + '*/index.html').pipe(open());
        }
      }

      karma.start(
        karmaConfig({
          auto:auto,
          coverage:coverage,
          minify:minify,
          debug:true
        }),
        cb
      );
    };
  }

}
