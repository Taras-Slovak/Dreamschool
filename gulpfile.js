'use strict';

let project_folder = require('path').basename(__dirname);

let src_folder = '#src';

let fs = require('fs');

let path = {

	build: {
		// html: project_folder + "/",
		html: project_folder + '/',
		css: project_folder + '/css/',
		js: project_folder + '/js/',
		img: project_folder + '/images/',
		svg: project_folder + '/svg/',
		fonts: project_folder + '/fonts/',
		video: project_folder + '/video/'
	},

	src: {
		//   html: [src_folder + "/*.html", "!" + src_folder + "/_*.html"],
		pug: [src_folder + '/pug/**/*.pug', "!" + src_folder + '/pug/**/_*.pug' ],
		css: src_folder + '/scss/*.scss',
		js: src_folder + '/js/*.js',
		img: src_folder + '/images/**/*.+(png|jpg|gif|ico|webp)',
		svg: src_folder + '/svg/*.svg',
		fonts: src_folder + '/fonts/*.ttf',
		video: src_folder + '/video/*.mp4'
	},

	watch: {
		//    html: src_folder + "/**/*.html",
		pug: src_folder + '/pug/**/*.pug',
		css: src_folder + '/scss/**/*.scss',
		js: src_folder + '/js/**/*.js',
		img: src_folder + '/images/**/*.+(png|jpg|gif|ico|webp)',
		video: src_folder + '/video/*.mp4',
		svg: src_folder + '/svg/*.svg'
	},
	clean: './' + project_folder + '/'
};

let {
	src,
	dest
} = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	gcmq = require('gulp-group-css-media-queries'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify-es').default,
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	svgSprite = require('gulp-svg-sprite'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	// babel = require('gulp-babel'),
	// svgmin = require('gulp-svgmin'),
	cachebust = require('gulp-cache-bust'),
	pug = require('gulp-pug');








function browserSync() {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/'
		},
		port: 3000,
		notify: true
	});
}



// HTML --------------------------------------

// function html() {
// 	return src(path.src.html)
// 		.pipe(plumber({
// 			errorHandler: notify.onError(function (err) {
// 				return {
// 					title: 'HTML',
// 					sound: false,
// 					message: err.message,
// 				}
// 			})
// 		}))
// 	pipe(fileinclude())

// 		.pipe(dest(path.build.html))
// 		.pipe(browsersync.stream())
// }

// PUG -----------------------------------------------------------------------

function buildHTML() {
	return src(path.src.pug)
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: 'PUG',
						sound: false,
						message: err.message,
					};
				})
			}))

		.pipe(
			pug({
				//change (true or false) = (min or no)
				pretty: true
			}))

		.pipe(dest(path.build.html))

		.pipe(cachebust({
			type: 'timestamp'
		}))
		.pipe(dest(path.build.html))

		.pipe(browsersync.stream());
}



function css() {
	return src(path.src.css)
		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: 'Styles',
						sound: false,
						message: err.message,
					};
				})
			}))


		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)

		.pipe(
			gcmq()
		)
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true
			})
		)

		.pipe(dest(path.build.css))
		.pipe(cleanCSS())
		.pipe(
			rename({
				extname: '.min.css'
			})
		)

		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

function js() {
	return src(path.src.js)

		.pipe(
			plumber({
				errorHandler: notify.onError(function (err) {
					return {
						title: 'JavaScript',
						sound: true,
						message: err.message,
					};
				})
			}))

		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		// .pipe(babel({
		// 	presets: ['@babel/env']
		// }))
		// .pipe(gulp.dest(path.build.js + 'babel/'))
		// .pipe(dest(path.build.js))
		.pipe(uglify())

		.pipe(
			rename({
				extname: '.min.js'
			})
		)

		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

function images() {
	return src(path.src.img)
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.img))
		.pipe(src(path.src.img))
		.pipe(
			imagemin([
				imagemin.gifsicle({
					interlaced: true
				}),
				imagemin.mozjpeg({
					quality: 70,
					progressive: true
				}),
				imagemin.optipng({
					optimizationLevel: 3
				}),
				imagemin.svgo({
					plugins: [{
							removeViewBox: true
						},
						{
							cleanupIDs: true
						}
					]
				})
			]))
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream());
}

function video() {
	return src(path.src.video)

		.pipe(dest(path.build.video))
		.pipe(browsersync.stream());
}

function svg() {
	return src(path.src.svg)
	
		// .pipe(svgmin({
		// 	plugins: [{
		// 		removeDoctype: true
		// 	}, {
		// 		removeComments: true
		// 	}, {
		// 		cleanupNumericValues: {
		// 			floatPrecision: 2
		// 		}
		// 	}, {
		// 		convertColors: {
		// 			names2hex: true,
		// 			rgb2hex: true
		// 		}
		// 	}]
		// }))

		.pipe(dest(path.build.svg))
		.pipe(browsersync.stream());
}



function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));

	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
}

// ************TASKS***********

gulp.task('otf2ttf', function () {
	return src([src_folder + '/fonts/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(src_folder + '/fonts'));
});

gulp.task('sprite', function () {
	return gulp.src([src_folder + '/svg/*.svg'])
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../sprite.svg', // sprite file name
					example: false
				}
			},
		}))
		.pipe(dest(src_folder + '/svg/'));
});

// ************TASKS***********

function fontsStyle() {

	let file_content = fs.readFileSync(src_folder + '/scss/includes/fonts.scss');
	if (file_content == '') {
		fs.writeFile(src_folder + '/scss/includes/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(src_folder + '/scss/includes/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		});
	}
}

function cb() {}

function watchFiles() {
	gulp.watch([path.watch.pug], buildHTML);

	// gulp.watch([path.watch.html], html);

	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.svg], svg);
	gulp.watch([path.watch.video], video);
}

function clean() {
	return del(path.clean);
}

// buildHTML or html


function browserSyncDelay (){
	setTimeout(browserSync, 10000);
}

let build = gulp.series(clean, gulp.parallel (js, css, buildHTML, images, fonts, video, svg), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSyncDelay);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.video = video;
exports.svg = svg;
exports.buildHTML = buildHTML;
// exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;