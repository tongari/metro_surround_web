import gulp from 'gulp';
import svgmin from'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import template from 'gulp-template';
import rename from 'gulp-rename';
import glob from 'glob';
import footer from 'gulp-footer';

const trimFileName = (str) => {
  const result = str.split('').reduce((prev, cur, index)=>{
    const prevText = (index === 1) ? prev.toUpperCase() : prev;
    return prevText+cur;
  });
  return result.toString().replace(/-/g, '');
};

const createIconComponents = (list)=> {
  return list.reduce((prev,cur)=>{
    return prev+ '\n'+ "const "+ trimFileName(cur) +" = props => <Icon iconName={'"+ cur +"'}{...props} />;"
  },'');
};

const createExportComponents = (list) => {
  const addExport = list.reduce((prev, cur, index, array)=>{
    const curObj = (index === array.length-1)? cur: `${cur}, `;
    return `${prev}${trimFileName(curObj)}`;
  },'');
  return `export { ${addExport} };`;
};

gulp.task('svg',()=>{

  glob('./src/resource/svg/*.svg', (err, files) => {
    const list = files.map( (entry) => {
      const paths = entry.split('/');
      return paths[paths.length-1].replace(/\.svg/,'');
    });

    const addIconComponent = `${createIconComponents(list)}\n${createExportComponents(list)}`;

    gulp.src('./src/resource/svg/template.jsx')
      .pipe(footer(`${addIconComponent}\n`))
      .pipe(rename('Icon.jsx'))
      .pipe(gulp.dest('./src/js/components/icon/'));
  });

  gulp.src('./src/resource/svg/*.svg')
    .pipe(svgmin())
    .pipe(cheerio({
      run: ($,file) => {
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

/*
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
*/
