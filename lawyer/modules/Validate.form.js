$.extend(validatePrompt, {
    realname: {
        onFocus: "2-20位字符，可由中文或英文组成",
        succeed: "",
        isNull: "请输入联系人姓名",
        error: {
            badLength: "联系人姓名长度只能在2-20位字符之间",
            badFormat: "联系人姓名只能由中文或英文组成"
        }
    },
    department: {
        onFocus: "请选择省份",
        succeed: "",
        isNull: "请选择省份",
        error: "请选择省份"
    },
    tel: {
        onFocus: "如：020-88809999或13866666688",
        succeed: "",
        isNull: "请输入常用电话",
        error: "电话格式错误，请重新输入"
    },
    mobile: {
        onFocus: "请输入您的手机号码",
        succeed: "",
        isNull: "请输入您的手机号码",
        error: "手机号格式错误，请重新输入"
    },
    companyname: {
        onFocus: "请填写工商局注册的全称",
        succeed: "",
        isNull: "请输入所属律所名称",
        error: {
            badLength: "律所名称长度只能在4-40位字符之间",
            badFormat: "只能由中文、英文、数字及“_”、“-”、()、（）组成"
        }
    },
    companyarea: {
        onFocus: "请选择公司所在地",
        succeed: "",
        isNull: "请选择公司所在地",
        error: ""
    },
    companyaddr: {
        onFocus: "请详细填写公司经营地址",
        succeed: "",
        isNull: "请输入公司地址",
        error: {
            badLength: "公司地址长度只能在4-50位字符之间",
            badFormat: "公司地址只能由中文、英文、数字及“_”、“-”、()、（）、#组成"
        }
    }
});

$.extend(validateFunction, {
    realname: function (option) {
        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 2, 20);
        var format = validateRules.isRealName(option.value);
        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        } else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            }
            else {
                validateSettings.succeed.run(option);
            }
        }
    },
    department: function (option) {
        var bool = (option.value == -1);
        if (bool) {
            validateSettings.isNull.run(option, "");
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    tel: function (option) {
        var format = validateRules.isTel(option.value);
        if (!format) {
            validateSettings.error.run(option, option.prompts.error);
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    mobile: function (option) {
        var format = validateRules.isMobile(option.value);
        if (!format) {
            validateSettings.error.run(option, option.prompts.error);
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    companyname: function (option) {
        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 4, 40);
        var format = validateRules.isCompanyname(option.value);
        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        }
        else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            } else {
                validateSettings.succeed.run(option);
            }
        }
    },
    companyarea: function (option) {
        var bool = (option.value == -1);
        if (bool) {
            validateSettings.isNull.run(option, "");
        }
        else {
            validateSettings.succeed.run(option);
        }
    },
    companyaddr: function (option) {
        var length = validateRules.betweenLength(option.value.replace(/[^\x00-\xff]/g, "**"), 4, 50);
        var format = validateRules.isCompanyaddr(option.value);
        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        } else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            }
            else {
                validateSettings.succeed.run(option);
            }
        }
    },

    companysite: function (option) {
        var length = validateRules.betweenLength(option.value, 0, 80);
        var format = validateRules.isCompanysite(option.value);
        if (!length) {
            validateSettings.error.run(option, option.prompts.error.badLength);
        } else {
            if (!format) {
                validateSettings.error.run(option, option.prompts.error.badFormat);
            }
            else {
                validateSettings.succeed.run(option);
            }
        }
    },
    FORM_validate: function () {
        $("#username").jdValidate(validatePrompt.username, validateFunction.username, true);
		        $("#lawyerId").jdValidate(validatePrompt.lawyerId, validateFunction.lawyerId, true);

        $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd, true)
        $("#pwd2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2, true);
        $("#authcode").jdValidate(validatePrompt.authcode, validateFunction.authcode, true);
        $("#realname").jdValidate(validatePrompt.realname, validateFunction.realname, true);
        $("#department").jdValidate(validatePrompt.department, validateFunction.department, true);
        $("#tel").jdValidate(validatePrompt.tel, validateFunction.tel, true);
        $("#mobile").jdValidate(validatePrompt.mobile, validateFunction.mobile, true);
        $("#mail").jdValidate(validatePrompt.mail, validateFunction.mail, true);
        $("#companyname").jdValidate(validatePrompt.companyname, validateFunction.companyname, true);
        $("#companyaddr").jdValidate(validatePrompt.companyaddr, validateFunction.companyaddr, true);
        $("#companysite").jdValidate(validatePrompt.companysite, validateFunction.companysite, true);
        $("#purpose").jdValidate(validatePrompt.purpose, validateFunction.purpose, true);
        return validateFunction.FORM_submit(["#username", "#lawyerId", "#pwd", "#pwd2", "#mail", "#realname", "#department", "#tel", "#companyname", "#companyaddr", "#purpose"]);
    }
});

$(function () {
//用户名验证
    $("#username").jdValidate(validatePrompt.username, validateFunction.username);
//律师ID
    $("#lawyerId").jdValidate(validatePrompt.lawyerId, validateFunction.lawyerId);
//密码验证
    $("#pwd").bind("keyup", function () {
        validateFunction.pwdstrength();
    }).jdValidate(validatePrompt.pwd, validateFunction.pwd);
//二次密码验证
    $("#pwd2").jdValidate(validatePrompt.pwd2, validateFunction.pwd2);
//邮箱验证
    $("#mail").jdValidate(validatePrompt.mail, validateFunction.mail);
//联系人姓名验证
    $("#realname").jdValidate(validatePrompt.realname, validateFunction.realname);
//部门验证
    $("#department").jdValidate(validatePrompt.department, validateFunction.department);
//固定电话验证
    $("#tel").jdValidate(validatePrompt.tel, validateFunction.tel);
//手机验证
    $("#mobile").jdValidate(validatePrompt.mobile, validateFunction.mobile);
//公司名称验证
    $("#companyname").jdValidate(validatePrompt.companyname, validateFunction.companyname);
//公司地址验证
    $("#companyaddr").jdValidate(validatePrompt.companyaddr, validateFunction.companyaddr);

});