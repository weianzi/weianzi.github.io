var storedData = []; //缓存数据

$(function () {

    var iBtn = true; //开关
    var pageNum = 1;
    // showList(); //初始化

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
            pageNum: pageNum,
            jsp: 1
        };
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/my/myConsultForWeb.do",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: postData,
            success: function (data) {
                $(".loading-data").show();
                var result = JSON.parse(data);
                if (result.code == "1") {

                    var html = "";
                    for (var i in result.data) {
                        html += '<dl class="item clearfix" onclick="itemTap(this, ' +
                        result.data[i].id + ')"><dt class="fl pic"><img class="lazyload" src="images/search/man.jpg"></dt><dd><p>' +
                        result.data[i].createtime + '<br>' +
                        result.data[i].content + '</p><span>' +
                        result.data[i]. + ' ></span></dd></dl>';

                        //存数据
                        storedData.push({
                            category: result.data[i].category,
                            content: result.data[i].content,
                            createtime: result.data[i].createtime,
                            title: result.data[i].title,
                            id: result.data[i].id
                        });
                    }
                    //console.log(storedData);
                    $("#iServerList .form-list").append(html);
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
        console.log(storedData);
        $("#iServerList").hide();
        $("#iServerCon").show();
        for (var i in storedData) {
            if (storedData[i].id == id) {
                $("#iServerCon .consulting-con li")
                    .eq(0).html("联系人：" + storedData[i].title).end()
                    .eq(1).html("联系电话：" + storedData[i].createtime).end()
                    .eq(2).html("服务城市：" + storedData[i].category).end()
                    .eq(3).html("服务城市：" + storedData[i].category).end()
                    .eq(4).html("服务区域：" + storedData[i].category).end()
                    .eq(5).html("上门时间：" + storedData[i].category).end()
                    .eq(6).html("面谈地点：" + storedData[i].category).end()
                    .eq(7).html("需要专长：" + storedData[i].category).end()
                    .eq(8).html("费用：" + storedData[i].category).end()
                    .eq(9).html("事宜描述：" + storedData[i].content);
            }
        }

    });
}