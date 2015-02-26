/**
 * Created on 2015-02-15.
 */
// 所有模块都通过 define 来定义
define(function (require, exports, module) {


    require("./public.js");
	
	//图片滑动
    require("./slider.js").slider();

});