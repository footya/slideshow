requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery:"../bower_components/jquery/jquery"
    }
});
//程序执行入口
requirejs(['slideshow'], function(SlideShow) {
    new SlideShow({
        element: $("#j-slide-show"),
        preViewActiveClass:"slide-show-previews-item-active",
        type:"slide"
    });
    new SlideShow({
        element: $("#j-slide-list"),
        preViewActiveClass:"slide-show-previews-item-active",
        setp:6,
        type:"slide"
    });
    // new SlideShow({
    //     element: $("#j-slide-list2"),
    //     preViewActiveClass:"slide-show-previews-item-active",
    // });
});