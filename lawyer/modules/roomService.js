$.extend(validateFunction, {
    FORM_validate1: function () {
        $("#first_commonuser_city").jdValidate(validatePrompt.selected, validateFunction.selected, true);
        $("#first_commonuser_area").jdValidate(validatePrompt.selected, validateFunction.selected, true);
        $("#first_commonuser_time").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_commonuser_address").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_commonuser_special").jdValidate(validatePrompt.selected, validateFunction.selected, true);
        $("#first_commonuser_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#first_commonuser_city", "#first_commonuser_area", "#first_commonuser_time", "#first_commonuser_address", "#first_commonuser_special", "#first_commonuser_content"]);
    },
    FORM_validate2: function () {
        $("#first_company_city").jdValidate(validatePrompt.selected, validateFunction.selected, true);
        $("#first_company_area").jdValidate(validatePrompt.selected, validateFunction.selected, true);
        $("#first_company_time").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_company_address").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_company_special").jdValidate(validatePrompt.selected, validateFunction.selected, true);
        $("#first_company_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#first_company_city", "#first_company_area", "#first_company_time", "#first_company_address", "#first_company_special", "#first_company_content"]);
    }
});
$(function () {
    $("#first_commonuser_city").jdValidate(validatePrompt.selected, validateFunction.selected);
    $("#first_commonuser_area").jdValidate(validatePrompt.selected, validateFunction.selected);
    $("#first_commonuser_time").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_commonuser_address").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_commonuser_special").jdValidate(validatePrompt.selected, validateFunction.selected);
    $("#first_commonuser_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);

    $("#first_company_city").jdValidate(validatePrompt.selected, validateFunction.selected);
    $("#first_company_area").jdValidate(validatePrompt.selected, validateFunction.selected);
    $("#first_company_time").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_company_address").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_company_special").jdValidate(validatePrompt.selected, validateFunction.selected);
    $("#first_company_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);


    // 上门服务个人提交
    $("#btnCommonuser").tap(function () {
        var city = $("#first_commonuser_city").val();
        var area = $("#first_commonuser_area").val();
        var time = $("#first_commonuser_time").val();
        var address = $("#first_commonuser_address").val();
        var special = $("#first_commonuser_special").val();
        var content = $("#first_commonuser_content").val();
        var postData = {
            usertype: 0,
            city: city,
            servicearea: area,
            time: time,
            address: address,
            special: special,
            content: content
        };
        var flag = validateFunction.FORM_validate1();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/first_commonuser/visiteServiceSubmit.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: postData,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == '1') {
                        popShow(result.msg);
                    } else if (result.code == '2') {
                        popShow("请登陆", toLogin);
                    } else {
                        popShow("服务器忙，请稍后再试");
                    }
                }
            });
        }
    });

    // 上门服务企业提交
    $("#btnCompany").tap(function () {
        var city = $("#first_company_city").val();
        var area = $("#first_company_area").val();
        var time = $("#first_company_time").val();
        var address = $("#first_company_address").val();
        var special = $("#first_company_special").val();
        var content = $("#first_company_content").val();
        var postData = {
            usertype: 1,
            city: city,
            servicearea: area,
            time: time,
            address: address,
            special: special,
            content: content
        };
        var flag = validateFunction.FORM_validate2();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/first_commonuser/visiteServiceSubmit.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: postData,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == '1') {
                        popShow(result.msg);
                    } else if (result.code == '2') {
                        popShow("请登陆", toLogin);
                    } else {
                        popShow("服务器忙，请稍后再试");
                    }
                }
            });
        }
    });

});
