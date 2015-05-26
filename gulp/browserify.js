'use strict';
module.exports = makeTasks;

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var config = require('./browserify-config');


/**
 * Registers two tasks `bundle-min` and `bundle-debug`.
 *
 * Basic Usage:
 *      makeTask('./app/entryFile1.js', './app/EntryFile2.js', ... , './dist/outputDir');
 *
 * Entry files can also be passed as arrays, which will be flattened before getting passed to browserify.
 *
 * Files will be saved as: outputDir/<pkg.version>.<pkg.name>[.min].js
 *
 * @param {...string|string[]} var_entries - entry files to your app. They get required as soon as the bundle is loaded.
 * @param outputDir - always the last argument.
 */
function makeTasks(var_entries, outputDir){

  outputDir = arguments[arguments.length-1];
  var entries = [];

  for (var i = 0, l = arguments.length -1; i < l; ++i) {
    var entry = arguments[i];
    if(Array.isArray(entry)){
      entries.push.apply(entries,entry);
    } else {
      entries.push(entry);
    }
  }
  console.log(entries);

  var getBundleName = function (minified) {
    var pkg = require(path.resolve(process.cwd(), './package.json'));
    var bundleName = pkg.version + '.' + pkg.name;
    if(minified) bundleName += '.' + 'min';
    return bundleName;
  };

  function bundleTask(minify){
    return function() {
      var bundler = browserify(config({
        entries: entries,
        debug: true,
        minify: minify
      }));

      var bundle = function() {
        var chain = bundler
          .bundle()
          .pipe(source(getBundleName(minify) + '.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init({loadMaps: true}))
          /*;

        // Add transformation tasks to the pipeline here.
        if(minify) chain = chain.pipe(uglify());

        chain    */
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(outputDir));
      };
      return bundle();
    }
  }

  gulp.task('bundle-min', bundleTask(true));
  gulp.task('bundle-debug', bundleTask(false));
}
