$(function () {

    //表单提交验证和服务器请求
    $("#btnReg01").tap(function () {
        var flag = validateFunction.FORM_validate();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "#",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: $("#formReg01").serialize(),
                success: function (result) {
                    if (result == 1) {
                        window.location = "#";
                    }
                }
            });
        }
        //return false;
    });

});