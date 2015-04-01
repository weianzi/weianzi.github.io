$.extend(validateFunction, {
    FORM_validate1: function () {
        $("#first_entrust_name").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_entrust_brief").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_entrust_contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#first_entrust_brief", "#first_entrust_contact"]);
    }
});
$(function () {
    $("#first_entrust_name").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_entrust_brief").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_entrust_contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);

    var url = window.location.href;
    var entrustid = url.substring(url.lastIndexOf('=') + 1);
    var entrustname = "";
    console.log(entrustid);
    switch (entrustid) {
        case "1":
            entrustname = "代写合同";
            break;
        case "2":
            entrustname = "审核合同";
            break;
        case "3":
            entrustname = "发律师函";
            break;
        case "4":
            entrustname = "写起诉讼";
            break;
        case "5":
            entrustname = "案件代理";
            break;
    }

    $(".head > h1").html(entrustname);

    // 提交
    $("#btnSubmit").tap(function () {
        var name = $("#first_entrust_name").val();
        var entrustcontent = $("#first_entrust_brief").val();
        var contact = $("#first_entrust_contact").val();
        var postData = {
            name: name,
            entrustname: entrustname,
            entrustcontent: entrustcontent,
            contact: contact
        };
        var flag = validateFunction.FORM_validate1();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/first_commonuser/fastEntrust.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: postData,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == '1') {
                        popShow(result.msg);
                    } else if (result.code == '2') {
                        popShow("请登录",toLogin);
                    } else {
                        popShow("服务器忙，请稍后再试");
                    }
                }
            });
        }
    });


});
