/**
 * Created on 2015-02-15.
 */
// 所有模块都通过 define 来定义
define(function (require, exports, module) {

    require("./public.js");

    //环形图表

});
document.getElementById('#container').highcharts({
    chart: {
        type: 'pie'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    plotOptions: {
        pie: {
            innerSize: 150,
            depth: 10
        }
    },
    series: [{
        name: '值',
        data: [
            ['中文', 8],
            ['中文中文', 3],
            ['中文中文', 1],
            ['中文中文中文', 6],
            ['中文中文', 8],
            ['中文', 4],
            ['中文中文中文', 4],
            ['中文 (bag)', 1],
            ['Grapes (中文)', 1]
        ]
    }]
});