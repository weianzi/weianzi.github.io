$(function () {

    //表单提交验证和服务器请求
    $("#btnLogin").tap(function () {
        var flag = validateFunction.FORM_validate();
        if (flag) {
            //$(this).attr({"disabled": "disabled"}).attr({"value": "提交中,请稍等"});
            $.ajax({
                type: "POST",
                url: "#",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: $("#formLogin").serialize(),
                success: function (result) {
                    if (result == 1) {
                        window.location = "#";
                    }
                }
            });
        }
        return false;
    });

});