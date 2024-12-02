// Данные о погоде в виде JSON-объекта
const weatherData = {"coord":{"lon":30.2642,"lat":59.8944},"weather":[{"id":800,"main":"Clear","description":"ясно","icon":"01n"}],"base":"stations","main":{"temp":15.03,"feels_like":14.65,"temp_min":14.08,"temp_max":15.03,"pressure":1011,"humidity":79,"sea_level":1011,"grnd_level":1009},"visibility":10000,"wind":{"speed":3,"deg":150},"clouds":{"all":0},"dt":1727203506,"sys":{"type":2,"id":197864,"country":"RU","sunrise":1727149703,"sunset":1727193203},"timezone":10800,"id":498817,"name":"Санкт-Петербург","cod":200};

// функция которая принимает объект с данными о погоде и возвращает очищенный объект с необходимыми данными:
function parseWeatherData(weatherData) {
    return {
        "nameTown": weatherData.name,
        "mainTemp": weatherData.main.temp,
        "weatherDescription": weatherData.weather[0].description,
        "feelsLike": weatherData.main.feels_like,
        "windSpeed": weatherData.wind.speed
    };
}

// функция, которая принимает очищенный объект и создает элементы DOM для отображения данных на странице.
function renderWeatherData(clearWeatherData) {
    // Получение элемента, в который будем добавлять другие
    const container = document.getElementById('container');

    // Функция для создания и наполнения элементов
    function createElement(tag, text) {
        const element = document.createElement(tag);
        element.textContent = text;
        return element;
    };

    // Создание и добавление элементов
    container.appendChild(createElement('h3', `Сейчас в г. ${clearWeatherData.nameTown}`));
    container.appendChild(createElement('p', `${clearWeatherData.mainTemp} градуса(ов) по цельсию`));
    container.appendChild(createElement('p', `${clearWeatherData.weatherDescription}`));
    container.appendChild(createElement('p', `ощущается как ${clearWeatherData.feelsLike}`));
    container.appendChild(createElement('p', `Скорость ветра: ${clearWeatherData.windSpeed} м/с`));
}

// Листнер
document.addEventListener('DOMContentLoaded', () => {
    // Получаем очищенные данные
    const clearWeatherData = parseWeatherData(weatherData);
    // Вызываем функцию для отображения данных
    renderWeatherData(clearWeatherData);
});
