var storedData = []; //缓存数据

$(function () {

    var iBtn = true; //开关
    var pageNum = 2; //读取第2页（第0、1页没数据？）
    showList(); //初始化

//滚动时获取新数据
    $(window).scroll(function () {
        if ($(document).height() <= $(this).scrollTop() + $(this).height()) {
            pageNum++;
            showList();
        }
    });

//获取列表数据
    function showList() {

        if (!iBtn) return;
        iBtn = false;

        var postData = {
            userId: 19,
            pageNum: pageNum
        };
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/familyLawyer/familyMemberConsultListForWeb.do",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: postData,
            success: function (data) {
                $(".loading-data").show();
                var result = JSON.parse(data);
                if (result.code == "1") {

                    var html = "";
                    for (var i in result.data) {
                        html += '<dl class="item clearfix" onclick="itemTap(this, ' +
                            result.data[i].id + ')><dd style="margin-left:0"><h3>' +
                            result.data[i].title + '</h3><p>' +
                            result.data[i].content + '</p><span>' +
                            dateFormat(result.data[i].createtime) + '</span></dd></dl>';

                        //存数据
                        storedData.push({
                            category: result.data[i].category,
                            content: result.data[i].content,
                            createtime: dateFormat(result.data[i].createtime),
                            title: result.data[i].title,
                            id: result.data[i].id
                        });
                    }
                    //console.log(storedData);
                    $("#iRecordList .comment").append(html);
                }
            }
        });

        setTimeout(function () {
            $(".loading-data").hide();
        }, 800);

        iBtn = true;
    }

});

//点击单个
function itemTap(obj, id) {
    $(obj).on("tap", function () {
        //console.log(storedData);
        $("#iRecordList").hide();
        $("#iRecordCon").show();

        for (var i in storedData) {
            if (storedData[i].id == id) {
                $("#iRecordCon .consulting-con li")
                    .eq(0).html("标题：" + storedData[i].title).end()
                    .eq(1).html("时间：" + storedData[i].createtime).end()
                    .eq(2).html("类型：" + storedData[i].category).end()
                    .eq(3).html("内容：" + storedData[i].content);
            }
        }

        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/webconsult/consultRebacksForWeb.do",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {consultId: 1, pageNum: 0, jsp: 1},
            success: function (data) {
                console.log(data);
                var result = JSON.parse(data);
                if (result.code == "1") {
                    var html = "";
                    for (var i in result.data) {
                        html += '<dl class="item clearfix" onclick="itemTap(this, ' +
                            result.data[i].id + ')"><dt class="fl pic"><img class="lazyload" src="images/grey.png" data-original="images/search/man.jpg"/></a></dt><dd><h3>' +
                            result.data[i].title + '</h3><p>' +
                            result.data[i].content + '</p><span>' +
                            dateFormat(result.data[i].createtime) + '</span></dd></dl>';
                    }
                    $("#iRecordCon .comment").append(html);
                }
            }
        })
    });
}