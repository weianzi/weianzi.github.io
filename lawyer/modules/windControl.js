
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

