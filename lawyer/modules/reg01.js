$.extend(validateFunction, {
    FORM_validate: function () {
        $("#username").jdValidate(validatePrompt.username, validateFunction.username, true);
        $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
        $("#pwd2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2, true);
        return validateFunction.FORM_submit(["#username", "#pwd", "#pwd2"]);
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

    //普通用户注册下一步，发送验证码
    var storedData = {};
    $("#nextBtnReg01").tap(function () {
        var account = $("#username").val();
        var pwd = $("#pwd").val();
        var flag = validateFunction.FORM_validate();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/webappuser/registerSendCode.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {account: account},
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == "1") {
                        //存数据
                        storedData = {
                            "account": account,
                            "pwd": pwd
                        };

                        $(".pop-box > .msn-text").html("验证码已发送！");
                        $("#formReg01 li").hide();
                        $("#formReg01 li.hide").show();
                        $("#nextBtnReg01").hide();
                        $("#btnReg01").show();

                    } else {
                        $(".pop-box > .msn-text").html("验证码发送失败，请重新发送！");
                    }

                    $(".pop-allbg").css("display", "block");
                    $(".pop-box").css("display", "block");
                }
            });
        }
        return false;
    });

    //确认
    $("#btnReg01").tap(function () {
        var code = $("#code").val();
        if (code) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/webappuser/commonUserRegister.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {account: storedData.account, pwd: storedData.pwd, code: code},
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == '1') {
                        location.href = "reg-success.html";
                        storedData = {};//清空数据
                    } else {
                        $(".pop-allbg").css("display", "block");
                        $(".pop-box").css("display", "block");
                        $(".pop-box > .msn-text").html(result.msg);
                    }
                }
            });
        }
        return false;
    });


});