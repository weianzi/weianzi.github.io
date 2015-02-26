/**
 * Created on 2015-02-15.
 */

	$("#container").highcharts({
		chart: {
			type: 'pie'
		},
		title: {
			text: '咨询类型分析图表'
		},
		subtitle: {
			text: ''
		},
		plotOptions: {
			pie: {
				innerSize: 100,
				depth: 40
			}
		},
		series: [{
			name: '占比',
			data: [
				['其他事务 20%', 20],
				['劳动人际 30%', 30],
				['继承事务 21%', 21],
				['资产管理 11%', 11],
				['中文中文中文 40%', 40],
				['婚姻继承 60%', 60]
			]
		}]
	});

