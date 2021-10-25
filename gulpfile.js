const { src, dest, parallel, watch } = require("gulp"),
  browserSync = require("browser-sync").create(),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify-es").default,
  sass = require("gulp-sass")(require("sass")),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  imagecomp = require("compress-images"),
  del = require("del"),
  reload = browserSync.reload;

async function images() {
  imagecomp(
    "./img/src/**/*", // Берём все изображения из папки источника
    "./img/dest/", // Выгружаем оптимизированные изображения в папку назначения
    { compress_force: false, statistic: true, autoupdate: true },
    false, // Настраиваем основные параметры
    { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
    { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (err, completed) {
      // Обновляем страницу по завершению
      if (completed === true) {
        browserSync.reload();
      }
    }
  );
}

function cleanimg() {
  return del("./img/dest/**/*", { force: true }); // Удаляем все содержимое папки "app/images/dest/"
}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

function scripts() {
  return src("./js/main.js")
    .pipe(concat("main.min.js")) // Конкатенируем в один файл
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest("./js/")) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
}

function styles() {
  return src("./scss/main.scss")
    .pipe(sass())
    .pipe(concat("main.min.css"))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(
      cleanCSS({
        level: { 1: { specialComments: 0 } } /* , format: 'beautify' */,
      })
    )
    .pipe(dest("./css/"))
    .pipe(reload({ stream: true }));
}

function startwatch() {
  // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
  watch(["./**/*.js", "!./**/*.min.js"], scripts);
  watch("./scss/*.scss", styles);
  watch("./**/*.html").on("change", browserSync.reload);
  watch("./images/src/**/*", images);
}

exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.default = parallel(styles, images, scripts, serve, startwatch);
