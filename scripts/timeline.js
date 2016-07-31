$(function () {

// 15/07/2009	Legislative proposal published	COM(2009)0366 Eur-Lex link	Summary
// 14/09/2009	Committee referral announced in Parliament, 1st reading/single reading
// 19/10/2009	Vote in committee, 1st reading/single reading	 	Summary
// 27/10/2009	Committee report tabled for plenary, 1st reading/single reading	A7-0042/2009
// 11/11/2009	Debate in Parliament
// 12/11/2009	Results of vote in Parliament
// 12/11/2009	Decision by Parliament, 1st reading/single reading	T7-0062/2009	Summary
// 30/11/2009	Act adopted by Council after consultation of Parliament
// 30/11/2009	End of procedure in Parliament
// 18/12/2009	Final act published in Official Journal

// 27/05/2010	Legislative proposal published	COM(2010)0256 Eur-Lex link	Summary
// 15/06/2010	Committee referral announced in Parliament, 1st reading/single reading
// 28/09/2010	Vote in committee, 1st reading/single reading	 	Summary
// 30/09/2010	Committee report tabled for plenary, 1st reading/single reading	A7-0256/2010
// 06/10/2010	Debate in Parliament
// 07/10/2010	Results of vote in Parliament
// 07/10/2010	Decision by Parliament, 1st reading/single reading	T7-0349/2010	Summary
// 08/11/2010	Act adopted by Council after Parliament's 1st reading
// 24/11/2010	Final act signed
// 24/11/2010	End of procedure in Parliament
// 14/12/2010	Final act published in Official Journal

	var serbia = ["15/07/2009", "14/09/2009", "19/10/2009", "27/10/2009",
		"11/11/2009", "12/11/2009", "30/11/2009", "30/11/2009", "18/12/2009"];

	var albania = ["27/05/2010", "15/06/2010", "28/09/2010", "30/09/2010",
		"06/10/2010", "07/10/2010", "08/11/2010", "24/11/2010", "14/12/2010"];

	var allCountries = [serbia, albania].map(function(country) {
		return country.map(getTimeStampByDateString);
	});

	function getTimeStampByDateString(dateString) {
		var date = new Date();
		var parsedString = dateString.split("/");
		date.setFullYear(parsedString[2], parsedString[1] - 1, parsedString[0]);
		return date.getTime();
	}

	function generateSeriesData(index) {
		return allCountries.map(function(country) {
			return country.slice(index, index+2);
		});
	}

	console.log(JSON.stringify(generateSeriesData(0)));

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
			formatter: function() {
				return '<b>' + this.series.name + '</b>'
			}
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

		series: [
			{
				name: 'Legislative proposal published',
				data: generateSeriesData(0),
			}, {
				name: 'Committee referral announced in Parliament, 1st reading/single reading',
				data: generateSeriesData(1)
			}
		]
	});
});