define(['angularjs', './_'], function(ng, _) {
  'use strict';

  return ng.module('angular-underscore/utils/<utilName>', []).run(function($rootScope) {
    $rootScope.<utilName> = _.bind(_.<utilName>, _);
  });
});