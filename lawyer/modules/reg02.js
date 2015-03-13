$.extend(validateFunction, {
    FORM_validate: function () {
        $("#username").jdValidate(validatePrompt.username, validateFunction.username, true);
        $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
        $("#pwd2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2, true);
        $("#lawyerId").jdValidate(validatePrompt.lawyerId, validateFunction.lawyerId, true);
        $("#realname").jdValidate(validatePrompt.realname, validateFunction.realname, true);
        $("#tel").jdValidate(validatePrompt.tel, validateFunction.tel, true);
        $("#mail").jdValidate(validatePrompt.mail, validateFunction.mail, true);
        $("#companyname").jdValidate(validatePrompt.companyname, validateFunction.companyname, true);
        $("#companyaddr").jdValidate(validatePrompt.companyaddr, validateFunction.companyaddr, true);
        return validateFunction.FORM_submit(["#username", "#pwd", "#pwd2", "#lawyerId", "#mail", "#realname", "#tel", "#companyname", "#companyaddr"]);
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
    //律师ID
    $("#lawyerId").jdValidate(validatePrompt.lawyerId, validateFunction.lawyerId);
//邮箱验证
    $("#mail").jdValidate(validatePrompt.mail, validateFunction.mail);
//联系人姓名验证
    $("#realname").jdValidate(validatePrompt.realname, validateFunction.realname);
//固定电话验证
    $("#tel").jdValidate(validatePrompt.tel, validateFunction.tel);
//公司名称验证
    $("#companyname").jdValidate(validatePrompt.companyname, validateFunction.companyname);
//公司地址验证
    $("#companyaddr").jdValidate(validatePrompt.companyaddr, validateFunction.companyaddr);

    //律师注册下一步，发送验证码
    var storedData = {};
    $("#nextBtnReg02").tap(function () {
        var account = $("#username").val();
        var pwd = $("#pwd").val();
        var lawyerId = $("#lawyerId").val();
        var mail = $("#mail").val();
        var realname = $("#realname").val();
        var companyname = $("#companyname").val();
        var companyaddr = $("#companyaddr").val();
        var tel = $("#tel").val();
        var province = $("#province").val();
        var city = $("#city").val();
        var area = $("#area").val();
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
                            'account': account,
                            'pwd': pwd,
                            'worknum': lawyerId,
                            'lawfirm': companyname,
                            'realname': realname,
                            'province': province,
                            'city': city,
                            'region': area,
                            'address': companyaddr,
                            'email': mail,
                            'phone': tel
                        };

                        popShow("验证码已发送！");
                        //$(".pop-box > .msn-text").html("验证码已发送！");
                        $("#formReg02 li").hide();
                        $("#formReg02 li.hide").show();
                        $("#nextBtnReg02").hide();
                        $("#btnReg02").show();

                    } else {
                        popShow("验证码发送失败，请重新发送！");
                        //$(".pop-box > .msn-text").html("验证码发送失败，请重新发送！");
                    }

                    //$(".pop-allbg").css("display", "block");
                    //$(".pop-box").css("display", "block");
                }
            });
        }
        return false;
    });

    //确认
    $("#btnReg02").tap(function () {
        var code = $("#code").val();
        if (code) {
            $.ajax({
                    type: "POST",
                    url: "/lawyer_webapp/webappuser/lawyerRegister.do",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: {code: code, account: storedData.account, pwd: storedData.pwd, worknum: storedData.worknum, lawfirm: storedData.lawfirm, realname: storedData.realname, province: storedData.province, city: storedData.city, region: storedData.region, address: storedData.address, email: storedData.email, phone: storedData.phone},
                    success: function (data) {
                        var result = JSON.parse(data);
                        if (result.code == '1') {
                            location.href = "reg-success.html";
                            storedData = {};//清空数据
                        } else {
                            popShow(result.msg);
//                            $(".pop-allbg").css("display", "block");
//                            $(".pop-box").css("display", "block");
//                            $(".pop-box > .msn-text").html(result.msg);
                        }
                    }
                }
            )
            ;
        }
        return false;
    });


})
;