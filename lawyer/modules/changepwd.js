$.extend(validateFunction, {
    FORM_validate: function () {
        $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
        $("#pwd2").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
        return validateFunction.FORM_submit(["#pwd", "#pwd2"]);
    }
});

$(function () {
    //密码验证
    $("#pwd").bind("keyup", function () {
    }).jdValidate(validatePrompt.pwd, validateFunction.pwd);
    //二次密码验证
    $("#pwd2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2);

    $("#btnChangepwd").tap(function () {
        var pwd = $("#pwd").val();
        var flag = validateFunction.FORM_validate();

        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/my/alterUserBaseInfo.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {newPwd: pwd},
                success: function (data) {
                    console.log(data);
                    var result = JSON.parse(data);
                    if (result.code == "1") {
                        popShow("修改密码成功");
                        //window.location.href = "login.do";//跳到登录界面
                    } else {
                        popShow("服务器繁忙，请重试");
                    }
                }
            });
        }
        return false;
    });
});

