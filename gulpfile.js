const gulp = require('gulp');

const paths = {
  html: {
    src: 'src/*.html',
    dest: 'dist'
  },
  styles: {
    src: 'src/styles/**/*.+(css|scss)',
    dest: 'dist/styles',
    cssDest: 'src/styles/css'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/scripts'
  },
  images: {
    src: 'src/images/**/*.+(gif|jpg|jpeg|png|svg)',
    dest: 'dist/images'
  }
};

// ===== HTML tasks =====
const htmlmin = require('gulp-htmlmin');

function html () {
  return gulp
  .src(paths.html.src)
  .pipe(htmlmin({
    collapseWhitespace: true,
    minifyCSS: true,
    removeComments: true,
    html5: true
  }))
  .pipe(gulp.dest(paths.html.dest))
}

exports.html = html;

// ===== STYLES tasks =====
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

function styles () {
  return gulp
  .src(paths.styles.src)
  .pipe(sass({
    outputStyle: 'expanded'
  }).on('error', sass.logError))
  .pipe(gulp.dest(paths.styles.cssDest))
  .pipe(cssnano({
    autoprefixer: {
      browsers: [
        "last 2 versions",
        "ie >= 9"
      ],
      add: true
    }
  }))
  .pipe(gulp.dest(paths.styles.dest))
}

exports.styles = styles;

// ===== SCRIPTS tasks =====
const uglify = require('gulp-uglify');

function scripts () {
  return gulp
  .src(paths.scripts.src)
  .pipe(uglify())
  .pipe(gulp.dest(paths.scripts.dest))
}

exports.scripts = scripts;

// ===== IMAGE tasks =====
const imagemin = require('gulp-imagemin');

function images () {
  return gulp
  .src(paths.images.src, {since: gulp.lastRun(images)})
  .pipe(imagemin([
    imagemin.gifsicle({interlaced: true}),
    imagemin.jpegtran({progressive: true}),
    imagemin.optipng({optimizationLevel: 1}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest(paths.images.dest))
  }

exports.images = images;

// ===== BrowserSync Reload =====
const browsersync = require('browser-sync');

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
}

function reload(done) {
  browsersync.reload();
  done();
}

// ===== WATCH files =====
function watchFiles() {
  gulp.watch(paths.html.src, gulp.series(html, reload));
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  gulp.watch(paths.images.src, gulp.series(images, reload));
}

const watch = gulp.parallel(watchFiles, browserSync);

exports.watch = watch;

// ===== HELPER tasks =====
// Copy additional files
function copy() {
  return gulp
  .src('src/*.+(txt|xml|ico|png)')
  .pipe(gulp.dest('dist'))
}

// Build the distribution folder
const build = gulp.parallel(html, styles, scripts, images, copy);

exports.build = build;

// Delete the processed files
const del = require('del');

function clean() {
  return del([
    'dist',
    paths.styles.cssDest
  ]);
}

exports.clean = clean;

// Build and start watching for changes
exports.serve = gulp.series(build, watch);