//律师详情
$(function () {

    var url = window.location.href;
    var lawyerId = url.substring(url.lastIndexOf('=') + 1);

    $.ajax({
        type: "POST",
        url: "/lawyer_webapp/searchlawyer/lawyerDetailForWeb.do?weixin=1",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {lawyerId: lawyerId, jsp: 1},
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == '1') {
                console.log(result);
                var html = '<h3>' +
                    result.data.consultTitle + '</h3><p>' +
                    result.data.rebackContent + '</p>';

                $(".tab-con").eq(0).append(html);

            } else {
                popShow(result.msg);
            }
        }
    });

});
