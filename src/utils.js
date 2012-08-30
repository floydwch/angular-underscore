define(['angularjs', './_'], function(ng, _) {
  'use strict';

  return ng.module('angular-underscore/utils', []).run(function($rootScope) {
    _.each(_.methods(_), function(methodName) {
      $rootScope[methodName] = _.bind(_[methodName], _);
    });
    $rootScope._ = _;
  });
});