$(function () {

    var lawyerId = 1;

    var iBtn = true; //开关
    var pageNum = 0;
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

        var postData = {
            lawyerId:lawyerId,
            pageNum: pageNum
        };
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/webconsult/lawyerConsultList.do?weixin=1",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: postData,
            success: function (data) {
                $(".loading-data").show();
                var result = JSON.parse(data);
                if (result.code == "1") {
                    var html = "";
                    for (var i in result.data) {

                        html += '<dl class="item clearfix"><dt class="fl pic"><img class="lazyload" src="images/grey.png" data-original="' +
                        result.data[i].img + '"/></dt><dd><h3>' +
                        result.data[i].title + '</h3><p>' +
                        result.data[i].content + '</p><span>' +
                        result.data[i].date + '</span></dd></dl>';

                    }
                    //console.log(storedData);
                    $(".comment").append(html);
                }
            }
        });

        setTimeout(function () {
            $(".loading-data").hide();
        }, 800);

        iBtn = true;
    }

});