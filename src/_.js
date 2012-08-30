define(['angularjs', 'underscore'], function(ng, _) {
  'use strict';

  var propGetterFactory = function(prop) {
    return function(obj) {
      return obj[prop];
    };
  };

  _._ = _;

  // Shiv "min", "max" ,"sortedIndex" to accept property predicate.
  _.each(['min', 'max', 'sortedIndex'],
    function(fnName) {
      _[fnName] = _.wrap(_[fnName],
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
  _.uniq = _.unique = function() {
    var args = arguments;
    if(_.isFunction(args[1])) {
      args[2] = args[1];
      args[1] = false;
    }
    return _.uniq.apply(_, args);
  };

  // Shiv "filter", "reject" to angular's built-in,
  // and reserve underscore's feature(works on obj).
  var $injector = ng.injector(['ng']);
  $injector.invoke(function($filter) {
    _.filter = _.select = _.wrap($filter('filter'),
      function(filter, obj, exp) {
        if(!(_.isArray(obj))) {
          obj = _.toArray(obj);
        }
        return filter(obj, exp);
    });
    _.reject = function(obj, exp) {
      // use angular built-in negated predicate
      if(_.isString(exp)) {
        return _.filter(obj, '!' + exp);
      }
      var diff = _.bind(_.difference, _, obj);
      return diff(_.filter(obj, exp));
    };
  });
});