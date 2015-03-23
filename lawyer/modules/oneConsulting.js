$.extend(validateFunction, {
    FORM_validate: function () {
        $("#message_consult_title").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#message_consult_category").jdValidate(validatePrompt.selected, validateFunction.selected, true);
        $("#message_consult_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#message_consult_contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#message_consult_title", "#message_consult_category", "#message_consult_content", "#message_consult_contact"]);
    }
});
$(function () {

    $("#message_consult_title").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#message_consult_category").jdValidate(validatePrompt.selected, validateFunction.selected);
    $("#message_consult_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#message_consult_contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);

    //指定律师的咨询
    $("#btnMessage").tap(function () {
        var consult_title = $("#message_consult_title").val();
        var consult_category = $("#message_consult_category").val();
        var consult_content = $("#message_consult_content").val();
        var consult_contact = $("#message_consult_contact").val();
        var postData = {
            title: consult_title,
            category: consult_category,
            content: consult_content,
            contact: consult_contact
        };

        var flag = validateFunction.FORM_validate();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/webconsult/saveconsult.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: postData,
                success: function (data) {
                    var result = JSON.parse(data);
                    console.log(result);
                    if (result.code == '1') {
                        popShow(result.msg);
                    } else {
                        popShow(result.msg);
                    }
                }
            });
        }
    });
});
