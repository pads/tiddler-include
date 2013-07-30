/* global module:false, require:false */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('tiddler-include.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    bowerful: {
      src: {
        packages: {
          'jquery': '1.10.2'
        },
        store: 'lib'
      },
      test: {
        packages: {
          'jasmine-jquery': '1.5.5',
          'sinonjs': '1.7.1'
        },
        store: 'test/lib'
      }
    },
    clean: {
      files: ['dist', 'tmp']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    jasmine: {
      default: {
        src: 'src/**/*.js',
        options: {
          specs: 'test/*Spec.js',
          helpers: [
            'test/lib/jasmine-jquery/lib/jasmine-jquery.js',
            'test/lib/sinonjs/sinon.js'
            ],
          vendor: 'lib/jquery/jquery.js',
          template: require("grunt-template-jasmine-istanbul"),
          templateOptions: {
            coverage: 'tmp/coverage/coverage.json',
            report: {
              type: 'lcov',
              options: {
                dir: 'tmp/coverage'
              }
            },
            thresholds: {
              lines: 80,
              statements: 80,
              branches: 80,
              functions: 80
            }
          }
        }
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'test']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'test']
      },
    },
    copy: {
      tsapp: {
        files: [
          { expand: true, flatten: true, src: ['dist/*.js'], dest: 'tsapp/assets/', filter: 'isFile' }
        ]
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', ['clean', 'bowerful', 'jshint', 'test', 'concat', 'uglify', 'copy']);

};
