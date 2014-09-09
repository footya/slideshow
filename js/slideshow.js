/**
 * slideshow 滑动组件
 */
define(function(require, exports, module) {
    var $ = require("jquery");

    function SlideShowModel() {
        this._data = { //状态数据
            focus: 0,
            total: 0,
            step:1
        }
    }
    $.extend(SlideShowModel.prototype, {
        //获取当前状态
        get: function(type) {
            if (type && type in this._data) {
                return this._data[type];
            } else {
                return this._data;
            }
        },
        //更新当前状态
        update: function(opt) {
            var focus = (typeof opt.focus == "number") ? opt.focus : this._data.focus;
            var total = (typeof opt.total == "number") ? opt.total : this._data.total;
            var step  = (typeof opt.step == "number") ? opt.step : this._data.step;
            this._data = { //状态数据
                focus: focus,
                total: total,
                step: step
            }
        },
        add: function() {
            this._data.focus++;
            //余数
            var remainder = this._data.total%this._data.step;
            //总步数
            var totalStep  = remainder >0 ? ((this._data.total-remainder)/this._data.step) + 1 : this._data.total/this._data.step;
            if (this._data.focus > totalStep - 1) {
                this._data.focus = 0
            }
        },
        subtract: function() {
            this._data.focus--;
             //余数
            var remainder = this._data.total%this._data.step;
            //总步数
            var totalStep  = remainder > 0 ? ((this._data.total - remainder)/this._data.step) + 1 : this._data.total/this._data.step;
            if (this._data.focus < 0) {
                this._data.focus = totalStep -1;
            }
            console.log(this._data.focus);
        }

    });

    function SlideShow(opt) {
        this._timeCell = 2000;
        this._element = opt.element; //焦点图节点
        this._opt = opt;
        this._model = new SlideShowModel();
        this.init();
    }
    $.extend(SlideShow.prototype, {
        init: function() {
            this.getDoms();
            this.initDoms();
            this._model.update({
                total: this._viewsItems.size(),
                step: this._opt.setp || 1
            });
            this.updateView();
            this.bindEvent();
            this.setTimeer();
        },
        bindEvent: function() {
            this.bindViews();
            this.bindPreViews();
            this.bindBtns();
        },
        /**
         * 获取节点
         */
        getDoms: function() {
            this._views = this._element.find("*[data-node=views]");
            this._viewsItems = this._views.children();
            this._leftBtn = this._element.find("*[data-node=left]");
            this._rightBtn = this._element.find("*[data-node=right]");
            this._preViewsItems = this._element.find("*[data-node=previews]").children();
        },
        initDoms:function() {
            this._preViewsItems.each(function (i,item) {
                $(item).data("index",i);
            })
        },
        setTimeer: function() {
            var _this = this;
            this._timmer = setInterval(function() {
                _this._model.add();
                _this.updateView();
            }, this._timeCell);
        },
        bindViews:function() {
            var _this = this;
            this._viewsItems.on("mouseenter",function() {
                clearInterval(_this._timmer);
            });
            this._viewsItems.on("mouseleave",function() {
                _this.setTimeer();
            });
        },
        bindBtns:function() {
            var _this = this;
            this._leftBtn.on("click",function(e) {
                e.preventDefault();
                clearInterval(_this._timmer);
                _this._model.subtract();
                _this.updateView();
                _this.setTimeer()
            });
            this._rightBtn.on("click",function(e) {
                e.preventDefault();
                clearInterval(_this._timmer);
                _this._model.add();
                _this.updateView();
                _this.setTimeer()
            });
        },
        bindPreViews:function() {
            var _this = this;
            this._preViewsItems.on("mouseenter",function() {
                clearInterval(_this._timmer);
                var index = $(this).data("index");
                console.log(index);
                _this._model.update({focus:index});
                _this.updateView();
            });
            this._preViewsItems.on("mouseleave",function() {
                _this.setTimeer();
            });
        },
        updateView: function() {
            var _this = this;
            var focus = this._model.get("focus");
            var step = this._model.get("step");
            // if(step == 1 ){
            //     this._viewsItems.hide();
            //     this._viewsItems.eq(focus).fadeIn();
            //     this._preViewsItems.removeClass(this._opt.preViewActiveClass);
            //     this._preViewsItems.eq(focus).addClass(this._opt.preViewActiveClass);
            // }else{
                this._viewsItems.hide();
                this._preViewsItems.removeClass(this._opt.preViewActiveClass);
                this._viewsItems.each(function(i,item) {
                    if(focus*step<=i && i < (focus+1)*step ){
                       console.log(i);
                       $(item).fadeIn();
                    }else{
                        console.log("+++++++++++++++++++++++++++++");
                    }
                });
                this._preViewsItems.each(function(i,item) {
                    if(focus*step<=i && i < (focus+1)*step ){
                       $(item).addClass(_this._opt.preViewActiveClass)
                    }
                })
            // }
        }
    })
    module.exports = SlideShow;
});