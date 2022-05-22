const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
// const sassGlob = require("gulp-sass-glob"); не работает
// const autoprefixer = require("gulp-autoprefixer"); не работает
// const px2rem = require("gulp-smile-px2rem"); разобраться потом 
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const svgo = require("gulp-svgo");
const svgSprite = require("gulp-svg-sprite");
const gulpif = require("gulp-if");

const env = process.env.NODE_ENV;

const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require("./gulp-config");

sass.compiler = require("node-sass");

task("clean", () => {
  console.log(env);
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("copy:img", () => {
  return src(`${SRC_PATH}/images/**/*.png`)
  .pipe(dest(DIST_PATH))
  .pipe(reload({ stream: true }));
})

task("styles", () => {
  return (
    src([...STYLES_LIBS, "src/styles/main.scss"])
      .pipe(gulpif(env === "dev", sourcemaps.init()))
      .pipe(concat("main.min.scss"))
      // .pipe(sassGlob()) не работает
      .pipe(sass().on("error", sass.logError))
      // .pipe(px2rem())
      // .pipe(autoprefixer({
      //   cascade: false
      // })) не работает
      .pipe(gulpif(env === "prod", gcmq())) //мешает плагину sourcemaps(при необходимости отключить)
      .pipe(gulpif(env === "prod", cleanCSS({ compatibility: "ie8" })))
      .pipe(gulpif(env === "dev", sourcemaps.write()))
      .pipe(dest(DIST_PATH))
      .pipe(reload({ stream: true }))
  );
});

task("scripts", () => {
  return src([...JS_LIBS, "src/scripts/*.js"])
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.js", { newLine: ";" }))
    .pipe(
      (env === "prod",
      babel({
        presets: ["@babel/env"],
      }))
    )
    .pipe(gulpif(env === "prod", uglify()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
});

task("icons", () => {
  return src("src/images/icons/*.svg")
    .pipe(
      svgo({
        plugins: [
          {
            removeAttrs: {
              attrs: "(fill|stroke|style|width|height|data.*)",
            },
          },
        ],
      })
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest(`${DIST_PATH}/images/icons`));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    }
  });
});

task("watch", () => {
  watch("./src/styles/**/*.scss", series("styles"));
  watch("./src/*.html", series("copy:html"));
  watch("./src/scripts/*.js", series("scripts"));
  watch("./src/images/icons/*.svg", series("icons"));
  watch("./src/images/**", series("copy:img"));
});

task(
  "default",
  series(
    "clean",
    parallel("copy:html", "styles", "scripts", "icons", "copy:img"),
    parallel("watch", "server")
  )
);

task(
  "build",
  series("clean", parallel("copy:html", "styles", "scripts", "icons"))
);
