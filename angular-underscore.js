(function() {
  'use strict';

  if(window._ === undefined) {
    throw new Error('_ is undefined');
  }

  var _ = window._;
  var ng_ = _.clone(_); // for shiv, not affect underscore
  var ng = window.angular;
  var module = ng.module('_', []);
  var adapList = [
    ['map', 'collect'],
    ['reduce', 'inject', 'foldl'],
    ['reduceRight', 'foldr'],
    ['find', 'detect'],
    ['filter', 'select'],
    'reject',
    'invoke',
    'pluck',
    'max',
    'min',
    'sortBy',
    'groupBy',
    'sortedIndex',
    'shuffle',
    'toArray',
    'size',
    ['first', 'head'],
    'initial',
    'last',
    ['rest', 'tail'],
    'compact',
    'flatten',
    'without',
    'union',
    'intersection',
    'difference',
    ['uniq', 'unique'],
    'zip',
    'indexOf',
    'lastIndexOf',
    'keys',
    'values',
    ['functions', 'methods'],
    'pick',
    'tap',
    'has',
    'uniqueId',
    'escape',
    'result',
    'template'
  ];

  var propGetterFactory = function(prop) {
    return function(obj) {
      return obj[prop];
    };
  };

  // Shiv "min", "max" ,"sortedIndex" to accept property predicate.
  _.each(['min', 'max', 'sortedIndex'],
    function(fnName) {
      ng_[fnName] = _.wrap(_[fnName],
        function(fn) {
          var args = _.toArray(arguments).slice(1);
          if(_.isString(args[2])) {
            // for "sortedIndex", transmuting str to property getter
            args[2] = propGetterFactory(args[2]);
          }
          else if(_.isString(args[1])) {
            // for "min" or "max", transmuting str to property getter
            args[1] = propGetterFactory(args[1]);
          }
          return fn.apply(_, args);
      });
  });

  // Shiv "uniq" works for iterator without "isSorted" parameter.
  ng_.uniq = ng_.unique = function() {
    var args = arguments;
    if(_.isFunction(args[1])) {
      args[2] = args[1];
      args[1] = false;
    }
    return _.uniq.apply(_, args);
  };

  // Shiv "filter", "reject" to angular's built-in,
  // and resreve underscore's feature(works on obj).
  var $injector = ng.injector(['ng']);
  $injector.invoke(function($filter) {
    ng_.filter = ng_.select = _.wrap($filter('filter'),
      function(filter, obj, exp) {
        if(!(_.isArray(obj))) {
          obj = _.toArray(obj);
        }
        return filter(obj, exp);
    });
    ng_.reject = function(obj, exp) {
      // use angular built-in negated predicate
      if(_.isString(exp)) {
        return ng_.filter(obj, '!' + exp);
      }
      var diff = _.bind(_.difference, _, obj);
      return diff(ng_.filter(obj, exp));
    };
  });

  // Registering filters.
  _.each(adapList, function(filterNames) {
    if(!(_.isArray(filterNames))) {
      filterNames = [filterNames];
    }
    var filter = _.bind(ng_[filterNames[0]], ng_);
    var filterFactory = function() {return filter;};
    _.each(filterNames, function(filterName) {
      module.filter(filterName, filterFactory);
    });
  });

  // Registering underscore's methods to root Scope.
  module.run(function($rootScope) {
    _.each(_.methods(_), function(methodName) {
      $rootScope[methodName] = _.bind(_[methodName], _);
    });
  });
}());
