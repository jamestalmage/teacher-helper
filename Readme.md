Teacher Helper
==============
Simple Utilities to make my wifes teaching job a bit easier.

Live demo [here](http://jamestalmage.github.io/teacher-helper/).

Build Targets
=============

 * `gulp watch-test [--chrome]` - watch for changes and run tests - no minification or coverage
 * `gulp coverage [--open] [--chrome]` - create coverage reports (`--open option will automatically open in a browser`).
 * `gulp test-min [--chrome]` - run the tests with minified code.

in all cases the `--chrome` option runs the tests in chrome instead of PhantomJS

 * `gulp server` - launch the server
 * `gulp bundle-min` - bundle and minify sources using browserify.
 * `gulp bundle-debug` - bundle sources with source-maps using browserify.
 * g`gulp gh-pages` - push to gh-pages