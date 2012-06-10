describe('angular-underscore: API', function() {
  beforeEach(module('_'));
  _.each(_.functions(_), function(fnName) {
    it(fnName + " should adapt to underscore's "+ fnName, inject(function($rootScope) {
      expect($rootScope[fnName].toString()).toBe(_[fnName].toString());
    }));
  });
});
