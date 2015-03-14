/**
 * Grunt file for metacarattere
 */
module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            options: {
                banner: grunt.file.read('banner.txt')
            },

            all: {
                files: {
                    'metacarattere.min.js': ['index.js']
                }
            }
        },

        mochaTest: {
            all: {
                options: {
                    reporter: 'nyan'
                },
                src: ['test/*.js']
            }
        }

    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test',['mochaTest']);
    grunt.registerTask('default',['test','uglify']);

};
