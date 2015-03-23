$(function () {

    //环状图表
    $("#container").highcharts({
        colors: ["#f6ef29", "#aaeeee", "#e6944c", "#c7e64c", "#00b2cb", "#e64c65"],
        chart: {
            backgroundColor: '#eeeeee',
            type: 'pie'
        },
        title: {
            style: {
                color: '#00b2cb',
                fontFamily: 'microsoft yahei'
            },
            text: '咨询类型分析图表'
        },
        plotOptions: {
            pie: {
                innerSize: 140,
                depth: 10
            }
        },
        series: [
            {
                dataLabels: {
                    color: '#00b2cb',
                    fontFamily: 'microsoft yahei',
                },
                name: '占比',
                data: [
                    ['其他事务 20%', 20],
                    ['劳动人际 30%', 30],
                    ['继承事务 21%', 21],
                    ['资产管理 11%', 11],
                    ['咨询 40%', 40],
                    ['婚姻继承 60%', 60]
                ]
            }
        ]
    });

    //报告列表
    $.ajax({
        type: "POST",
        url: "/lawyer_webapp/familyLawyer/familyControlForWeb.do",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.code == "1") {
                var html = "";
                for (var i in result.data) {
                    html += '<li class="clearfix" onclick="itemTap(this,' +
                        result.data[i].consultid + ')"><span class="fl">' +
                        result.data[i].title + '</span><span class="fr">' +
                        result.data[i].createtime + ' ></span></li>';

                }

                $(".list > ul").html(html);
            }
        }
    });

    $(".back").eq(1).click(function(){
        $(".wind-control").hide().eq(0).show();
    });

});


//点击单个
function itemTap(obj, id) {
    $(obj).click(function () {
        $(".wind-control").hide().eq(1).show();
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/familyLawyer/reportDetailForWeb.do",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {reportId: id},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == "1") {
                    $(".form-list ul").html('<li>标题：' + result.data.title + '</li><li>内容：' + result.data.content + '</li>');
                }
            }
        });
    });
}



