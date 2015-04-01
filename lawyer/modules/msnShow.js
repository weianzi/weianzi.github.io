//律师回复消息的消息详情
$(function () {

    var url = window.location.href;
    var lawyerId = url.substring(url.lastIndexOf('=') + 1);
    var consultId = 0;
    $.ajax({
        type: "POST",
        url: "/lawyer_webapp/message/lawyerRebackConsultForWeb.do",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {id: lawyerId, jsp: 1},
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == '1') {
                console.log(result);
                consultId = result.data.consultId;
                //
                $(".head .pic img").attr("src", result.data.avatar);
                $(".head .pic .tel").attr("href", "tel:" + result.data.phone);

                $(".head h2").html('律所：' + result.data.lawfirm + '<br>证号：' + result.data.worknum);
                $(".praise-num").html(result.data.praisenum);
                var html = '<h3>问题：' +
                    result.data.consultTitle + '</h3><p>回答：' +
                    result.data.rebackContent + '</p>';
                $(".lawyer-info .tab-con").eq(0).append(html);

                //点击更多回复后
                var html2 = '<p>' +
                    result.data.consultTitle + '</p><p>时间:' +
                    dateFormat(result.data.consultTime) + '</p><p>类型:' +
                    result.data.consultCategory + '</p><p>浏览次数:' +
                    result.data.commentnum + '</p>';
                $(".msn-list .tab-con").eq(0).html(html2);

            } else {
                popShow(result.msg);
            }
        }
    });


    //点赞
    $("#btnPraise").tap(function () {
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/searchlawyer/alterPraise.do?weixin=1",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {lawyerid: lawyerId},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == '1') {
                    console.log(result);
                    $(".praise-num").html(result.data.praisenum);
                } else {
                    popShow(result.msg);
                }
            }
        });
    });


    //更多回复
    $(".set").tap(function () {
        $(".views").hide().eq(1).show();
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/webconsult/consultRebacksForWeb.do",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {consultId: consultId, pageNum: 0},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == '1') {
                    console.log(result);
                    var html = '';
                    for (var i in result.data) {
                        html += '<dl class="item clearfix"><dt class="fl pic"><a href="info.html"><img class="lazyload" src="images/grey.png" data-original="' +
                            result.data[i].lawfirm + '"/></a></dt><dd><p>' +
                            result.data[i].content + '</p><div class="time"><i></i>' +
                            dateFormat(result.data[i].rebacktime) + '</div><s class="bg"></s><s></s></dd></dl>';
                    }

                    $(".msn-list .comment").html(html);

                } else {
                    popShow(result.msg);
                }
            }
        });
    });

    //点击评论
    $.ajax({
        type: "POST",
        url: "/lawyer_webapp/webconsult/lawyerCommentListForWeb.do?weixin=1",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {lawyerId: lawyerId,pageNum: 0},
        success: function (data) {
            $(".loading-data").show();
            var result = JSON.parse(data);
            if (result.code == "1") {
                var html = "";
                for (var i in result.data) {
                    html += '<dl class="item clearfix"><dt class="fl pic"><img class="lazyload" src="images/grey.png" data-original="' +
                        result.data[i].img + '"/></dt><dd><h3>' +
                        result.data[i].title + '</h3><p>' +
                        result.data[i].content + '</p><div class="time"><i></i>' +
                        result.data[i].date + '</div><s class="bg"></s><s></s></dd></dl>';
                }
                //console.log(storedData);
                $(".one-comment").html(html);
            }
        }
    });


    //返回
    $(".back").eq(1).tap(function () {
        $(".views").hide().eq(0).show();
    });

});
