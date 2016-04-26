module.exports = function(grunt) {

  var src = "./source";
  var dst = "./public"

  grunt.initConfig({
    sass: {
      it: {
        files: [{
          expand: true,
          cwd: src + '/sass/',
          src: ['*.scss'],
          dest: dst + '/css/',
          ext: '.css'
        }]
      }
    },

    uglify: {
      it: {
        files: [{
            expand: true,
            cwd: src + '/js/',
            src: '**/*.js',
            dest: dst + '/js/',
            ext: '.min.js'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('it', ['sass', 'uglify']);

};