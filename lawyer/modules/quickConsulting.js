$(function () {

    //初始化
    var iBtn = true; //开关
    var orderType = 0;
    var pageNum = 1;
    var allPageNum;
    showList(orderType);

    $(".tab-title li").tap(function () {
            pageNum = 1;
            orderType = $(this).attr("tabindex");
            $(".form-list").html("");
            showList(orderType);
        }
    );

    //滚动获取新数据
    $(window).scroll(function () {
        if ($(document).height() <= $(this).scrollTop() + $(this).height()) {
            pageNum++;
            if (pageNum > allPageNum) {
                return;
            }
            showList(orderType);
            //console.log(pageNum);
        }
    });

    //获取数据
    function showList(orderType) {

        if (!iBtn) {
            return;
        }
        iBtn = false;
        var postData = {
            orderType: orderType,
            pageNum: pageNum,
            jsp: 1
        };

        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/first_commonuser/consultList.do?weixin=1",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: postData,
            success: function (data) {
                $(".loading-data").show();
                var result = JSON.parse(data);
                if (result.code == "1") {
                    allPageNum = 2;//暂时写死
                    //allPageNum = result.allPageNum; 后台要返回一个总页数
                    var html = "";
                    for (var i in result.data) {

                        html += '<div class="item clearfix"><a class="fl" href="quick-consulting-reply.html"><p>'
                            + result.data[i].content + '</p><span class="grey">'
                            + result.data[i].createtime + '</span><div>'
                            + result.data[i].ctype + '</div></a><a class="fr" href="#'
                            + result.data[i].userid + '">回复 ></a></div>';
                    }

                    $(".form-list").eq(orderType).append(html);
                }
            }
        });

        setTimeout(function () {
            $(".loading-data").hide();
        }, 1000);

        iBtn = true;
    }

});
