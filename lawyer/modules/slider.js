
$(function () {

    slider();

});

function slider() {

    /*去空格和换行(代码中的空格和换行会在浏览器解析时，解析成一个空格，造成位置运算有偏差)*/
    var $slider = $("#slider");
    var hm = $slider.html();
    var b = hm.replace(/\n|\r/g, "").replace(/>\s*</g, '><').replace(/\s*</g, "<");
    $slider.html(b);

    /* 设置每个图片的宽度 */
    var img_w = $slider.width();
    $slider.find(".item img").width(img_w + "px");

    var pic_num = $slider.find(".items .item").length / 3;
    /* 每组图片的数量 */
    $slider.css("margin-left", -1 * (img_w * pic_num) + "px");
    /* 默认显示中间那一组的第一个图片 */
//$("#msg").text("pic.width:" + img_w);

//触摸部分
    var touch = {};
    var scrollSupressionThreshold = 1;
    /* 触发touchmove的敏感度 */
    var verticalDistanceThreshold = 60;
    /* swipe的触发水平方向move必须大于这个距离 */

// add touch start listener
    var canvas = document.getElementById("slider");
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);
    canvas.addEventListener("touchend", touchEnd, false);
    canvas.addEventListener("touchcancel", touchCancel, false);

    function touchStart(event) {
        var tc = event.touches[0];
        touch.marginLeft = $slider.css("margin-left");
        /* 最原始的坐标值 */
        touch.x = tc.pageX;
        touch.x1 = tc.pageX;

        /* 清除定时 */
        clearInterval(timer);
    }

    function touchMove(event) {
        if (touch.length == 0) return;
        var tc = event.touches[0];
        touch.x2 = tc.pageX;

        if (Math.abs(touch.x1 - touch.x2) > scrollSupressionThreshold) {
            event.preventDefault();

            var a = $slider.css("margin-left");
            $slider.css("margin-left", (parseInt(a) + (touch.x2 - touch.x1)) + "px");
            touch.x1 = touch.x2;
        }
    }

    function touchEnd(event) {
        var movePos = touch.x2 - touch.x;
        /* 每次移动的距离 */

        /* 判断是否换图片 */
        if (Math.abs(movePos) > verticalDistanceThreshold) {
            /* 判断左移一张还是右移一张 */
            var c = 1;
            if (movePos < 0) {
                c = -1;
            }

            var m_left = parseInt(touch.marginLeft) + c * img_w;
            /* 本次要移动到的位置 */

            /* 动画切换图片 */
            aninateChangePic(m_left, 100);

        } else {
            /* 移动的距离不够，让图片还原到移动前的位置 */
            $slider.animate({"margin-left": touch.marginLeft}, 200, 'ease', function () {
                showPageNo();
            });

            //$("#msg").text( "reset  "  + touch.x);
        }

        touch = {};

        /* 重新启动定时 */
        setTimer();
    }

    function touchCancel(event) {
        touch = {};
    }

    /* 显示当前是第几张图 */
    function showPicNo() {
        /* 得到当前是第几张图 */
        var a = $slider.css("margin-left");
        var b = Math.abs(parseInt(a));
        var seq = parseInt(b / img_w) % pic_num + 1;

        $(".touchBox .picTab li").width($slider.find(".item img").width() / 3);

        $(".touchBox .picTab li").removeClass("active").eq(seq - 1).addClass("active");

        //$("#picNo").text(seq + "/" + pic_num);
    }

    /* 定时换图 */
    function changePicTimer() {
        var a = $slider.css("margin-left");
        var m_left = parseInt(a) - img_w;
        /* 本次要移动到的位置 */

        /* 动画切换图片 */
        aninateChangePic(m_left, 400);

    }

    /* 动画切换图片  */
    function aninateChangePic(m_left, timeout) {
        /* 动画移动 */
        $slider.animate({"margin-left": m_left + "px"}, timeout, 'ease', function () {

            /* 处理循环的问题(此处是为了处理无限左移或无限右移的问题) */
            if (m_left == 0 || Math.abs(m_left) >= img_w * pic_num * 2) {
                $slider.css("margin-left", "-" + (img_w * pic_num) + "px");
                //$("#msg").text("reset ok!");
            }
            showPicNo();
        });
    }

    /* 设置定时变换图片 */
    var timer = "";

    function setTimer() {
        timer = setInterval(changePicTimer, 4000);
    }

    setTimer();

    showPicNo();
}
