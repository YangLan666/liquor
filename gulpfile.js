//移入需要的模块
const gulp = require("gulp");
const sass = require("gulp-sass");
const connrct = require("gulp-connect");

//创建任务
gulp.task('server', done => { //搭建本地服务器，让dist里面的页面在这个服务器上运行
    connrct.server({
        root: 'dist',
        livereload: true
    })
    done();//异步结束
})
//创建任务
gulp.task('sass', done => { //将scss文件转换成css，拷贝到dist
    gulp.src('res/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
    done();
});
//监听html
gulp.task('html', done => { //拷贝html文件到dist
    gulp.src('res/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
    done();
});
//监听所有文件下的css
gulp.task('wacth', done => {//实时监听scss和html文件的变化，让源文件个dist目录的文件自动保持一致
    gulp.watch('res/sass/*.sass', gulp.series('sass'));
    gulp.watch('res/*.html',gulp.series('html'));
    done();
});

gulp.task('default',gulp.parallel('server','watch'));//建立默认任务，同时执行server和watch两个任务