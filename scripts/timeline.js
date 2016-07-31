$(function () {

	$('#container').highcharts({

		chart: {
			type: 'columnrange',
			inverted: true
		},

		title: {
			text: 'Temperature variation by month'
		},

		subtitle: {
			text: 'Observed in Vik i Sogn, Norway'
		},

		xAxis: {
			categories: ["Сербія, Чорногорія, Македонія", "Албанія, Боснія та Герцеговина", "Молдова", "Грузія", "Україна", "Косово"]
		},

		yAxis: {
			type: 'datetime',
			minTickInterval: 31 * 24 * 36e5,
			title: {
				text: 'Temperature ( °C )'
			}
		},

		tooltip: {
			valueSuffix: '°C'
		},

		plotOptions: {
			columnrange: {
					stacking: 'normal',
				dataLabels: {
					enabled: true,
					formatter: function () {
						return this.y + '°C';
					}
				}
			}
		},

		legend: {
			enabled: false
		},

		series: [{
			name: 'Temperatures',
			data: [
				[1258239600000, 1261090800000]
			]
		}]
	});
});