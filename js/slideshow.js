/**
 * slideshow 滑动组件
 */
define(function(require, exports, module) {
    var $ = require("jquery");
    function SlideShow() {
        this._status = {//状态数据
            focus: 0,
            totalNumber: 0,
        }
    }
    $.extend(SlideShow.prototype,{
        init:function() {
            
        }
    })
    module.exports = SlideShow;
});