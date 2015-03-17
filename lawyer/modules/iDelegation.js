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
                        result.data[i].id + ')"><dt class="fl pic"><img class="lazyload" src="images/search/man.jpg"></dt><dd><h3>' +
                        result.data[i].title + '</h3><p>' +
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
                    $("#iDelegationList .form-list").append(html);
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
        $("#iDelegationList").hide();
        $("#iDelegationCon").show();
        for (var i in storedData) {
            if (storedData[i].id == id) {
                $("#iDelegationCon .consulting-con li")
                    .eq(0).html("联系人：" + storedData[i].title).end()
                    .eq(1).html("联系电话：" + storedData[i].createtime).end()
                    .eq(2).html("选择委托类型：" + storedData[i].category).end()
                    .eq(3).html("需求内容：" + storedData[i].content);
            }
        }

    });
}