//律师回复消息的消息详情
$(function () {

    var url = window.location.href;
    var objectid = url.substring(url.lastIndexOf('=') + 1);

    $.ajax({
        type: "POST",
        url: "/lawyer_webapp/message/lawyerRebackConsultForWeb.do",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {id: objectid, jsp: 1},
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
