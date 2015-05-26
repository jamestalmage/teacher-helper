module.exports = config;

var browserify = require('./browserify-config');
var args = require('yargs').argv;

function config (opts) {
  opts = opts || {};

  // required option for browserify-config (adds proxyquire)
  opts.test = true;

  var config =  {
    frameworks: ['browserify', 'mocha', 'chai-sinon'],

    files: [
      "node_modules/angular/angular.js",
      "node_modules/angular-mocks/angular-mocks.js",
      'test/**/*.js'
    ],

    preprocessors: {
      'test/**/*-test.js': ['browserify']
    },

    browsers: [args.chrome ? 'Chrome' : 'PhantomJS'],

    logLevel: opts.debug ? 'DEBUG' : 'INFO',

    singleRun: !opts.auto,
    autoWatch: !!opts.auto,

    reporters: [
      'mocha',
      process.env.TRAVIS ? 'junit' : 'notify'
    ],

    browserify: browserify(opts),

    coverageReporter: {
      dir: process.env.TRAVIS ? 'shippable/' : 'coverage/',
      reporters: [
        {
          type: 'html',
          subdir: '.'
        },
        {
          type: 'cobertura',
          subdir: process.env.TRAVIS ? 'codecoverage' : '.',
          file: 'result.xml'
        }
      ]
    },

    junitReporter: {
      outputFile: 'shippable/testresults/result.xml',
      suite: ''
    }
  };

  if(opts.coverage){
    config.reporters.push('coverage');
  }

  return config;
}

