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

    //关闭弹出提示
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

    //关闭弹出说明
    $(".specification-pop .btn").tap(function () {
        $(".specification-pop").hide();
        $(".pop-allbg").hide();
    });

    //底部导航
    $(".toolbar > a").tap(function () {
        $(this).addClass("active").sibling().removeClass("active");
    });

});

//弹出提示
function popShow(msg, fn) {
    $(".pop-allbg").css("display", "block");
    $(".pop-box").css("display", "block");
    $(".pop-box > .msn-text").html(msg);
    if (fn) fn();
}

function toLogin() {
    $(".pop-box .btn").tap(function () {
        location.href = "login.html";
    });

    $(".pop-box .close").tap(function () {
        location.href = "login.html";
    });
}


//转换处理状态
function isDeal(str) {
    switch (str) {
        case "1":
            return "已处理";
            break;
        case "0":
            return "未处理";
            break;
        default:
            return "未处理";
    }
}

//转换日期
function dateFormat(str) {

    var newStr = str.split(" ");
    var year = newStr[2];
    var month = newStr[0];
    var date = parseInt(newStr[1]);

    switch (month) {
        case "Jan":
            month = "1";
            break;
        case "Feb":
            month = "2";
            break;
        case "Mar":
            month = "3";
            break;
        case "Apr":
            month = "4";
            break;
        case "May":
            month = "5";
            break;
        case "Jun":
            month = "6";
            break;
        case "Jul":
            month = "7";
            break;
        case "Aug":
            month = "8";
            break;
        case "Sep":
            month = "9";
            break;
        case "Oct":
            month = "10";
            break;
        case "Nov":
            month = "11";
            break;
        case "Dec":
            month = "12";
            break;
    }

    function toTwo(n) {
        return n < 10 ? "0" + n : "" + n;
    }

    return year + "-" + toTwo(month) + "-" + toTwo(date);

}