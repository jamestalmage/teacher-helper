var angular = require('angular');

module.exports = angular.module('teacherHelper.app.debounceSelection', [])
  .directive('debounceSelection', DebounceSelectionDirective)
  .name;

/* @ngInject */
function DebounceSelectionDirective($timeout) {
  return {
    restrict: 'A',
    require:'?ngModel',
    link: function (scope, element, attrs, ngModel) {
      if(!ngModel) return;

      var timer = null;

      ngModel.$viewChangeListeners.push(function() {
        cancel();
        schedule();
      });

      element.on('blur', cancel);

      function cancel() {
        if (timer) {
          $timeout.cancel(timer);
          timer = null;
        }
      }

      function schedule() {
        if (!timer) {
          timer = $timeout(selectAll, 2500);
        }
      }

      function selectAll() {
        element[0].select();
        timer = null;
      }
    }
  };
}