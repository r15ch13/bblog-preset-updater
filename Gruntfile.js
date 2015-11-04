module.exports = function(grunt) {

  // Project configuration.
  grunt.config.init(
  {
    pkg: grunt.file.readJSON('package.json'),
    dist: {
      js: 'dist/<%= pkg.name %>.js',
      jsMin: 'dist/<%= pkg.name %>.min.js',
      css: 'dist/<%= pkg.name %>.css',
      cssMin: 'dist/<%= pkg.name %>.min.css'
    },
    copy: {
      js: {
        src: 'src/<%= pkg.name %>.js',
        dest: '<%= dist.js %>'
      },
      css: {
        src: 'src/<%= pkg.name %>.css',
        dest: '<%= dist.css %>'
      }
    },
    uglify: {
      options: {
        preserveComments: require('uglify-save-license')
      },
      dist: {
        src: 'src/<%= pkg.name %>.js',
        dest: '<%= dist.jsMin %>'
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= dist.cssMin %>': ['src/*.css']
        }
      }
    },
    readCss: {
      options: {
        content: '<%= grunt.file.read("dist/" + pkg.name + ".min.css") %>'
      }
    },
    sed: {
      version: {
        path: '<%= dist.js %>',
        pattern: '%VERSION%',
        replacement: '<%= pkg.version %>'
      },
      versionBblog: {
        path: '<%= dist.js %>',
        pattern: '%VERSION_BBLOG%',
        replacement: '<%= pkg.versionBblog %>'
      },
      versionBattlelog: {
        path: '<%= dist.js %>',
        pattern: '%VERSION_BATTLELOG%',
        replacement: '<%= pkg.versionBattlelog %>'
      },
      css: {
        path: '<%= dist.js %>',
        pattern: 'css: "%CSS%",',
        replacement: 'css: "<%= grunt.option("cssContent") %>",'
      },
      debug: {
        path: '<%= dist.js %>',
        pattern: 'debug: true,',
        replacement: 'debug: false,',
      },

      versionMin: {
        path: '<%= dist.jsMin %>',
        pattern: '%VERSION%',
        replacement: '<%= pkg.version %>'
      },
      versionBblogMin: {
        path: '<%= dist.jsMin %>',
        pattern: '%VERSION_BBLOG%',
        replacement: '<%= pkg.versionBblog %>'
      },
      versionBattlelogMin: {
        path: '<%= dist.jsMin %>',
        pattern: '%VERSION_BATTLELOG%',
        replacement: '<%= pkg.versionBattlelog %>'
      },
      cssMin: {
        path: '<%= dist.jsMin %>',
        pattern: 'css:"%CSS%",',
        replacement: 'css:"<%= grunt.option("cssContent") %>",'
      },
      debugMin: {
        path: '<%= dist.jsMin %>',
        pattern: 'debug:!0,',
        replacement: 'debug:!1,',
      },

      versionCss: {
        path: '<%= dist.css %>',
        pattern: '%VERSION%',
        replacement: '<%= pkg.version %>'
      },
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sed');

  grunt.registerTask('readCss', function(asd)
  {
    grunt.task.requires(['copy', 'uglify', 'cssmin']);
    grunt.option('cssContent', this.options().content);
  });

  // Default task(s).
  grunt.registerTask('default', ['copy', 'uglify', 'cssmin', 'readCss', 'sed']);

};