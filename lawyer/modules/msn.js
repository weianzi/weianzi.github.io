//获得个人的全部消息
var storedData = []; //缓存数据

$(function () {

    var iBtn = true; //开关
    var pageNum = 1;
    showList(); //初始化

//滚动时获取新数据
    $(window).scroll(function () {
        if ($(document).height() <= $(this).scrollTop() + $(this).height()) {
            pageNum++;
            showList();
        }
    });

//获取列表数据
    function showList() {

        if (!iBtn) return;
        iBtn = false;

        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/message/messageListForWeb.do",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {pageNum: pageNum},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == '1') {

                    var html = "";
                    for (var i in result.data) {
                        html += '<a href="msn-show.html?id=' +
                            result.data[i].data.id + '"><dl class="clearfix"><dt class="fl"><img class="lazyload" src="images/grey.png" data-original="' +
                            result.data[i].data.avatar + '"/></dt><dd><h4>' +
                            result.data[i].data.rebackusername + '</h4><p>' +
                            result.data[i].data.content + '</p><span class="grey">' +
                            dateFormat(result.data[i].data.rebacktime) + '</span><span class="good" href="#"><i></i>' +
                            result.data[i].hasread + '</span></dd></dl></a>';

                    }
                    $(".news-list").append(html);

                } else {
                    popShow(result.msg);
                }
            }
        });
    }


});
