let appId ='72db2c2bb10b3e93e97c866bbc78cbc7';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
     searchMethod = 'zip';
    else
     searchMethod = 'q'
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm)
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(resultFromServer){
    switch (resultFromServer.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage = 'url("sunny.jpg")';
            document.getElementById('documentIconImg').src = 'sunny.svg';
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            document.getElementById('documentIconImg').src = 'cloudy.svg';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            document.getElementById('documentIconImg').src = 'rainy-day.svg';
            break;

        case 'Thunderstorm':
          document.body.style.backgroundImage = 'url("storm.jpg")';
          document.getElementById('documentIconImg').src = 'lighting.svg';
            break;

        case 'Snow':
          document.body.style.backgroundImage = 'url("snow.jpg")';
          document.getElementById('documentIconImg').src ='hail-storm.svg'
            break;
        default:
          document.body.style.backgroundImage = 'url("default.jpg")';
            break;

        
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windspeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.toUpperCase();

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windspeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + 'm/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' +  resultFromServer.main.humidity + '%';
    
    setPositionForWeatherInfo();
    
}

function setPositionForWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.left = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';

}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
    
})