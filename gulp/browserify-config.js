module.exports = config;

var path = require('path');

var transformFilter = require('transform-filter');
var ngannotate = require('browserify-ngannotate');
var ngtu = require('tangify');

function config(opts){
  opts = opts || {};

  if(opts.minify) opts.annotate = true;

  if(opts.coverage && !opts.test) throw new Error('coverage for a non test-run. Does not make sense');

  var config = {
    debug: !!opts.debug,
    extensions: ['.js'],
    plugin : [],
    transform : [ ]
  };

  if(opts.entries){
    config.entries = opts.entries;
  }

  if(opts.test){
    config.plugin.push('proxyquire-universal');
    config.transform.push(transformFilter('test/**', ngtu));
  }

  if(opts.annotate){
    config.transform.push(
      transformFilter('app/**', ngannotate)
    );
  }

  if(opts.minify){
    config.transform.push(
      ['uglifyify', {global:true, ignore:['**/test/**', '**/node_modules/{mocha,sinon,chai,sinon-chai}/**']}]
    )
  }

  if(opts.coverage){
    config.transform.push('browserify-istanbul');
  }

  return config;
}