/**
 * Task: render
 * Description: Render Underscore template.
 * Dependencies: underscore
 * Contributor: @floydsoft
 */

module.exports = function(grunt) {
  "use strict";

  var util = grunt.util || grunt.utils,
      _ = util._;

  grunt.registerMultiTask("render", "Render Underscore template.", function() {
    var options = grunt.helper("options", this),
        arg = this.data,
        result;

    result = grunt.helper('render', arg, options);

    grunt.file.write(arg.out, result[arg.out]);
  });

  grunt.registerHelper("render", function(arg, options) {
    var defaultData = {require: require},
        data = _.extend(defaultData, options.data),
        files = options.files,
        format = options.format,
        to = grunt.file.read(arg.to),
        out = arg.out,
        result = {};

    _.each(_.keys(files || {}), function(file) {
      files[file] = grunt.file.expandFiles(files[file]);
    });

    data = _.extend(data, files);
    result[out] = _.template(to, data, format);

    return result;
  });
};