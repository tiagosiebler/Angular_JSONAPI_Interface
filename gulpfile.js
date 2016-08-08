var gulp 				= require('gulp'),
    concat 				= require('gulp-concat'),
    uglify 				= require('gulp-uglify'),
    rename 				= require('gulp-rename'),
    sass 				= require('gulp-ruby-sass'),
	ngAnnotate 			= require('gulp-ng-annotate'),
    autoprefixer 		= require('gulp-autoprefixer'),
    htmlmin 			= require('gulp-htmlmin'),
	zip 				= require('gulp-zip'),	
	notify 				= require("gulp-notify"),
    browserSync 		= require('browser-sync').create();

var BUILD_DEST = 'build/';
var DEV_DEST = 'dev/';
var bowerComponentsPath = 'bower_components';
var vendorPath = BUILD_DEST + 'vendors';
var vendorPathDev = DEV_DEST + 'vendors';

// loaded onto the page as-is, use minified when possible or minify before moving to build via gulp process
var js_paths = {
    jquery: {
        src: bowerComponentsPath + "/jquery/dist/jquery.min.js",
        dest: "/jquery"
    },
    bootstrap: {
        src: bowerComponentsPath + "/bootstrap/dist/js/bootstrap.min.js",
        dest: "/bootstrap"
    },
	angular: {
        src: bowerComponentsPath + "/angular/angular.min.js",
        srcmap: bowerComponentsPath + "/angular/angular.min.js.map",
        dest: "/angular"
	},
	nganimate: {
		src: bowerComponentsPath + "/angular-animate/angular-animate.min.js",
		srcmap: bowerComponentsPath + "/angular-animate.min.js.map",
		dest: "/angular-animate"
	},
	nprogress: {
		src: bowerComponentsPath + "/nprogress/nprogress.js",
		dest: "/nprogress"
	}
};

var css_paths = {
    bootstrap: {
        src: bowerComponentsPath + "/bootstrap/dist/css/bootstrap.min.css",
        srcmap: bowerComponentsPath + "/bootstrap/dist/css/bootstrap.min.css.map",
        fonts: bowerComponentsPath + "/bootstrap/dist/fonts/*",
        dest: "/bootstrap"
    },
	nprogress: {
        src: bowerComponentsPath + "/nprogress/nprogress.css",//currently unused, it's loaded into the main styles.scss
        dest: "/nprogress"
	},
	animatecss: {
		src: bowerComponentsPath + "/animate.css/animate.min.css",
		dest: "/animate.css"
	}
};

// jquery
gulp.task('jquery', function () {
    return gulp.src(js_paths.jquery.src)
        .pipe(gulp.dest(vendorPath + js_paths.jquery.dest))
		.pipe(gulp.dest(vendorPathDev + js_paths.jquery.dest))
});

// angular
gulp.task('angular', function () {
    return gulp.src([
		js_paths.angular.src,
		js_paths.angular.srcmap])
        .pipe(gulp.dest(vendorPath + js_paths.angular.dest))
		.pipe(gulp.dest(vendorPathDev + js_paths.angular.dest))
});

// animations via animate.css
gulp.task('animatecss', function () {
    return gulp.src(css_paths.animatecss.src)
        .pipe(gulp.dest(vendorPath + css_paths.animatecss.dest))
		.pipe(gulp.dest(vendorPathDev + css_paths.animatecss.dest))
});

// bootstrap deps
gulp.task('bootstrap_js', function () {
    return gulp.src(js_paths.bootstrap.src)
        .pipe(gulp.dest(vendorPath + js_paths.bootstrap.dest))
		.pipe(gulp.dest(vendorPathDev + js_paths.bootstrap.dest))
});
gulp.task('bootstrap_css', function () {
    return gulp.src([
		css_paths.bootstrap.src,
		css_paths.bootstrap.srcmap])
        .pipe(gulp.dest(vendorPath + css_paths.bootstrap.dest))
        .pipe(gulp.dest(vendorPathDev + css_paths.bootstrap.dest))
});
gulp.task('bootstrap_fonts', function(){
	return gulp.src(css_paths.bootstrap.fonts)
	    .pipe(gulp.dest(vendorPath + "/fonts/"))
	    .pipe(gulp.dest(vendorPathDev + "/fonts/"))
});
gulp.task('bootstrap', ['bootstrap_js','bootstrap_css','bootstrap_fonts']);

