var angular = require('angular');

module.exports = angular.module('teacherHelper.app.percentage.ctrl', [])
  .controller('PercentageController', HelperAppController)
  .name;

var percentage = require('../percentage');

function HelperAppController() {
  this.correct = 10;
  this.outOf = 10;
  this.calculate = percentage.calculate;
  this.column = percentage.column;
}