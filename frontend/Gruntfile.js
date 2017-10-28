/**
 * Created by Jiahui on 4/11/17.
 */

'use strict';

module.exports = function(grunt) {


    var append_prefix = function (urls, prefix, excludes) {
        for (var key in urls) {
            if (!excludes || excludes.indexOf(key) == -1) {
                urls[key] = prefix + urls[key];
            }
        }
        return urls;
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngconstant: {
            options: {
                space: '  ',
                wrap: '"use strict";\n\nvar ChallengerApp = {%= __ngModule %}',
                name: 'ChallengerApp',
                deps: [
                    // 'ngAnimate',
                    'ngAria',
                    'ngCookies',
                    'ngRoute',
                    // 'ngResource',
                    // 'ngSanitize',
                    // 'ngMessages',
                    'ui.router'
                ]
            },
            dev: {
                options: {
                    dest: './app/scripts/config.js'
                },
                constants: {
                    $env: {
                        name: 'dev',
                        urls: grunt.file.readJSON('./app/config/development_urls.json')
                    }
                }
            },
            it: {
                options: {
                    dest: './app/scripts/config.js'
                },
                constants: {
                    $env: {
                        name: 'it',
                        host: 'http://localhost:3000',
                        urls: append_prefix(grunt.file.readJSON('./app/config/development_urls.json'), 'http://localhost:3000')
                    }
                }
            }
        },
        shell: {
            bower_install: {
                options: {
                    stderr: true,
                    stdout: true
                },
                command: 'bower install  --allow-root '
            }
        },
        wiredep: {
            task: {
                src: [
                    './app/index.html'
                ]
            }
        },
    });

    // Load the plugin that provides the "it" task.
    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-ng-constant');


    // register command
    grunt.registerTask('it', [
        'npm-install',
        'ngconstant:it',
        'shell:bower_install',
        'wiredep:task',
    ]);

};