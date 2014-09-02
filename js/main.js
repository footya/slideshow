requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery:"../bower_components/jquery/jquery"
    }
});
//程序执行入口
requirejs(['slideshow'],function(SlideShow) {
    new SlideShow();
});