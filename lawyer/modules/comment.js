$.extend(validatePrompt, {
    notEmpty:{
        onFocus:"请输入评论内容",
        succeed:"",
        isNull:"评论内容不能为空",
        error: {
            badLength: "不能超过140个字符",
            badFormat: "评论内容不能为空"
        }
    }
});

$.extend(validateFunction, {
    FORM_validate1: function () {
        $("#message_lawyer_comment_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#message_lawyer_comment_content"]);
    }
});
$(function () {
    $("#message_lawyer_comment_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);

    var url = window.location.href;
    var lawyerId = url.substring(url.lastIndexOf('=') + 1);
    console.log(lawyerId);

    //12.对律师的评论提交
    $("#btnMessageLawyerComment").tap(function () {
        var content = $("#message_lawyer_comment_content").val();

        var postData = {
            comment : content,
            lawyerId : lawyerId
        };
        var flag = validateFunction.FORM_validate1();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/searchlawyer/doCommentLawyer.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: postData,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == '1') {
                        popShow(result.msg);
                    } else if (result.code == '2') {
                        popShow("请登录", toLogin);
                    } else {
                        popShow("服务器忙，请稍后再试");
                    }
                }
            });
        }
    });

});
