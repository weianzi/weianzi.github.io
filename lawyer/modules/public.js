/**
 * Created on 2015-02-15.
 */

define(function (require, exports, module) {

    // 通过 require 引入依赖
    var $ = require("zepto");

    //懒加载
    require("lazyload");
    $(".lazyload").picLazyLoad();
	
	//苹果CSS无hover
	function fnHover( myLinks ){
		for(var i = 0; i < myLinks.length; i++){
			myLinks.bind("touchstart", function(){
				$(this).addClass("hover");
			}).bind("touchend", function(){
				$(this).removeClass("hover");
			});	
		}
	}
	fnHover( $(".myLinks") );

});