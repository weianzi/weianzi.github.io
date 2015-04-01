//律师详情
$(function () {

    var url = window.location.href;
    var lawyerId = url.substring(url.lastIndexOf('=') + 1);

    $('.top-tip ul').html('<li><a href="one-consulting.html?id='+
        lawyerId +'">咨询</a></li><li><a href="one-msn-reply.html?id='+
        lawyerId +'">回复</a></li><li><a href="one-comment.html?id='+
        lawyerId +'">评论</a></li><li><a href="#">分享</a></li>');

    //专长、简介、风采内容
    $.ajax({
        type: "POST",
        url: "/lawyer_webapp/searchlawyer/lawyerDetailForWeb.do?weixin=1",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {lawyerId: lawyerId},
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == '1') {
                console.log(result);
                $('.head h1').html('<h1>'+ result.data.name +'</h1>');
                $(".head .pic img").attr("src", result.data.avatar);
                $(".head .pic .tel").attr("href", "tel:" + result.data.phone);
                $(".head h2").html('律所：' + result.data.lawfirm + '<br>证号：' + result.data.workNum);
                $(".praise-num").html(result.data.praiseNum);

                var html01 = '<p>' + result.data.lawyerdynamics + '</p>';//专长
                var html02 = '<p>' + result.data.lawyerdynamics + '</p>';//简介

                var img = "";
                for (var i in result.data.img) {
                    img += '<img src=' + result.data.img[i].src + '/>';
                }

                var html03 = '<p>' + img + '</p>';//风采

                $("section .con").eq(0).html(html01).end()
                    .eq(1).html(html02).end()
                    .eq(2).html(html03);

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
            data: {lawyerId: lawyerId},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == '1') {
                    console.log(result);
                    $(".praise-num").html(result.data.praiseNum);
                } else {
                    popShow(result.msg);
                }
            }
        });
    });

});