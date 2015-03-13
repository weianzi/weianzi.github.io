
$.extend(validateFunction, {
    FORM_validate: function () {
        $("#username").jdValidate(validatePrompt.username, validateFunction.username, true);
        $("#pwd").jdValidate(validatePrompt.pwd, validateFunction.pwd, true);
        return validateFunction.FORM_submit(["#username","#pwd"]);
    }
});

$(function () {
     //用户名验证
     $("#username").jdValidate(validatePrompt.username, validateFunction.username);
     //密码验证
     $("#pwd").bind("keyup", function () {
     }).jdValidate(validatePrompt.pwd, validateFunction.pwd);


    //表单提交验证和服务器请求
    $("#btnLogin").tap(function () {

        var account=$("#username").val();
        var pwd=$("#pwd").val();

        var flag = validateFunction.FORM_validate();
        if (flag) {
            $.ajax({
                type: "POST",
                url: "/lawyer_webapp/webappuser/dologin.do",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {account:account,pwd:pwd},
                success: function (data) {
                    var resultData=JSON.parse(data);
                    if(resultData.code=='1'){
                        //myApp.formStoreData('user_info',{'account':account,'pwd':pwd});
                        if(resultData.data.userType=='1'){
                            location.href="/lawyer_webapp/lawyer_index.do";
                        }else{
                            location.href="/lawyer_webapp/user_index.do";
                        }
                    }else{
                        popShow("用户名或密码错误，请重新输入！");
//                        $(".pop-allbg").css("display", "block");
//                        $(".pop-box").css("display", "block");
//                        $(".pop-box > .msn-text").html("用户名或密码错误，请重新输入！");
                    }
                }
            });
        }
        return false;
    });


    //输入密码时 欢迎条隐藏
    var $wel = $(".login-reg > .welcome");
       $(document).on("focus","#username, #pwd", function(){
           $wel.hide();
       }).on("blur","#username, #pwd", function(){
           $wel.show();
       });

});