$.extend(validateFunction, {
    FORM_validate: function () {
        $("#username").jdValidate(validatePrompt.username, validateFunction.username, true);
        $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
        $("#pwd2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2, true);
        return validateFunction.FORM_submit(["#pwd", "#pwd2"]);
    }
});

$(function () {
    //用户名验证
    $("#username").jdValidate(validatePrompt.username, validateFunction.username);
    //密码验证
    $("#pwd").bind("keyup", function () {
    }).jdValidate(validatePrompt.pwd, validateFunction.pwd);
    //二次密码验证
    $("#pwd2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2);

    //表单提交验证和服务器请求
    $("#btnForgotpwd").tap(function () {
        var flag = validateFunction.FORM_validate();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "#",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: $("#forgotpwd").serialize(),
                success: function (result) {
                    if (result == 1) {
                        window.location = "#";
                    }
                }
            });
        }
        return false;
    });

});