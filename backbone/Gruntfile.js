module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };


  // Project configuration.
  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 80, //63956 //80
          base: '.'
        }
      }
    },

      watch: {
          options: {
              spawn: true,
              livereload: true
          },
          less: {
              files: ['less/**/*.less'],
              tasks: ['less:develop'],
              options: {
                  livereload: false
              }
          },
          css: {
              files: ['css/all.css'],
              tasks: []
          },
          js: {
              files: ['js/**/*.js,html'],
              tasks: []
          }
      }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['connect', 'watch']);

};
