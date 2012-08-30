define(['angularjs', '../_'], function(ng, _) {
  'use strict';

  var module = ng.module('angular-underscore/filters/<filterName>', []),
      filter = _.bind(_.<filterName>, _),
      filterFactory = function() {return filter;};

  module.filter('<filterName>', filterFactory);

  return module;
});