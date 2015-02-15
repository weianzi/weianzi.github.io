/**
 * Created on 2015-01-21.
 */
// 所有模块都通过 define 来定义
define(function (require, exports, module) {

    // 通过 require 引入依赖
    var $ = require("zepto");
    //懒加载
    require("lazyload");
    $(".lazyload").picLazyLoad();

    require("./slider.js").slider();

});