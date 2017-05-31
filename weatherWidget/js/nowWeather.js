document.addEventListener('DOMContentLoaded', ready);

function ready() {

	var APPID = 'fa4294a3acb4322317a6de8dcd0e71dc',
		area = document.querySelector('.weather-area'),
		loc = document.querySelector('.citiesBlock input'),
		temp = area.querySelector('.tempreature'),
		tempMin = area.querySelector('.tempMinMax .tempMinNumb'),
		tempMax = area.querySelector('.tempMinMax .tempMaxNumb'),
		descript = area.querySelector('.description'),
		icon = area.querySelector('.clouds'),
		humidity = area.querySelector('.humidity .data .dataNumber'),
		pressure = area.querySelector('.pressure .data .dataNumber'),
		wind = area.querySelector('.wind .data .dataNumber'),
		visibility = area.querySelector('.visibility .data .dataNumber'),
		direction = area.querySelector('.direction .directionArrow'),
		sunrise = area.querySelector('.middleLine .sunrise .sunriseTime'),
		time = area.querySelector('.middleLine .dateTime .dateTimeHours'),
		date = area.querySelector('.middleLine .dateTime .dateTimeText'),
		sunset = area.querySelector('.middleLine .sunset .sunsetTime'),
		btn = document.querySelector('.button');


		// console.dir(window);

	btn.classList.add('unPress');

	btn.addEventListener('mousedown', btnPress);
	btn.addEventListener('mouseup', btnPress);

	btn.addEventListener('click', updateWeatherByCity);


	if(navigator.geolocation) {
		updateWeatherByGeolocation();
	} else {
		updateWeatherByCity();
	}

	time.textContent = getNowTime();
	setInterval(
			function() {
				time.textContent = getNowTime();
			}, 2000);

	date.textContent = getNowDate();
	setInterval(
			function() {
				date.textContent = getNowDate();
			}, 60000);

	function update(weather) {
		loc.value = weather.loc;
		temp.textContent = convertTemp(weather.temp);
		tempMin.textContent = convertTemp(weather.temp_min);
		tempMax.textContent = convertTemp(weather.temp_max);
		sunrise.textContent = convertTime(weather.sunrise);
		sunset.textContent = convertTime(weather.sunset);
		icon.src = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
		descript.textContent = weather.description;
		humidity.textContent = weather.humidity;
		pressure.textContent = convertToMercury(weather.pressure);
		wind.textContent = convertMileKilometer(weather.wind);
		direction.style.transform = 'rotate(' +  weather.direction + 'deg)';
		visibility.textContent = convertYardKilometr(weather.visibility);
	}

	function updateWeatherByCity() {
		var city = loc.value;
		var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + 
				city + '&APPID=' + APPID;

		sendRequest(url);
		setInterval(function(){
			sendRequest(url);
		}, 1200000);
	}

	function updateByGeo(lat, lon) {
		var url = 'http://api.openweathermap.org/data/2.5/weather?' +
			 'lat=' + lat.toFixed(3) + '&lon=' + lon.toFixed(3) + '&APPID=' + APPID;

		sendRequest(url);
		setInterval(function(){
			sendRequest(url);
		}, 1200000);

		console.log(lat.toFixed(3));
		console.log(lon.toFixed(3));
	}

	function sendRequest(url) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		
		xhr.send();


		xhr.onreadystatechange = function() {
			console.log(xhr.readyState);

			if (xhr.readyState === 4 && xhr.status === 200) {
			var data = JSON.parse(xhr.responseText);

			var weather = {};
				weather.loc = data.name;
				weather.temp = data.main.temp;
				weather.temp_min = data.main.temp_min;
				weather.temp_max = data.main.temp_max;
				weather.icon = data.weather[0].icon;
				weather.description = data.weather[0].description;
				weather.sunrise = data.sys.sunrise;
				weather.sunset = data.sys.sunset;
				weather.humidity = data.main.humidity;
				weather.pressure = data.main.pressure;
				weather.wind = data.wind.speed;
				weather.direction = data.wind.deg;
				weather.visibility = data.visibility;
				update(weather);
			}
		}
	}

	function btnPress() {
		btn.classList.toggle('unPress');
	}

	function convertTemp(x) {
		return Math.round(x - 273.15);
	}

	function convertMileKilometer(y) {
		return Math.round(y/1.609);
	}

	function convertYardKilometr(z) {
		return Math.round(z*0.9144/1000);
	}

	function convertToMercury(a) {
		return Math.round(a*7.5/10);
	}

	function updateWeatherByGeolocation() {
		navigator.geolocation.getCurrentPosition(showPosition, showErrMsg);
	}

	function showPosition(position) {
		updateByGeo(position.coords.latitude, position.coords.longitude);
	}

	function showErrMsg() {
		alert('Вы отказались от автоматического отпределения погоды по Вашему мемтоположению! Выберете Ващ город и нажмите кнопку!');
	}

	function convertTime(a) {
		var	newTime = new Date(a*1000);
		
		return normalizeTime(newTime);
	}

	function getNowTime() {
		var nowTime = new Date();

		return normalizeTime(nowTime);
	}

	function normalizeTime(b) {
		var hours = b.getHours();
		var minutes = b.getMinutes();
		
		if( hours < 10) { hours = '0' + hours };
		if( minutes < 10) { minutes = '0' + minutes };

		return hours + ':' + minutes;
	}

	function getNowDate() {
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var mounth = nowDate.getMonth();
		var date = nowDate.getDate();
		var day = nowDate.getDay();
		var mounthStr, dayStr;

		switch(mounth) {
			case 0 : mounthStr = 'january';
			break;

			case 1 : mounthStr = 'febryary';
			break;

			case 2 : mounthStr = 'march';
			break;

			case 3 : mounthStr = 'april';
			break;

			case 4 : mounthStr = 'may';
			break;

			case 5 : mounthStr = 'june';
			break;

			case 6 : mounthStr = 'july';
			break;

			case 7 : mounthStr = 'august';
			break;

			case 8 : mounthStr = 'september';
			break;

			case 9 : mounthStr = 'october';
			break;

			case 10 : mounthStr = 'november';
			break;

			case 11 : mounthStr = 'december';
			break;
		}

		switch(day) {
			case 0 : dayStr = 'sunday';
			break;

			case 1 : dayStr = 'monday';
			break;

			case 2 : dayStr = 'teusday';
			break;

			case 3 : dayStr = 'wensday';
			break;

			case 4 : dayStr = 'thirsday';
			break;

			case 5 : dayStr = 'friyday';
			break;

			case 6 : dayStr = 'saturday';
			break;
		}

		return dayStr + ', ' + date + ' ' + mounthStr + ' ' + year;
	}
}


