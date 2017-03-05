var gulp=require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();


// 静态服务器
gulp.task('server', function() {

    global.isWatching = true;
    browserSync.init({
        server: {
            baseDir: "./",
            directory: true
        },
        port:8000,
        browser: ["google chrome"], // 在chrome下打开该站点
        notify:false,
        open:'external',//是否自动打开浏览器
        ghostMode: false//点击，滚动和表单在任何设备上输入将被镜像到所有设备里
    });
    gulp.watch("*").on("change", browserSync.reload);
});
