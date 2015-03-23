var provinceList = [
    {name: '广东', cityList: [
        {name: '广州', areaList: ['市区', '黄埔区', '增城市', '从化市', '荔湾区', '越秀区', '海珠区', '天河区', '芳村区', '白云区', '番禺区', '花都区' ]},
        {name: '深圳', areaList: ['市区', '罗湖区', '福田区', '南山区', '宝安区', '龙岗区', '盐田区']},
        {name: '佛山', areaList: ['市区', '禅城区', '南海区', '顺德区', '三水区', '高明区']},
        {name: '东莞', areaList: ['市区', '石龙镇', '沙田镇', '桥头镇', '企石镇', '东坑镇']},
        {name: '中山', areaList: ['市区', '东区', '西区', '南区', '北区']}
    ]}
];

$(function () {

    addressInit('province', 'city', 'area', '广东', '广州', '市区');

    var $city = $("#city");
    var $region = $("#area");
    var $special = $("#special");
    showRecommendLawyer();
    searchResult();

    //按城市查找
    $city.on("change", function () {
        searchResult();
    });

    function searchResult() {
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/searchlawyer/searchLawyerList.do?weixin=1",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {city: $city.val()},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == "1") {
                    var html = "";
                    for (var i in result.data) {
                        html += '<div class="item clearfix"><p class="pic"><a href="info.html?id=' +
                            result.data[i].userid + '"><img class="lazyload" src="images/grey.png" data-original="' +
                            result.data[i].avatar + '"/></a></p><h3 class="clearfix"><span class="fl black"><a href="info.html?id=' +
                            result.data[i].userid + '">' +
                            result.data[i].realname + '</a></span> <span class="fr">¥100</span></h3><div class="tips clearfix"><span class="fl"><i></i>' +
                            result.data[i].city + '，' + result.data[i].province + '</span> <span class="fr"><a href="javascript:;"><i></i>' +
                            result.data[i].praisenum + '</a></span> <span class="fr"><a href="javascript:;">评论' +
                            result.data[i].rebacknum + '</a></span></div><a href="info.html?id=' +
                            result.data[i].userid + '"><s></s></a></div>';
                    }
                    $("#searchResult").html(html);
                }
            }
        });
    }

    //按区查找
    $region.on("change", function () {
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/searchlawyer/searchLawyerList.do?weixin=1",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {city: $city.val(), region: $region.val()},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == "1") {
                    var html = "";
                    for (var i in result.data) {
                        html += '<div class="item clearfix"><p class="pic"><a href="info.html?id=' +
                            result.data[i].userid + '"><img class="lazyload" src="images/grey.png" data-original="' +
                            result.data[i].avatar + '"/></a></p><h3 class="clearfix"><span class="fl black"><a href="info.html?id=' +
                            result.data[i].userid + '">' +
                            result.data[i].realname + '</a></span> <span class="fr">¥100</span></h3><div class="tips clearfix"><span class="fl"><i></i>' +
                            result.data[i].city + '，' + result.data[i].province + '</span> <span class="fr"><a href="javascript:;"><i></i>' +
                            result.data[i].praisenum + '</a></span> <span class="fr"><a href="javascript:;">评论' +
                            result.data[i].rebacknum + '</a></span></div><a href="info.html?id=' +
                            result.data[i].userid + '"><s></s></a></div>';
                    }
                    $("#searchResult").html(html);
                }
            }
        });
    });

    //按专长查找
    $special.on("change", function () {
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/searchlawyer/searchLawyerList.do?weixin=1",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {city: $city.val(), region: $region.val(), special: $special.val()},
            success: function (data) {
                var result = JSON.parse(data);
                if (result.code == "1") {
                    var html = "";
                    for (var i in result.data) {
                        html += '<div class="item clearfix"><p class="pic"><a href="info.html?id=' +
                            result.data[i].userid + '"><img class="lazyload" src="images/grey.png" data-original="' +
                            result.data[i].avatar + '"/></a></p><h3 class="clearfix"><span class="fl black"><a href="info.html?id=' +
                            result.data[i].userid + '">' +
                            result.data[i].realname + '</a></span> <span class="fr">¥100</span></h3><div class="tips clearfix"><span class="fl"><i></i>' +
                            result.data[i].city + '，' + result.data[i].province + '</span> <span class="fr"><a href="javascript:;"><i></i>' +
                            result.data[i].praisenum + '</a></span> <span class="fr"><a href="javascript:;">评论' +
                            result.data[i].rebacknum + '</a></span></div><a href="info.html?id=' +
                            result.data[i].userid + '"><s></s></a></div>';
                    }
                    $("#searchResult").html(html);
                }
            }
        });
    });

    //推荐
    function showRecommendLawyer() {
        $.ajax({
            type: "POST",
            url: "/lawyer_webapp/searchlawyer/recommandLaywer.do?weixin=1",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {pageNum: 0},
            success: function (data) {
                //alert(1);
                var result = JSON.parse(data);
                if (result.code == "1") {
                    var html = "";
                    for (var i in result.data) {
                        html += '<div class="item clearfix"><p class="pic"><a href="info.html?id=' +
                            result.data[i].userid + '"><img class="lazyload" src="images/grey.png" data-original="' +
                            result.data[i].avatar + '"/></a></p><h3 class="clearfix"><span class="fl black">' +
                            result.data[i].realname + '</span> <span class="fr">¥100</span></h3><div class="tips clearfix"><span class="fl"><i></i>' +
                            result.data[i].city + '，' + result.data[i].province + '</span> <span class="fr"><a href="javascript:;"><i></i>' +
                            result.data[i].praisenum + '</a></span> <span class="fr"><a href="javascript:;">评论' +
                            result.data[i].rebacknum + '</a></span></div><s></s></div>';
                    }
                    $("#showRecommendLawyer").html(html);
                }
            }
        });
    }

});
