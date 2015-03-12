$(function () {

    //苹果手机 CSS无hover
    $(".myLinks").on("tap", function () {
        $(this).addClass("hover");
    });
    $(document).on("tap", function (ev) {
        if (!$(ev.target).hasClass("myLinks")) {
            $(".myLinks").removeClass("hover");
        }
    });


    //回复详情 切换
    $(".lawyer-info .tab li").each(function (index) {
        $(this).tap(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            $(".lawyer-info .tab-con").hide().eq(index).show();
        });
    });

    //问答 切换
    $(".msn-list .tab > div").each(function (index) {
        $(this).tap(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            $(".msn-list .tab-con").hide().eq(index).show();
        });
    });

    //二级标题 切换
    $(".tab-title li").each(function (index) {
        $(this).tap(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            $(this).parents(".tab-title").siblings(".form-list").hide().eq(index).show();
        });
    });


    //弹出提示

    $(".pop-box .btn").tap(function () {
        hideMe();
    });
    $(".pop-box .close").tap(function () {
        hideMe();
    });
    function hideMe() {
        $(".pop-allbg").hide();
        $(".pop-box").hide();
    }


    $(".specification-pop .btn").tap(function () {
        $(".specification-pop").hide();
        $(".pop-allbg").hide();
    });

});