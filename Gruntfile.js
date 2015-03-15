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
            dev: {
                options: {
                    // reporter: 'nyan'
                },
                src: ['test/dev.js']
            },

            minified: {
                options: {
                    reporter: 'nyan'
                },

                src: ['test/minified.js']
            }
        }

    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test',['mochaTest:dev']);
    grunt.registerTask('default',['mochaTest:dev','uglify', 'mochaTest:minified']);

};
