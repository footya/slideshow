/**
 * slideshow 滑动组件
 */
define(function(require, exports, module) {
    var $ = require("jquery");
    function SlideShow(opt) {
        this._element = opt.element;//焦点图节点
        this._status = {//状态数据
            focus: 0,
            totalNumber: 0,
        }
        this.init();
    }
    $.extend(SlideShow.prototype,{
        init:function() {
            
        },
        /**
         * 获取节点
         */
        getDoms:function() {
            this._views = this._element.find("*[data-node=views]");
            this._viewsItems = this._views.find("li");
        }
    })
    module.exports = SlideShow;
});