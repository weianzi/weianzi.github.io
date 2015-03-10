$(function () {

    //表单提交验证和服务器请求
    $("#btnLogin").tap(function () {

        //console.log($("#formLogin").serialize());

        var flag = validateFunction.FORM_validate();
        if (flag) {
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

    //欢迎条隐藏
    var $wel = $(".login-reg > .welcome");
       $(document).on("focus","#username, #pwd", function(){
           $wel.hide();
       }).on("blur","#username, #pwd", function(){
           $wel.show();
       });



});