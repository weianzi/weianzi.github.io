$(function () {

    //懒加载
    $(".lazyload").picLazyLoad();

    //苹果CSS无hover
    fnHover($(".myLinks"));
    function fnHover(myLinks) {
        for (var i = 0; i < myLinks.length; i++) {
//			myLinks.bind("touchstart", function(){
//				$(this).addClass("hover");
//			}).bind("touchend", function(){
//				$(this).removeClass("hover");
//			});	
            myLinks.bind("click", function () {
                $(this).addClass("hover");
            });
        }
    }

    //回复详情 切换
    $(".lawyer-info .tab li").each(function (index) {
        $(this).click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            $(".lawyer-info .tab-con").hide().eq(index).show();
        });
    });

    $(".msn-list .tab > div").each(function (index) {
        $(this).click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            $(".msn-list .tab-con").hide().eq(index).show();
        });
    });

});