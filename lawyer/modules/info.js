//律师详情
$(function () {

    var url = window.location.href;
    var lawyerId = url.substring(url.lastIndexOf('=') + 1);
    //专长、简介、风采内容
    $.ajax({
        type: "POST",
        url: "/lawyer_webapp/searchlawyer/lawyerDetailForWeb.do?weixin=1",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {lawyerId: lawyerId, jsp: 1},
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == '1') {
                console.log(result);
                $(".head .pic img").attr("data-original", result.src);
                $(".head .h2").html('律所：' + result.lawyer + '<br>证号：' + result.lawyerId + '');

                var html01 = '<p>' + result.data.rebackContent + '</p>';//专长
                var html02 = '<p>' + result.data.rebackContent + '</p>';//简介

                var img = "";
                for (var i in result.data.img) {
                    img += '<img src=' + result.data.img[i].src + '/>';
                }

                var html03 = '<p>' + img + '</p>';//风采

                $("section .con").eq(0).html(html01);
                $("section .con").eq(1).html(html02);
                $("section .con").eq(2).html(html03);
                $(".praise-num").html(result.praise);

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
            data: {lawyerId: lawyerId, jsp: 1},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == '1') {
                    console.log(result);
                    $(".praise-num").html(result.data);
                } else {
                    popShow(result.msg);
                }
            }
        });
    });

});
