define(['angularjs', './_', './config'], function(ng, _, config) {
  'use strict';

  var adapList = config.adapList,
      module = ng.module('angular-underscore/filters', []);

  // Registering filters.
  _.each(adapList, function(filterNames) {
    if(!(_.isArray(filterNames))) {
      filterNames = [filterNames];
    }

    var filter = _.bind(_[filterNames[0]], _),
        filterFactory = function() {return filter;};

    _.each(filterNames, function(filterName) {
      module.filter(filterName, filterFactory);
    });
  });

  return module;
});