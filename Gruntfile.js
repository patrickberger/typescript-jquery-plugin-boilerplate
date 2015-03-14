/*jshint node: true*/
/*global module, require*/
module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        // Meta data.
        meta: {

            // Package information.
            pkg: grunt.file.readJSON('package.json'),

            // Directories.
            dir: {

                // Base directories.
                source: 'src',
                release: 'dist',
                temp: 'temp',
                demo: 'demo',

                // Single file version paths.
                simple: {
                    source: 'src/plugin/simple',
                    release: 'dist/simple',
                    temp: 'temp/simple',
                    demo: 'demo/simple'
                },

                // Multifile version paths.
                multifile: {
                    source: 'src/plugin/multifile',
                    release: 'dist/multifile',
                    temp: 'temp/multifile',
                    demo: 'demo/multifile'
                }
            },

            // Put some credentials on top of generated output files.
            // Usage: "<%= meta.banner.join('\\n') %>".
            banner: [
                '/*!',
                ' * Project: <%= meta.pkg.name %>',
                ' * Author: <%= meta.pkg.author %>',
                ' * Version: <%= meta.pkg.version %>',
                ' * Date: <%= grunt.template.today("mmmm dS, yyyy") %>',
                ' * Copyright (C) <%= grunt.template.today("yyyy") %>',
                ' */'
            ]
        },

        // Cleaning directories as temporary and release folder.
        //
        // @see https://github.com/gruntjs/grunt-contrib-clean
        clean: {
            release: '<%= meta.dir.release %>',
            releaseMultifile: '<%= meta.dir.multifile.release %>',
            releaseSimple: '<%= meta.dir.simple.release %>',
            temp: '<%= meta.dir.temp %>',
            tempMultifile: '<%= meta.dir.multifile.temp %>',
            tempSimple: '<%= meta.dir.simple.temp %>',
            demo: '<%= meta.dir.demo %>'
        },

        // Compiles source Typescript files into Javascript.
        //
        // @see https://github.com/k-maru/grunt-typescript
        typescript: {
            // Complex multiple file version.
            multifile: {
                src: ['<%= meta.dir.multifile.source %>/declaration/*.d.ts', '<%= meta.dir.multifile.source %>/ts/index.ts'],
                dest: '<%= meta.dir.multifile.temp %>/plugin.js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    removeComments: true,
                    noImplicitAny: true
                }
            },
            // Simple single file based version.
            simple: {
                src: ['<%= meta.dir.simple.source %>/declaration/*.d.ts', '<%= meta.dir.simple.source %>/ts/index.ts'],
                dest: '<%= meta.dir.simple.temp %>/plugin.js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    removeComments: true,
                    noImplicitAny: true
                }
            }
        },

        // Prepend banner and header, append footer.
        //
        // @see https://github.com/gruntjs/grunt-contrib-concat
        concat: {
            multifile: {
                src: [
                    '<%= meta.dir.multifile.source %>/template/header.js',
                    '<%= meta.dir.multifile.temp %>/plugin.js',
                    '<%= meta.dir.multifile.source %>/template/footer.js'
                ],
                dest: '<%= meta.dir.multifile.temp %>/plugin.js',
                options: {
                    banner: '<%= meta.banner.join("\\n") %>\n'
                }
            },
            // No real concatenation here: Just prepend our credentials as banner.
            simple: {
                src: [
                    '<%= meta.dir.simple.temp %>/plugin.js'
                ],
                dest: '<%= meta.dir.simple.temp %>/plugin.js',
                options: {
                    banner: '<%= meta.banner.join("\\n") %>\n'
                }
            }
        },

        // Beautifiy non-minified output.
        //
        // @see https://github.com/vkadam/grunt-jsbeautifier
        jsbeautifier: {
            multifile: {
                src: '<%= meta.dir.multifile.temp %>/plugin.js',
                options: {
                    js: {
                        breakChainedMethods: true,
                        spaceAfterAnonFunction: true
                    }
                }
            },
            simple: {
                src: '<%= meta.dir.simple.temp %>/plugin.js',
                options: {
                    js: {
                        breakChainedMethods: true,
                        spaceAfterAnonFunction: true
                    }
                }
            }
        },

        // Copies needed files (as jQuery, plugin release, html file) into demo directory; copies un-minified plugin release file
        // from temporary directory into release folder.
        //
        // @see https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            multifile: {
                // Multiple file version.
                files: [
                    {src: ['<%= meta.dir.multifile.temp %>/plugin.js'], dest: '<%= meta.dir.multifile.release %>/plugin.js', filter: 'isFile'},
                    {src: ['<%= meta.dir.multifile.release %>/plugin.js'], dest: '<%= meta.dir.multifile.demo %>/js/plugin.js'},
                    {expand: true, cwd: 'src/vendor/js/', src: ['*.js'], dest: '<%= meta.dir.multifile.demo %>/js/vendor/'},
                    {expand: true, cwd: 'src/html/', src: ['*.html'], dest: '<%= meta.dir.multifile.demo %>/'}
                ]
            },
            simple: {
                // Simple single file version.
                files: [
                    {src: ['<%= meta.dir.simple.temp %>/plugin.js'], dest: '<%= meta.dir.simple.release %>/plugin.js', filter: 'isFile'},
                    {src: ['<%= meta.dir.simple.release %>/plugin.js'], dest: '<%= meta.dir.simple.demo %>/js/plugin.js'},
                    {expand: true, cwd: 'src/vendor/js/', src: ['*.js'], dest: '<%= meta.dir.simple.demo %>/js/vendor/'},
                    {expand: true, cwd: 'src/html/', src: ['*.html'], dest: '<%= meta.dir.simple.demo %>/'}
                ]
            }
        },

        // Javascript minification. Converts release-ready plugin Javascript file into a minified version.
        //
        // @see https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            options: {
                banner: '<%= meta.banner.join("\\n") %>\n'
            },
            multifile: {
                files: {
                    '<%= meta.dir.multifile.release %>/plugin.min.js': ['<%= meta.dir.multifile.temp %>/plugin.js']
                }
            },
            simple: {
                files: {
                    '<%= meta.dir.simple.release %>/plugin.min.js': ['<%= meta.dir.simple.temp %>/plugin.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-typescript');

    grunt.registerTask('multifile', [
        'clean:tempMultifile', 'clean:releaseMultifile', 'typescript:multifile', 'concat:multifile',
        'jsbeautifier:multifile', 'uglify:multifile', 'copy:multifile', 'clean:tempMultifile'
    ]);
    grunt.registerTask('simple', [
        'clean:tempSimple', 'clean:releaseSimple', 'typescript:simple', 'concat:simple',
        'jsbeautifier:simple', 'uglify:simple', 'copy:simple', 'clean:tempSimple'
    ]);
    grunt.registerTask('default', ['clean:temp', 'multifile', 'simple', 'clean:temp']);

};