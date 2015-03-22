//私人律师
$.extend(validateFunction, {
    FORM_validate: function () {
        $("#private_lawyer_time").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#private_lawyer_address").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#private_lawyer_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#private_lawyer_time", "#private_lawyer_address", "#private_lawyer_content"]);
    }
});

$(function () {

    var url = window.location.href;
    var lawyerId = url.substring(url.lastIndexOf('=') + 1);
    //
    $.ajax({
        type: "POST",
        url: "/lawyer_webapp/familyLawyer/onesLawyerForWeb.do",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == '1') {
                console.log(result);
                $(".head .pic img").attr("data-original", result.src);
                $(".head .h2").html('律所：' + result.lawyer + '<br>证号：' + result.lawyerId + '');
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


    // 预约提交
    $("#private_lawyer_time").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#private_lawyer_address").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#private_lawyer_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);

    $("#btnPrivateLawyer").tap(function () {
        var time = $("#private_lawyer_time").val();
        var address = $("#private_lawyer_address").val();
        var content = $("#private_lawyer_content").val();
        var postData = {
            lawyerId: lawyerId,
            time: time,
            address: address,
            content: content
        };
        var flag = validateFunction.FORM_validate();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/familyLawyer/doOnesFamilyLawyerVisiteService.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: postData,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == '1') {
                        popShow(result.msg);
                    } else if (result.code == '2') {
                        popShow("请登陆");
                    } else {
                        popShow("服务器忙，请稍后再试");
                    }
                }
            });
        }
    });

});
