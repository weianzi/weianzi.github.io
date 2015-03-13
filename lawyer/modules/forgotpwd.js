$.extend(validateFunction, {
    FORM_validate1: function () {
        $("#username").jdValidate(validatePrompt.username, validateFunction.username, true);
        return validateFunction.FORM_submit(["#username"]);
    },
    FORM_validate2: function () {
        $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
        $("#pwd2").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
        return validateFunction.FORM_submit(["#pwd","#pwd2"]);
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

    var storedData = {};
    //找回密码 发送验证码
    $("#btnForgotpwd1").tap(function () {
        var account = $("#username").val();
        var flag = validateFunction.FORM_validate1();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/webappuser/findPwdSendCode.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {account: account},
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == "1") {
                        storedData = {
                            "account": account
                        };
                        popShow("验证码已发送");

                        $("form#forgotpwd1").hide();
                        $("form#forgotpwd2").show();

                    } else {
                        popShow(result.msg);
                    }
                }
            });
        }
        return false;
    });


    //找回密码确定
    $("#btnForgotpwd2").tap(function () {
        var pwd = $("#pwd").val();
        var code = $("#code").val();
        var flag = validateFunction.FORM_validate2();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/webappuser/findPwd.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {account: storedData.account, code: code, pwd: pwd},
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == "1") {
                        popShow("找回密码成功");
                        window.location.href = "login.do";//跳到登录界面
                    } else {
                        popShow(result.msg);
                    }
                }
            });
        }
        return false;
    });
});

