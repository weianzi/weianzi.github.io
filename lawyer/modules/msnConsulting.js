$.extend(validateFunction, {
    FORM_validate: function () {
        $("#first_message_consult_title").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_message_consult_category").jdValidate(validatePrompt.selected, validateFunction.selected, true);
        $("#first_message_consult_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        $("#first_message_consult_contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty, true);
        return validateFunction.FORM_submit(["#first_message_consult_title", "#first_message_consult_category", "#first_message_consult_content", "#first_message_consult_contact"]);
    }
});
$(function () {

    $("#first_message_consult_title").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_message_consult_category").jdValidate(validatePrompt.selected, validateFunction.selected);
    $("#first_message_consult_content").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);
    $("#first_message_consult_contact").jdValidate(validatePrompt.notEmpty, validateFunction.notEmpty);

    //
    $("#btnMessage").tap(function () {

        var consult_title = $("#first_message_consult_title").val();
        var consult_category = $("#first_message_consult_category").val();
        var consult_content = $("#first_message_consult_content").val();
        var consult_contact = $("#first_message_consult_content").val();
        var postData = {
            title: consult_title,
            category: consult_category,
            content: consult_content,
            contact: consult_contact
        };
        var mydate = new Date();
        mydate = mydate.getFullYear() + '-' + mydate.getMonth() + '-'
            + mydate.getDay() + ' ' + mydate.getHours() + ':'
            + mydate.getMinutes() + ':' + mydate.getSeconds();
        var flag = validateFunction.FORM_validate();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/first_commonuser/doconsult.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: postData,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.code == '1') {
                        popShow(result.msg);
                    } else if (result.code == '2') {
                        popShow(result.msg);
                    } else {
                        popShow(result.msg);
                    }
                }
            });
        }
    });


});
