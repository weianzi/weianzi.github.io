$.extend(validateFunction, {
    FORM_validate: function () {
        $("#name").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#time").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#address").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#requiredesc").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#name", "#contact", "#time", "#address", "#requiredesc"]);
    }
});
$(function () {

    $("#name").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#time").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#address").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#requiredesc").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    // 上门诊断提交
    $("#btnSubmit").tap(function () {
        var name = $("#name").val();
        var contact = $("#contact").val();
        var time = $("#time").val();
        var address = $("#address").val();
        var requiredesc = $("#requiredesc").val();
        var postData = {
            name: name,
            contact: contact,
            timeStr: time,
            address: address,
            requiredesc: requiredesc
        };
        var flag = validateFunction.FORM_validate();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/familyLawyer/doVisiteServiceCheck.do?weixin=1",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: postData,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == '1') {
                        popShow(result.msg);
                    } else {
                        popShow("服务器忙，请稍后再试");
                    }
                }
            });
        }
    });

});
