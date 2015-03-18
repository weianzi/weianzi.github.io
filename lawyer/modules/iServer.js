//我的上门服务订单
var storedData = []; //缓存数据

$(function () {

    var iBtn = true; //开关
    var pageNum = 1;
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
            pageNum: pageNum,
            jsp: 1
        };
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/my/myOrderForWeb.do",
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
                            dateFormat(result.data[i].createtime) + '<br>' +
                            result.data[i].content + '</p><span>' +
                            isDeal(result.data[i].isdeal) + ' ></span></dd></dl>';

                        //存数据
                        storedData.push({
                            account: result.data[i].account,
                            contact: result.data[i].contact,
                            servicearea: result.data[i].servicearea,
                            time: dateFormat(result.data[i].time),
                            address: result.data[i].address,
                            special: result.data[i].special,
                            cost: result.data[i].cost,
                            content: result.data[i].content,
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
        $("#iServerList").hide();
        $("#iServerCon").show();
        for (var i in storedData) {
            if (storedData[i].id == id) {
                $("#iServerCon .consulting-con li")
                    .eq(0).html("联系人：" + storedData[i].account).end()
                    .eq(1).html("联系电话：" + storedData[i].contact).end()
                    .eq(2).html("服务城市：" + storedData[i].servicearea).end()
                    .eq(3).html("服务区域：" + storedData[i].servicearea).end()
                    .eq(4).html("上门时间：" + storedData[i].time).end()
                    .eq(5).html("面谈地点：" + storedData[i].address).end()
                    .eq(6).html("需要专长：" + storedData[i].special).end()
                    .eq(7).html("费用：" + storedData[i].cost).end()
                    .eq(8).html("事宜描述：" + storedData[i].content);
            }
        }

    });
}