// nprogress
gulp.task('nprogress_js', function () {
    return gulp.src(js_paths.nprogress.src)
        .pipe(gulp.dest(vendorPath + js_paths.nprogress.dest))
        .pipe(gulp.dest(vendorPathDev + js_paths.nprogress.dest))
});
gulp.task('nprogress_css', function () {
    return gulp.src(css_paths.nprogress.src)
        .pipe(gulp.dest(vendorPath + css_paths.nprogress.dest))
        .pipe(gulp.dest(vendorPathDev + css_paths.nprogress.dest))
});
gulp.task('nprogress', ['nprogress_js','nprogress_css']);

// run through all vendor deps. These should've been installed with bower beforehand
gulp.task('vendors', ['jquery','animatecss','angular','bootstrap','nprogress']);

gulp.task('js_scripts', function() {
    return gulp.src('src/js/*.js')
		.pipe(concat('custom.min.js'))
		.pipe(gulp.dest(DEV_DEST+'/js'))
		.pipe(uglify({
			/*compress: {
				drop_debugger: false
			}//*/
		}))
		.pipe(gulp.dest(BUILD_DEST+'/js'))
		.pipe(browserSync.stream());
});

// should move these into separate tasks under vendors. Otherwise results in unnecessarily large js file.
gulp.task('js_dependencies_angular', function () {
	return gulp.src([
			bowerComponentsPath + '/angular-route/angular-route.js',
			bowerComponentsPath + '/angular-animate/angular-animate.min.js',
			bowerComponentsPath + '/angular-cookies/angular-cookies.min.js',
			bowerComponentsPath + '/ng-json-explorer/dist/angular-json-explorer.min.js',
			bowerComponentsPath + '/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'./src/js/app/**/*.js'
		])

		.pipe(concat('app.js').on('error', function(e){
			console.log(e);
		}))
		.pipe(ngAnnotate().on('error', function(e){
			console.log("ngAnnotate failed");
			console.log(e);
		}))
		.pipe(gulp.dest(DEV_DEST+'/js'))

		// keep debugger statements in custom code, for development
		.pipe(uglify({
			/*compress: {
				drop_debugger: false
			}//*/
		}).on('error', function(e){
			console.log(e);
		}))
		.pipe(gulp.dest(BUILD_DEST+'/js'))
		.pipe(browserSync.stream());
		
});

gulp.task('html', function() {
	return gulp.src(['./src/**/*.html'])
		.pipe(gulp.dest(DEV_DEST))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest(BUILD_DEST))
		.pipe(browserSync.stream());
})

var compileSASS = function (filename, options) {
  return sass('src/scss/*.scss', options)
        .pipe(autoprefixer('last 2 versions', '> 5%'))
        .pipe(concat(filename))
        .pipe(gulp.dest(BUILD_DEST+'/css'))
        .pipe(gulp.dest(DEV_DEST+'/css'))
        .pipe(browserSync.stream());
};

gulp.task('sass', function() {
    return compileSASS('custom.css', {});
});

gulp.task('sass-minify', function() {
    return compileSASS('custom.min.css', {style: 'compressed'});
});

gulp.task('zip', function () {
	return gulp.src(BUILD_DEST+'/**/')
		.pipe(zip('build.zip'))
		.pipe(gulp.dest('./'))
		.pipe(notify({ message: 'Build process complete', onLast: true }));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        startPath: './dev/'
    });
});

gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('src/**/*.html', ['html']);
  // Watch .js files
  gulp.watch('src/js/*.js', ['js_scripts']);
  gulp.watch('src/js/app/**/*.js', ['js_dependencies_angular']);
  gulp.watch('bower_components/**/*.js', ['js_dependencies_angular']);
  // Watch .scss files
  gulp.watch('src/scss/*.scss', ['sass', 'sass-minify']);
});

gulp.task('build', ['sass','sass-minify','vendors', 'html', 'js_dependencies_angular','js_scripts','zip'])
// Default Task
gulp.task('default', ['build','browser-sync', 'watch']);