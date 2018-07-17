'use strict';

module.exports = function(grunt) {
	var SCRIPT_SRC_FOLDER  = './src/es6/';
	var STYLE_SRC_FOLDER   = './src/sass/';
	var SCRIPT_DIST_FOLDER = './dist/script/';
	var STYLE_DIST_FOLDER  = './dist/style/';

	require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', '@*/grunt-*', 'gruntify-*'] });

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				options: {
					transform: [
						['babelify', {
							presets: 'es2015',
							plugins: ['transform-object-rest-spread']
						}]
					],
					browserifyOptions: {
						debug: true
					}
				},
				src: SCRIPT_SRC_FOLDER + 'main.js',
				dest: SCRIPT_DIST_FOLDER + 'script.js',
			}
		},
		clean: {
			script: SCRIPT_DIST_FOLDER + '*.*',
			style: STYLE_DIST_FOLDER + '*.*'
		},
		eslint: {
			src: [SCRIPT_SRC_FOLDER + '**/*.js']
		},
		sass: {
			target: {
				options: {
					sourceMap: true,
					outputStyle: 'expanded'
				},
				files: {
					[STYLE_DIST_FOLDER + 'style.css']: STYLE_SRC_FOLDER + 'main.scss'
				}
			}
		},
		sasslint: {
			options: {
				configFile: './.sass-lint.yml',
				maxWarnings: 2000
			},
			target: [STYLE_SRC_FOLDER + '**/*.scss']
		},
		watch: {
			options: {
				livereload: 35729
			},
			script: {
				files: [SCRIPT_SRC_FOLDER + '**/*.js'],
				tasks: ['script']
			},
			style: {
				files: [STYLE_SRC_FOLDER + '**/*.scss'],
				tasks: ['style']
			},
			html: {
				files: ['./**/*.html']
			}
		}
	});

	grunt.registerTask('script', ['eslint', 'clean:script', 'browserify']);
	grunt.registerTask('style', ['sasslint', 'clean:style', 'sass']);

	grunt.registerTask('lint', ['eslint', 'sasslint']);
	grunt.registerTask('build', ['style', 'script']);

	grunt.registerTask('default', ['build']);
};
