$(function () {

	var stages = [
		{
			name: "Профільний комітет ЄП обирає доповідача",
		}, {
			name: "Узгодження законопроекту в комітеті ЄП",
		}, {
			name: "Проект готується до подання на розгляд на пленарнiй сесії в Європарламенті"
		}, {
			name: "Розгляд законопроекту на пленарнiй сесiї/засiданнi Європарламенту",
			extraInfo: ['03/04/2017']
		}, {
			name: "Голосування за законопроект на пленарнiй сесії/засiданнi Європарламенту",
			extraInfo: ['03/04/2017']
		}, {
			name: "Узгодження закону з Радою ЄС",
			extraInfo: 'На будь-якому засіданні Ради ЄС, або й поза ними будь-якого дня за письмовою процедурою'
		}, {
			name: "Підписання закону",
			extraInfo: 'Приблизно від двох до трьох тижнів після узгодження'
		}, {
			name: "Публікація закону",
			extraInfo: 'Приблизно від одного до трьох тижнів після підписання'
		},
		{
			name: "Технічні процедури, що передують впровадженню безвізу",
			extraInfo: '20 днів з моменту опублікування, якщо інше не вказано в законі'
		}];

	var serbia = ["15/07/2009", "14/09/2009", "19/10/2009", "27/10/2009",
		"11/11/2009", "12/11/2009", "30/11/2009", "30/11/2009", "18/12/2009", "19/12/2009"];

	var albania = ["27/05/2010", "15/06/2010", "28/09/2010", "30/09/2010",
		"06/10/2010", "07/10/2010", "08/11/2010", "24/11/2010", "14/12/2010", "15/12/2010"];

	var moldova = ["27/11/2013", "13/01/2014", "12/02/2014", "13/02/2014",
		"27/02/2014", "27/02/2014", "14/03/2014", "03/04/2014", "08/04/2014", "28/04/2014"];

	var georgia = ["09/03/2016", "11/04/2016", "05/09/2016", "09/09/2016",
		"02/02/2017", "02/02/2017", "27/02/2017", "01/03/2017", "08/03/2017"];

	var ukraine = ["20/04/2016", "28/04/2016", "26/09/2016", "29/09/2016"];

	var kosovo = ["04/05/2016", "06/06/2016", "05/09/2016", "09/09/2016"];

	var allCountries = [serbia, albania, moldova, georgia, ukraine, kosovo].map(function(country) {
		return country.map(getTimeStampByDateString);
	});

	var series = stages.map(function(stage, index) {
		return {
			name: stage.name,
			data: generateSeriesData(index)
		}
	});

	function getTimeStampByDateString(dateString) {
		var date = new Date();
		var parsedString = dateString.split("/");
		date.setFullYear(parsedString[2], parsedString[1] - 1, parsedString[0]);
		return date.getTime();
	}

	function generateSeriesData(index) {
		return allCountries.map(function(country) {
			var period = country.slice(index, index+2);
			if (period.length === 1) {//the ongoing law process
				period.push(new Date());
			}
			return period;
		});
	}

	function printDate(date) {
		return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
	}

	Highcharts.setOptions({
		lang: {
			resetZoom: 'Відмінити масштабування',
			resetZoomTitle: 'Натисніть, щоб повернутись до немасштабованого вигляду'
		}
	});

	$('#container').highcharts({

		chart: {
			type: 'columnrange',
			zoomType: 'y',
			panning: true,
			panKey: 'shift',
			inverted: true
		},

		title: {
			text: 'Хронологія змін до директиви Єврокомісії 539/2001 2000/0030(CNS)'
		},

		subtitle: {
			text: 'Для країн Західних Балкан та Східної Європи'
		},

		xAxis: {
			categories: [
				"Сербія<br/>Чорногорія<br/>Македонія",
				"Албанія<br/>Боснія та Герцеговина",
				"Молдова",
				"Грузія",
				"Україна",
				"Косово"
			]
		},

		yAxis: {
			type: 'datetime',
			dateTimeLabelFormats: {
				month: '%m-%Y'
			},
			title: '',
			minTickInterval: 31 * 24 * 36e5,
		},

		tooltip: {
			formatter: function() {
				var startDate = new Date(this.point.low);
				var endDate = new Date(this.point.high);
				var result = '<b>' + this.series.name + '</b><br/>' +
					"з " + printDate(startDate) + " по " +
					printDate(endDate) + '<br/>' +
					'Скільки днів: ' + getDateDifference(startDate, endDate);
				return result;
			}
		},

		plotOptions: {
			columnrange: {
				stacking: 'normal',
				dataLabels: {
					align: 'left',
					enabled: true,
					formatter: function () {
						var date = new Date(this.point.low);
						return printDate(date);
					}
				}
			}
		},

		legend: {
			enabled: false
		},

		series: series
	});

	//build now-stages html
	var stagesContainer = $('.now-stages-container');
	stages.forEach(function(stage, index) {
		var step = $('<li></li>');
		step.text(stage.name)
		var isStageCompleted = typeof ukraine[index+1] !== 'undefined';
		var isStageActive = index === ukraine.length - 1;
		var tookDays;
		if (isStageCompleted) {
			step.prepend('<span class="glyphicon glyphicon-ok">&nbsp;</span>');
			tookDays = getDateDifference(ukraine[index], ukraine[index+1]);
			step.append('<br><em>Тривало днів: ' + tookDays + '</em>');
		} else if (isStageActive) {
			step.prepend('<span class="glyphicon glyphicon-play">&nbsp;</span>');
			tookDays = getDateDifference(ukraine[index], new Date());
			step.append('<br><em>Триває днів: ' + tookDays + '</em>');
		}
		var extraInfo = stage.extraInfo;
		if (extraInfo instanceof Array) {
			step.append(generatePossibleDates(extraInfo));
		} else if (extraInfo) {
			step.append('<br><em>' + extraInfo + '</em>');
		}
		step.addClass(isStageCompleted ? 'bg-success' : '');
		step.addClass(isStageActive ? 'bg-primary' : '');
		stagesContainer.append(step);
	});

	function getDateDifference(startValue, endValue) {
		var startTimeStamp = startValue.getTime ? startValue.getTime() : getTimeStampByDateString(startValue);
		var endTimeStamp = endValue.getTime ? endValue.getTime() : getTimeStampByDateString(endValue);
		var timeDifference = endTimeStamp - startTimeStamp;
		return Math.floor(timeDifference / (1000 * 3600 * 24));
	}

	function generatePossibleDates(dates) {
		var timeStamps = dates.map(getTimeStampByDateString);
		var datesList = $('<div></div>');
		datesList.append('<small>Можлива дата завершення цього етапу: </small>')
		timeStamps.forEach(function(timeStamp, index) {
			if (index > 0) {
				datesList.append("<em>, </em>");
			}
			datesList.append('<em><span class="glyphicon glyphicon-calendar"></span>' + printDate(new Date(timeStamp)) + '</em>');
		});
		return datesList;
	}
});