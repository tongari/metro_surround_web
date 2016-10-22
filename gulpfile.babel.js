import gulp from 'gulp';
import svgmin from'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import template from 'gulp-template';
import rename from 'gulp-rename';

gulp.task('svg',()=>{
  gulp.src('./src/resource/svg/*.svg')
    .pipe(svgmin())
    .pipe(cheerio({
      run: ($) => {
        // $('style,title,defs').remove();
        $('[id]:not(symbol)').removeAttr('id');
        // $('[class^="st"],[class^="cls"]').removeAttr('class');
        $('[style]:not(svg)').removeAttr('style');
        $('[data-name]').removeAttr('data-name');
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(gulp.dest('./src/asset/svg/'));
});

gulp.task('svgSprite', () => {
  gulp.src('./src/asset/svg/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(cheerio({
      run: ($, file) => {
        // 不要なタグを削除
        // $('style,title,defs').remove();
        // // // symbolタグ以外のid属性を削除
        $('[id]:not(symbol)').removeAttr('id');
        // // // Illustratorで付与される「st」または「cls」ではじまるclass属性を削除
        // $('[class^="st"],[class^="cls"]').removeAttr('class');
        // // // svgタグ以外のstyle属性を削除
        $('[style]:not(svg)').removeAttr('style');
        // // // data-name属性を削除
        $('[data-name]').removeAttr('data-name');
        // // fill属性を削除
        $('[fill]').removeAttr('fill');
        // svgタグにdisplay:noneを付与（読み込み時、スプライト全体を非表示にするため）
        $('svg').attr({
          style: 'display:none'
        });

        // svg.htmlに渡すid
        const symbols = $('svg > symbol').map((index,elm) => {
          return {
            id: $(elm).attr('id')
          };
        }).get();

        // svg.htmlを基に、svg.htmlをルートに生成
        gulp.src('./src/asset/svg/svg.html')
          .pipe(template({
            inlineSvg: $('svg'),
            symbols: symbols
          }))
          .pipe(gulp.dest('./dist/img/'))

        gulp.src('./src/html/index.html')
          .pipe(template({
            inlineSvg: $('svg')
          }))
          .pipe(gulp.dest('./dist/'));
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('watch', () => {
  gulp.watch('./src/html/*.html', ['svg']);
});
