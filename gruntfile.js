module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    lint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['gruntfile.js', 'src/*.js', 'src/*/*.js']
    },
    requirejs: {
      compile:{
        options: {
          dir: 'build',
          baseUrl: 'src',
          paths: {
            angularjs: 'empty:',
            underscore: 'empty:'
          },
          name: 'angular-underscore',
          include: [],
          fileExclusionRegExp: /\.tpl$/,
          removeCombined: true,
          uglify: {
            beautify: true,
            indent_level: 2,
            no_mangle: true
          }
        }
      }
    },
    min: {
      build: {
        src: ['build/angular-underscore.js'],
        dest: 'build/angular-underscore.min.js'
      }
    }
  });

  var requirejs = require('requirejs'),
      _ = require('underscore'),
      filterNames = [],
      utilNames = _.functions(_),
      renderConfig = {},
      cleanConfig = {};

  requirejs(['src/config.js'], function(config) {
    filterNames = _.flatten(config.adapList);
  });

  _.each(filterNames, function(filterName) {
    var target = 'filter-' + filterName;

    renderConfig[target] = {
      options: {
        data: {
          filterName: filterName
        },
        format: {
          interpolate : /<(.+?)>/g
        }
      },
      to: 'src/filters/filters.tpl',
      out: 'src/filters/' + filterName + '.js'
    };
    cleanConfig[target] = [renderConfig[target].out];
    grunt.config.get('requirejs').compile.options.include.push(renderConfig[target].out.substr(4));
  });

  _.each(utilNames, function(utilName) {
    var target = 'util-' + utilName;

    renderConfig[target] = {
      options: {
        data: {
          utilName: utilName
        },
        format: {
          interpolate : /<(.+?)>/g
        }
      },
      to: 'src/utils/utils.tpl',
      out: 'src/utils/' + utilName + '.js'
    };
    cleanConfig[target] = [renderConfig[target].out];
    grunt.config.get('requirejs').compile.options.include.push(renderConfig[target].out.substr(4));
  });

  console.log(grunt.file.expandFiles('src/filters/*'));

  grunt.config.set('render', renderConfig);
  grunt.config.set('clean', cleanConfig);

  grunt.loadNpmTasks('grunt-contrib');
  // grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadTasks('grunt/tasks');

  // Default task.
  // grunt.registerTask('default', 'genFilters genUtils lint');
  grunt.registerTask('default', ['render', 'lint', 'requirejs', 'min', 'clean']);

  // grunt.registerMultiTask('genFilters', function() {

  // });

  // grunt.registerMultiTask('cleanFilters', function() {

  // });

  // grunt.registerMultiTask('genUtils', function() {

  // });

  // grunt.registerMultiTask('cleanUtils', function() {

  // });

};