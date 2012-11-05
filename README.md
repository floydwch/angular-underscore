# An AngularJS module adapting underscore

This module exposes underscore's API into angular app's root scope,
and provides some filters from underscore.


## Filters

Whole Underscore's API for Collections, Arrays and Objects except decision API
(e.g. functions return true|false), side effect guys, and _.range(not making sense as a filter).


For API details please check out http://underscorejs.org/

## How to use

### Install

After load angular.js and underscore.js:

```html
<script type="text/javascript" src="angular-underscore.js"></script>
```

### Load angular-underscore

#### Load whole stuff

```javascript
angular.module('yourAwesomeApp', ['angular-underscore']);
```

#### Load API only

```javascript
angular.module('yourAwesomeApp', ['angular-underscore/utils']);
```

#### Load filters only

```javascript
angular.module('yourAwesomeApp', ['angular-underscore/filters']);
```

#### Load specific feature only

```javascript
// load `shuffle` only
angular.module('yourAwesomeApp', ['angular-underscore/filters/shuffle']);
```

### Usecase

```html
<script type="text/javascript">
  angular.module('example', ['angular-underscore']);
</script>

<body ng-app="example">
  <!-- generate 10 unduplicated random number from 0 to 9 -->
  <div ng-repeat="num in range(10)|shuffle">{{num}}</div>
</body>
```
