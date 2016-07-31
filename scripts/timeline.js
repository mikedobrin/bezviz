$(function () {

	var seriesDataSMM = ["15/07/2009", "18/12/2009"];
	var seriesDataAB = ["27/05/2010", "14/12/2010"];

	function getTimeStampByDateString(dateString) {
		var date = new Date();
		var parsedString = dateString.split("/");
		date.setFullYear(parsedString[2], parsedString[1] - 1, parsedString[0]);
		return date.getTime();
	}

	function generateSeriesData(dateStrings) {
		return dateStrings.map(getTimeStampByDateString);
	}

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
			categories: [
				"Сербія, Чорногорія, Македонія",
				"Албанія, Боснія та Герцеговина",
				"Молдова",
				"Грузія",
				"Україна",
				"Косово"
			]
		},

		yAxis: {
			type: 'datetime',
			minTickInterval: 31 * 24 * 36e5,
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
						var date = new Date(this.y);
						return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
					}
				}
			}
		},

		legend: {
			enabled: false
		},

		series: [{
			name: 'Час розгляду',
			data: [
				generateSeriesData(seriesDataSMM),
				generateSeriesData(seriesDataAB)
			]
		}]
	});
});