$.extend(validateFunction, {
    FORM_validate1: function () {
        $("#first_entrust_brief").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_entrust_contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#first_entrust_brief", "#first_entrust_contact"]);
    }
});
$(function () {
    $("#first_entrust_brief").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_entrust_contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);

    // 代写合同
    $("#btnSubmit").tap(function () {
        //var entrustid;
        var entrustcontent = $("#first_entrust_brief").val();
        var entrustcontact = $("#first_entrust_contact").val();
        var postData = {
            //entrustid: entrustid,
            entrustcontent: entrustcontent,
            entrustcontact: entrustcontact
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
                        popShow("请登陆");
                    } else {
                        popShow("服务器忙，请稍后再试");
                    }
                }
            });
        }
    });


});
