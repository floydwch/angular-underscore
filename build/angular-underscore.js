define("_", [ "angularjs", "underscore" ], function(ng, _) {
  var propGetterFactory = function(prop) {
    return function(obj) {
      return obj[prop];
    };
  };
  _._ = _, _.each([ "min", "max", "sortedIndex" ], function(fnName) {
    _[fnName] = _.wrap(_[fnName], function(fn) {
      var args = _.toArray(arguments).slice(1);
      return _.isString(args[2]) ? args[2] = propGetterFactory(args[2]) : _.isString(args[1]) && (args[1] = propGetterFactory(args[1])), fn.apply(_, args);
    });
  }), _.uniq = _.unique = function() {
    var args = arguments;
    return _.isFunction(args[1]) && (args[2] = args[1], args[1] = !1), _.uniq.apply(_, args);
  };
  var $injector = ng.injector([ "ng" ]);
  $injector.invoke(function($filter) {
    _.filter = _.select = _.wrap($filter("filter"), function(filter, obj, exp) {
      return _.isArray(obj) || (obj = _.toArray(obj)), filter(obj, exp);
    }), _.reject = function(obj, exp) {
      if (_.isString(exp)) return _.filter(obj, "!" + exp);
      var diff = _.bind(_.difference, _, obj);
      return diff(_.filter(obj, exp));
    };
  });
}), define("utils", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils", []).run(function($rootScope) {
    _.each(_.methods(_), function(methodName) {
      $rootScope[methodName] = _.bind(_[methodName], _);
    }), $rootScope._ = _;
  });
}), define("config", {
  adapList: [ [ "map", "collect" ], [ "reduce", "inject", "foldl" ], [ "reduceRight", "foldr" ], [ "find", "detect" ], [ "filter", "select" ], "reject", "invoke", "pluck", "max", "min", "sortBy", "groupBy", "sortedIndex", "shuffle", "toArray", "size", [ "first", "head" ], "initial", "last", [ "rest", "tail" ], "compact", "flatten", "without", "union", "intersection", "difference", [ "uniq", "unique" ], "zip", "indexOf", "lastIndexOf", "keys", "values", [ "functions", "methods" ], "pick", "tap", "has", "uniqueId", "escape", "result", "template" ]
}), define("filters", [ "angularjs", "./_", "./config" ], function(ng, _, config) {
  var adapList = config.adapList, module = ng.module("angular-underscore/filters", []);
  return _.each(adapList, function(filterNames) {
    _.isArray(filterNames) || (filterNames = [ filterNames ]);
    var filter = _.bind(_[filterNames[0]], _), filterFactory = function() {
      return filter;
    };
    _.each(filterNames, function(filterName) {
      module.filter(filterName, filterFactory);
    });
  }), module;
}), define("angular-underscore", [ "angularjs", "./utils", "./filters" ], function(ng) {
  return ng.module("angular-underscore", [ "angular-underscore/utils", "angular-underscore/filters" ]);
}), define("filters/map.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/map", []), filter = _.bind(_.map, _), filterFactory = function() {
    return filter;
  };
  return module.filter("map", filterFactory), module;
}), define("filters/collect.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/collect", []), filter = _.bind(_.collect, _), filterFactory = function() {
    return filter;
  };
  return module.filter("collect", filterFactory), module;
}), define("filters/reduce.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/reduce", []), filter = _.bind(_.reduce, _), filterFactory = function() {
    return filter;
  };
  return module.filter("reduce", filterFactory), module;
}), define("filters/inject.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/inject", []), filter = _.bind(_.inject, _), filterFactory = function() {
    return filter;
  };
  return module.filter("inject", filterFactory), module;
}), define("filters/foldl.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/foldl", []), filter = _.bind(_.foldl, _), filterFactory = function() {
    return filter;
  };
  return module.filter("foldl", filterFactory), module;
}), define("filters/reduceRight.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/reduceRight", []), filter = _.bind(_.reduceRight, _), filterFactory = function() {
    return filter;
  };
  return module.filter("reduceRight", filterFactory), module;
}), define("filters/foldr.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/foldr", []), filter = _.bind(_.foldr, _), filterFactory = function() {
    return filter;
  };
  return module.filter("foldr", filterFactory), module;
}), define("filters/find.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/find", []), filter = _.bind(_.find, _), filterFactory = function() {
    return filter;
  };
  return module.filter("find", filterFactory), module;
}), define("filters/detect.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/detect", []), filter = _.bind(_.detect, _), filterFactory = function() {
    return filter;
  };
  return module.filter("detect", filterFactory), module;
}), define("filters/filter.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/filter", []), filter = _.bind(_.filter, _), filterFactory = function() {
    return filter;
  };
  return module.filter("filter", filterFactory), module;
}), define("filters/select.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/select", []), filter = _.bind(_.select, _), filterFactory = function() {
    return filter;
  };
  return module.filter("select", filterFactory), module;
}), define("filters/reject.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/reject", []), filter = _.bind(_.reject, _), filterFactory = function() {
    return filter;
  };
  return module.filter("reject", filterFactory), module;
}), define("filters/invoke.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/invoke", []), filter = _.bind(_.invoke, _), filterFactory = function() {
    return filter;
  };
  return module.filter("invoke", filterFactory), module;
}), define("filters/pluck.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/pluck", []), filter = _.bind(_.pluck, _), filterFactory = function() {
    return filter;
  };
  return module.filter("pluck", filterFactory), module;
}), define("filters/max.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/max", []), filter = _.bind(_.max, _), filterFactory = function() {
    return filter;
  };
  return module.filter("max", filterFactory), module;
}), define("filters/min.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/min", []), filter = _.bind(_.min, _), filterFactory = function() {
    return filter;
  };
  return module.filter("min", filterFactory), module;
}), define("filters/sortBy.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/sortBy", []), filter = _.bind(_.sortBy, _), filterFactory = function() {
    return filter;
  };
  return module.filter("sortBy", filterFactory), module;
}), define("filters/groupBy.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/groupBy", []), filter = _.bind(_.groupBy, _), filterFactory = function() {
    return filter;
  };
  return module.filter("groupBy", filterFactory), module;
}), define("filters/sortedIndex.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/sortedIndex", []), filter = _.bind(_.sortedIndex, _), filterFactory = function() {
    return filter;
  };
  return module.filter("sortedIndex", filterFactory), module;
}), define("filters/shuffle.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/shuffle", []), filter = _.bind(_.shuffle, _), filterFactory = function() {
    return filter;
  };
  return module.filter("shuffle", filterFactory), module;
}), define("filters/toArray.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/toArray", []), filter = _.bind(_.toArray, _), filterFactory = function() {
    return filter;
  };
  return module.filter("toArray", filterFactory), module;
}), define("filters/size.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/size", []), filter = _.bind(_.size, _), filterFactory = function() {
    return filter;
  };
  return module.filter("size", filterFactory), module;
}), define("filters/first.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/first", []), filter = _.bind(_.first, _), filterFactory = function() {
    return filter;
  };
  return module.filter("first", filterFactory), module;
}), define("filters/head.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/head", []), filter = _.bind(_.head, _), filterFactory = function() {
    return filter;
  };
  return module.filter("head", filterFactory), module;
}), define("filters/initial.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/initial", []), filter = _.bind(_.initial, _), filterFactory = function() {
    return filter;
  };
  return module.filter("initial", filterFactory), module;
}), define("filters/last.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/last", []), filter = _.bind(_.last, _), filterFactory = function() {
    return filter;
  };
  return module.filter("last", filterFactory), module;
}), define("filters/rest.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/rest", []), filter = _.bind(_.rest, _), filterFactory = function() {
    return filter;
  };
  return module.filter("rest", filterFactory), module;
}), define("filters/tail.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/tail", []), filter = _.bind(_.tail, _), filterFactory = function() {
    return filter;
  };
  return module.filter("tail", filterFactory), module;
}), define("filters/compact.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/compact", []), filter = _.bind(_.compact, _), filterFactory = function() {
    return filter;
  };
  return module.filter("compact", filterFactory), module;
}), define("filters/flatten.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/flatten", []), filter = _.bind(_.flatten, _), filterFactory = function() {
    return filter;
  };
  return module.filter("flatten", filterFactory), module;
}), define("filters/without.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/without", []), filter = _.bind(_.without, _), filterFactory = function() {
    return filter;
  };
  return module.filter("without", filterFactory), module;
}), define("filters/union.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/union", []), filter = _.bind(_.union, _), filterFactory = function() {
    return filter;
  };
  return module.filter("union", filterFactory), module;
}), define("filters/intersection.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/intersection", []), filter = _.bind(_.intersection, _), filterFactory = function() {
    return filter;
  };
  return module.filter("intersection", filterFactory), module;
}), define("filters/difference.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/difference", []), filter = _.bind(_.difference, _), filterFactory = function() {
    return filter;
  };
  return module.filter("difference", filterFactory), module;
}), define("filters/uniq.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/uniq", []), filter = _.bind(_.uniq, _), filterFactory = function() {
    return filter;
  };
  return module.filter("uniq", filterFactory), module;
}), define("filters/unique.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/unique", []), filter = _.bind(_.unique, _), filterFactory = function() {
    return filter;
  };
  return module.filter("unique", filterFactory), module;
}), define("filters/zip.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/zip", []), filter = _.bind(_.zip, _), filterFactory = function() {
    return filter;
  };
  return module.filter("zip", filterFactory), module;
}), define("filters/indexOf.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/indexOf", []), filter = _.bind(_.indexOf, _), filterFactory = function() {
    return filter;
  };
  return module.filter("indexOf", filterFactory), module;
}), define("filters/lastIndexOf.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/lastIndexOf", []), filter = _.bind(_.lastIndexOf, _), filterFactory = function() {
    return filter;
  };
  return module.filter("lastIndexOf", filterFactory), module;
}), define("filters/keys.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/keys", []), filter = _.bind(_.keys, _), filterFactory = function() {
    return filter;
  };
  return module.filter("keys", filterFactory), module;
}), define("filters/values.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/values", []), filter = _.bind(_.values, _), filterFactory = function() {
    return filter;
  };
  return module.filter("values", filterFactory), module;
}), define("filters/functions.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/functions", []), filter = _.bind(_.functions, _), filterFactory = function() {
    return filter;
  };
  return module.filter("functions", filterFactory), module;
}), define("filters/methods.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/methods", []), filter = _.bind(_.methods, _), filterFactory = function() {
    return filter;
  };
  return module.filter("methods", filterFactory), module;
}), define("filters/pick.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/pick", []), filter = _.bind(_.pick, _), filterFactory = function() {
    return filter;
  };
  return module.filter("pick", filterFactory), module;
}), define("filters/tap.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/tap", []), filter = _.bind(_.tap, _), filterFactory = function() {
    return filter;
  };
  return module.filter("tap", filterFactory), module;
}), define("filters/has.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/has", []), filter = _.bind(_.has, _), filterFactory = function() {
    return filter;
  };
  return module.filter("has", filterFactory), module;
}), define("filters/uniqueId.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/uniqueId", []), filter = _.bind(_.uniqueId, _), filterFactory = function() {
    return filter;
  };
  return module.filter("uniqueId", filterFactory), module;
}), define("filters/escape.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/escape", []), filter = _.bind(_.escape, _), filterFactory = function() {
    return filter;
  };
  return module.filter("escape", filterFactory), module;
}), define("filters/result.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/result", []), filter = _.bind(_.result, _), filterFactory = function() {
    return filter;
  };
  return module.filter("result", filterFactory), module;
}), define("filters/template.js", [ "angularjs", "../_" ], function(ng, _) {
  var module = ng.module("angular-underscore/filters/template", []), filter = _.bind(_.template, _), filterFactory = function() {
    return filter;
  };
  return module.filter("template", filterFactory), module;
}), define("utils/_", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/_", []).run(function($rootScope) {
    $rootScope._ = _.bind(_._, _);
  });
}), define("utils/after.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/after", []).run(function($rootScope) {
    $rootScope.after = _.bind(_.after, _);
  });
}), define("utils/all.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/all", []).run(function($rootScope) {
    $rootScope.all = _.bind(_.all, _);
  });
}), define("utils/any.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/any", []).run(function($rootScope) {
    $rootScope.any = _.bind(_.any, _);
  });
}), define("utils/bind.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/bind", []).run(function($rootScope) {
    $rootScope.bind = _.bind(_.bind, _);
  });
}), define("utils/bindAll.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/bindAll", []).run(function($rootScope) {
    $rootScope.bindAll = _.bind(_.bindAll, _);
  });
}), define("utils/chain.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/chain", []).run(function($rootScope) {
    $rootScope.chain = _.bind(_.chain, _);
  });
}), define("utils/clone.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/clone", []).run(function($rootScope) {
    $rootScope.clone = _.bind(_.clone, _);
  });
}), define("utils/collect.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/collect", []).run(function($rootScope) {
    $rootScope.collect = _.bind(_.collect, _);
  });
}), define("utils/compact.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/compact", []).run(function($rootScope) {
    $rootScope.compact = _.bind(_.compact, _);
  });
}), define("utils/compose.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/compose", []).run(function($rootScope) {
    $rootScope.compose = _.bind(_.compose, _);
  });
}), define("utils/contains.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/contains", []).run(function($rootScope) {
    $rootScope.contains = _.bind(_.contains, _);
  });
}), define("utils/debounce.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/debounce", []).run(function($rootScope) {
    $rootScope.debounce = _.bind(_.debounce, _);
  });
}), define("utils/defaults.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/defaults", []).run(function($rootScope) {
    $rootScope.defaults = _.bind(_.defaults, _);
  });
}), define("utils/defer.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/defer", []).run(function($rootScope) {
    $rootScope.defer = _.bind(_.defer, _);
  });
}), define("utils/delay.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/delay", []).run(function($rootScope) {
    $rootScope.delay = _.bind(_.delay, _);
  });
}), define("utils/detect.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/detect", []).run(function($rootScope) {
    $rootScope.detect = _.bind(_.detect, _);
  });
}), define("utils/difference.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/difference", []).run(function($rootScope) {
    $rootScope.difference = _.bind(_.difference, _);
  });
}), define("utils/each.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/each", []).run(function($rootScope) {
    $rootScope.each = _.bind(_.each, _);
  });
}), define("utils/escape.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/escape", []).run(function($rootScope) {
    $rootScope.escape = _.bind(_.escape, _);
  });
}), define("utils/every.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/every", []).run(function($rootScope) {
    $rootScope.every = _.bind(_.every, _);
  });
}), define("utils/extend.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/extend", []).run(function($rootScope) {
    $rootScope.extend = _.bind(_.extend, _);
  });
}), define("utils/filter.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/filter", []).run(function($rootScope) {
    $rootScope.filter = _.bind(_.filter, _);
  });
}), define("utils/find.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/find", []).run(function($rootScope) {
    $rootScope.find = _.bind(_.find, _);
  });
}), define("utils/first.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/first", []).run(function($rootScope) {
    $rootScope.first = _.bind(_.first, _);
  });
}), define("utils/flatten.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/flatten", []).run(function($rootScope) {
    $rootScope.flatten = _.bind(_.flatten, _);
  });
}), define("utils/foldl.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/foldl", []).run(function($rootScope) {
    $rootScope.foldl = _.bind(_.foldl, _);
  });
}), define("utils/foldr.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/foldr", []).run(function($rootScope) {
    $rootScope.foldr = _.bind(_.foldr, _);
  });
}), define("utils/forEach.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/forEach", []).run(function($rootScope) {
    $rootScope.forEach = _.bind(_.forEach, _);
  });
}), define("utils/functions.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/functions", []).run(function($rootScope) {
    $rootScope.functions = _.bind(_.functions, _);
  });
}), define("utils/groupBy.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/groupBy", []).run(function($rootScope) {
    $rootScope.groupBy = _.bind(_.groupBy, _);
  });
}), define("utils/has.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/has", []).run(function($rootScope) {
    $rootScope.has = _.bind(_.has, _);
  });
}), define("utils/head.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/head", []).run(function($rootScope) {
    $rootScope.head = _.bind(_.head, _);
  });
}), define("utils/identity.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/identity", []).run(function($rootScope) {
    $rootScope.identity = _.bind(_.identity, _);
  });
}), define("utils/include.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/include", []).run(function($rootScope) {
    $rootScope.include = _.bind(_.include, _);
  });
}), define("utils/indexOf.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/indexOf", []).run(function($rootScope) {
    $rootScope.indexOf = _.bind(_.indexOf, _);
  });
}), define("utils/initial.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/initial", []).run(function($rootScope) {
    $rootScope.initial = _.bind(_.initial, _);
  });
}), define("utils/inject.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/inject", []).run(function($rootScope) {
    $rootScope.inject = _.bind(_.inject, _);
  });
}), define("utils/intersect.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/intersect", []).run(function($rootScope) {
    $rootScope.intersect = _.bind(_.intersect, _);
  });
}), define("utils/intersection.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/intersection", []).run(function($rootScope) {
    $rootScope.intersection = _.bind(_.intersection, _);
  });
}), define("utils/invoke.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/invoke", []).run(function($rootScope) {
    $rootScope.invoke = _.bind(_.invoke, _);
  });
}), define("utils/isArguments.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isArguments", []).run(function($rootScope) {
    $rootScope.isArguments = _.bind(_.isArguments, _);
  });
}), define("utils/isArray.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isArray", []).run(function($rootScope) {
    $rootScope.isArray = _.bind(_.isArray, _);
  });
}), define("utils/isBoolean.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isBoolean", []).run(function($rootScope) {
    $rootScope.isBoolean = _.bind(_.isBoolean, _);
  });
}), define("utils/isDate.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isDate", []).run(function($rootScope) {
    $rootScope.isDate = _.bind(_.isDate, _);
  });
}), define("utils/isElement.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isElement", []).run(function($rootScope) {
    $rootScope.isElement = _.bind(_.isElement, _);
  });
}), define("utils/isEmpty.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isEmpty", []).run(function($rootScope) {
    $rootScope.isEmpty = _.bind(_.isEmpty, _);
  });
}), define("utils/isEqual.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isEqual", []).run(function($rootScope) {
    $rootScope.isEqual = _.bind(_.isEqual, _);
  });
}), define("utils/isFinite.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isFinite", []).run(function($rootScope) {
    $rootScope.isFinite = _.bind(_.isFinite, _);
  });
}), define("utils/isFunction.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isFunction", []).run(function($rootScope) {
    $rootScope.isFunction = _.bind(_.isFunction, _);
  });
}), define("utils/isNaN.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isNaN", []).run(function($rootScope) {
    $rootScope.isNaN = _.bind(_.isNaN, _);
  });
}), define("utils/isNull.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isNull", []).run(function($rootScope) {
    $rootScope.isNull = _.bind(_.isNull, _);
  });
}), define("utils/isNumber.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isNumber", []).run(function($rootScope) {
    $rootScope.isNumber = _.bind(_.isNumber, _);
  });
}), define("utils/isObject.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isObject", []).run(function($rootScope) {
    $rootScope.isObject = _.bind(_.isObject, _);
  });
}), define("utils/isRegExp.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isRegExp", []).run(function($rootScope) {
    $rootScope.isRegExp = _.bind(_.isRegExp, _);
  });
}), define("utils/isString.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isString", []).run(function($rootScope) {
    $rootScope.isString = _.bind(_.isString, _);
  });
}), define("utils/isUndefined.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/isUndefined", []).run(function($rootScope) {
    $rootScope.isUndefined = _.bind(_.isUndefined, _);
  });
}), define("utils/keys.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/keys", []).run(function($rootScope) {
    $rootScope.keys = _.bind(_.keys, _);
  });
}), define("utils/last.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/last", []).run(function($rootScope) {
    $rootScope.last = _.bind(_.last, _);
  });
}), define("utils/lastIndexOf.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/lastIndexOf", []).run(function($rootScope) {
    $rootScope.lastIndexOf = _.bind(_.lastIndexOf, _);
  });
}), define("utils/map.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/map", []).run(function($rootScope) {
    $rootScope.map = _.bind(_.map, _);
  });
}), define("utils/max.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/max", []).run(function($rootScope) {
    $rootScope.max = _.bind(_.max, _);
  });
}), define("utils/memoize.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/memoize", []).run(function($rootScope) {
    $rootScope.memoize = _.bind(_.memoize, _);
  });
}), define("utils/methods.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/methods", []).run(function($rootScope) {
    $rootScope.methods = _.bind(_.methods, _);
  });
}), define("utils/min.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/min", []).run(function($rootScope) {
    $rootScope.min = _.bind(_.min, _);
  });
}), define("utils/mixin.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/mixin", []).run(function($rootScope) {
    $rootScope.mixin = _.bind(_.mixin, _);
  });
}), define("utils/noConflict.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/noConflict", []).run(function($rootScope) {
    $rootScope.noConflict = _.bind(_.noConflict, _);
  });
}), define("utils/once.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/once", []).run(function($rootScope) {
    $rootScope.once = _.bind(_.once, _);
  });
}), define("utils/pick.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/pick", []).run(function($rootScope) {
    $rootScope.pick = _.bind(_.pick, _);
  });
}), define("utils/pluck.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/pluck", []).run(function($rootScope) {
    $rootScope.pluck = _.bind(_.pluck, _);
  });
}), define("utils/range.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/range", []).run(function($rootScope) {
    $rootScope.range = _.bind(_.range, _);
  });
}), define("utils/reduce.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/reduce", []).run(function($rootScope) {
    $rootScope.reduce = _.bind(_.reduce, _);
  });
}), define("utils/reduceRight.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/reduceRight", []).run(function($rootScope) {
    $rootScope.reduceRight = _.bind(_.reduceRight, _);
  });
}), define("utils/reject.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/reject", []).run(function($rootScope) {
    $rootScope.reject = _.bind(_.reject, _);
  });
}), define("utils/rest.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/rest", []).run(function($rootScope) {
    $rootScope.rest = _.bind(_.rest, _);
  });
}), define("utils/result.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/result", []).run(function($rootScope) {
    $rootScope.result = _.bind(_.result, _);
  });
}), define("utils/select.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/select", []).run(function($rootScope) {
    $rootScope.select = _.bind(_.select, _);
  });
}), define("utils/shuffle.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/shuffle", []).run(function($rootScope) {
    $rootScope.shuffle = _.bind(_.shuffle, _);
  });
}), define("utils/size.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/size", []).run(function($rootScope) {
    $rootScope.size = _.bind(_.size, _);
  });
}), define("utils/some.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/some", []).run(function($rootScope) {
    $rootScope.some = _.bind(_.some, _);
  });
}), define("utils/sortBy.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/sortBy", []).run(function($rootScope) {
    $rootScope.sortBy = _.bind(_.sortBy, _);
  });
}), define("utils/sortedIndex.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/sortedIndex", []).run(function($rootScope) {
    $rootScope.sortedIndex = _.bind(_.sortedIndex, _);
  });
}), define("utils/tail.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/tail", []).run(function($rootScope) {
    $rootScope.tail = _.bind(_.tail, _);
  });
}), define("utils/take.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/take", []).run(function($rootScope) {
    $rootScope.take = _.bind(_.take, _);
  });
}), define("utils/tap.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/tap", []).run(function($rootScope) {
    $rootScope.tap = _.bind(_.tap, _);
  });
}), define("utils/template.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/template", []).run(function($rootScope) {
    $rootScope.template = _.bind(_.template, _);
  });
}), define("utils/throttle.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/throttle", []).run(function($rootScope) {
    $rootScope.throttle = _.bind(_.throttle, _);
  });
}), define("utils/times.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/times", []).run(function($rootScope) {
    $rootScope.times = _.bind(_.times, _);
  });
}), define("utils/toArray.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/toArray", []).run(function($rootScope) {
    $rootScope.toArray = _.bind(_.toArray, _);
  });
}), define("utils/union.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/union", []).run(function($rootScope) {
    $rootScope.union = _.bind(_.union, _);
  });
}), define("utils/uniq.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/uniq", []).run(function($rootScope) {
    $rootScope.uniq = _.bind(_.uniq, _);
  });
}), define("utils/unique.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/unique", []).run(function($rootScope) {
    $rootScope.unique = _.bind(_.unique, _);
  });
}), define("utils/uniqueId.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/uniqueId", []).run(function($rootScope) {
    $rootScope.uniqueId = _.bind(_.uniqueId, _);
  });
}), define("utils/values.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/values", []).run(function($rootScope) {
    $rootScope.values = _.bind(_.values, _);
  });
}), define("utils/without.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/without", []).run(function($rootScope) {
    $rootScope.without = _.bind(_.without, _);
  });
}), define("utils/wrap.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/wrap", []).run(function($rootScope) {
    $rootScope.wrap = _.bind(_.wrap, _);
  });
}), define("utils/zip.js", [ "angularjs", "./_" ], function(ng, _) {
  return ng.module("angular-underscore/utils/zip", []).run(function($rootScope) {
    $rootScope.zip = _.bind(_.zip, _);
  });
});