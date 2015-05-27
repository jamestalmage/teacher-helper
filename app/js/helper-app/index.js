var angular = require('angular');

module.exports = angular.module('teacherHelper.app', [
  require('./percentage-helper-controller'),
  require('./debounce-selection')
]).name;