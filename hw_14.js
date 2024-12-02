// вставляем API из погодного сервиса
const apiKey = "cb9580f06d4bdd2cbb78545155619ca1";

// устанавливаем параметры запроса
const units = "metric";
const lang = "ru";
const input = document.getElementById("input");
const formButton = document.getElementById("formButton");
const airPollutionDiv = document.getElementById("airPollution");
const forecastDiv = document.getElementById("forecastDiv");
const currentWeatherP = document.getElementById("currentWeather");
const currentWeatherDiv = document.getElementById("currentWeatherDiv");

// установка описания качества воздуха
const airPollutionDescriptionObj = {
    1: { 
    description: "Отличное",
    bsClass: "alert-success",
    },
    2: {description: "Хорошее",
        bsClass: "alert-success",        
    },
    3: {description: "Удовлетворительное",
        bsClass: "alert-warning",        
    },
    4: {description: "Плохое",
        bsClass: "alert-danger",        
    },
    5: {description: "Ужасное",
        bsClass: "alert-danger",        
    },
};

// асинхоронная функция, принимающее название города и возвращающая координаты города
async function getGeoByCityName(CityName) {
    // url - адрес запроса от погодного сервиса
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${CityName}&limit=1&appid=${apiKey}`;
    // выполняем запрос по адресу url и получаем ответ 
    const response = await fetch(url);
    // если ответ успешный, то парсим ответ в формате json
    if  (response.ok) {
        const data = await response.json();
    
        // если массив пустой, то выводим сообщение об ошибке
        if (data.length === 0) {
            showModal("Город не найден");
            // "throw" - ключевое слово для генерации исключения. "new Error()" - создание нового объекта ошибки. "Город не найден" - сообщение, которое будет связано с этой ошибкой.
            throw new Error("Город не найден");
        };

        // если массив не пустой, то сохраняем координаты в переменную
        clearDana = {
            lat: data[0].lat,
            lon: data[0].lon,
        };
        // возвращаем clearDana
        return clearDana;
    }
    // если ответ не успешный, то выводим сообщение об ошибке
    else {
        console.error("Ошибка при получении данных о погоде");
        // создание ошибки и возврат статуса для выяснения неполадок
        throw new Error(`HTTP-код ошибки: ${response.status}`);
    };
};

// асинхронная функция, принимает координаты и возвращает корректный url для запроса
function getUrlByInput(lat, lon) {
    let weatherUrlIsObject = {
        currentWeather: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`,
        forecastWeather: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${apiKey}`,
        airPollution: `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    };
    return weatherUrlIsObject;
}


// асинхронная функция, принимает url и возвращает данные о погоде
async function getWeather(url) {
    // выполняем запрос по адресу url и получаем ответ
    const response = await fetch(url);
    // если ответ успешный, то парсим ответ в формате json
    if (response.ok) {
        console.log("Получен успешный ответ от url " + url);
        const data = await response.json();
        return data;
    }
    else {
        console.error("Ошибка при получении данных из-за неверного url " + url);
        throw new Error(`HTTP-код ошибки: ${response.status}`);
    };
}


// Листнер, который вызывается при нажатии на кнопку
formButton.addEventListener("click", async (event) => {
    // предотвращаем перезагрузку страницы, стандартное поведение браузера
    event.preventDefault();
    // получаем значение из инпута
    const cityName = input.value;
    // сохраняем значение в локальном хранилище
    localStorage.setItem("cityName", cityName);
    // вызываем функцию, которая получает координаты города
    displayAllWeather(cityName);
});

// Листнер, который проверяет при загрузке страницы значение в локальном хранилище и показывает погоду в этом городе
document.addEventListener("DOMContentLoaded", () => {
    // получаем значение из локального хранилища
    const cityName = localStorage.getItem("cityName");
    // если значение есть, то вызываем функцию, которая получает координаты города
    if (cityName) {
        displayAllWeather(cityName);
    };
});
    // создаем асинхронную функцию, которая получает координаты города
async function displayAllWeather(cityName) {
    // вызываем функцию, которая получает координаты города, ответ сохраняем в переменную
    let geoData = await getGeoByCityName(cityName);
    console.log(geoData);
    // вызываем функцию, которая получает url для запроса, ответ сохраняем в переменную
    let urlsObject = getUrlByInput(geoData.lat, geoData.lon);
    console.log(urlsObject);

    // weatherData - массив промисов, которые возвращают данные о погоде, если хоть что-то не вернется - будет ошибка
    let weatherData = await Promise.all([
        getWeather(urlsObject.currentWeather),
        getWeather(urlsObject.forecastWeather),
        getWeather(urlsObject.airPollution),
    ]);

    let resultWeatherData = {
        currentWeather: weatherData[0],
        forecastWeather: weatherData[1],
        airPollution: weatherData[2],
    };

    console.log(resultWeatherData);

    // состояние воздуха
    displayAirPollution(resultWeatherData.airPollution);
    // текущая погода
    displayCurrentWeather(resultWeatherData.currentWeather);
    // прогноз на 5 дней
    displayForecastWeather(resultWeatherData.forecastWeather);
};

// функция, принимающая данные о качестве воздуха, меняет класс на соответствующий качеству воздуха
function displayAirPollution(airPollution) {
    const airPollutionDescription = airPollutionDescriptionObj[airPollution.list[0].main.aqi];
    // добавляем класс в классы элемента airPollutionDiv
    const airPollutionClasses = airPollutionDiv.classList;
    // если количество классов больше 1, то удаляем последний класс
    if (airPollutionClasses.length > 1) {
        airPollutionDiv.classList.remove(airPollutionClasses[airPollutionClasses.length - 1]);
    }
    // добавляем класс в классы элемента airPollutionDiv
    airPollutionDiv.classList.add(airPollutionDescription.bsClass);
    // добавляем текст
    airPollutionDiv.textContent = airPollutionDescription.description;
};

// функция, принимающая код иконки и размер, возвращает url иконки, функия позволяет отображать иконки из openweathermap.org
function getIconUrl(iconCode, size) {
    if (size === undefined) {
        size = "";
    }
    else if (size === "4x") {
        size = "@4x";
    }
    else if (size === "2x") {
        size = "@2x"
    }
    else {
        throw new Error("Неизвестный размер иконки");
    }

    return `https://openweathermap.org/img/wn/${iconCode}${size}.png`;
};
// функция, принимающая данные о текущей погоде, отображает их на странице
function displayCurrentWeather(currentWeather) {
    const cityName = currentWeather.name;
    const iconID = currentWeather.weather[0].icon;
    // получаем url иконки, для её отображения у нас
    const iconUrl = getIconUrl(iconID, "4x");
    const temp = currentWeather.main.temp;
    const feelsLike = currentWeather.main.feels_like;
    const windSpeed = currentWeather.wind.speed;

    // создаем элементы для отображения погоды
    firstP = `<p>Город: ${cityName}<br /> Температура: ${Math.round(temp)}°C <br /> Ощущается как: ${Math.round(feelsLike)}°C<br /> Cкорость ветра: ${Math.round(windSpeed)} м/с</p>`;
    // добавляем элементы на страницу
    currentWeatherP.innerHTML = firstP;

    // создаем иконку
    iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    console.log(iconImg);
    currentWeatherDiv.appendChild(iconImg);
    // чистка от лишних элементов
    if (currentWeatherDiv.childElementCount > 3) {
        // Если да, то удаляем третий дочерний элемент
        currentWeatherDiv.removeChild(currentWeatherDiv.children[2]);
    }
};

function displayForecastWeather(forecastWeather) {
    const table = document.createElement("table");

    table.classList.add("table", "table-primary", "table-hover");

    const firstRow = "<tr><th>Дата</th><th>Иконка</th><th>Температура</th><th>Ветер</th></tr>";
    // цикл перебирает массив объектов прогноза погоды, извлекает данные и отрисовывает на странице
    for (let weatherObj of forecastWeather.list) {
        const dateTime = weatherObj.dt_txt; // дата и время
        const date =  dateTime.split(" ")[0]; // дата
        const time =  dateTime.split(" ")[1].split(":")[0] + "ч"; // время
        const finalDateTime = date + " " + time; 
        const iconID = weatherObj.weather[0].icon;
        const iconUrl = getIconUrl(iconID);
        const temp = Math.round(weatherObj.main.temp);
        const windSpeed = Math.round(weatherObj.wind.speed);
        /// создаем строку таблицы
        const row = `<tr><td>${finalDateTime}</td><td><img src="${iconUrl}" alt="иконка погоды"></td><td>${temp}°C</td><td>${windSpeed} м/с</td></tr>`;
        // добавляем строку в таблицу
        table.innerHTML += row;
        // очищаем forecastDiv, чтобы не было дублирования данных
        //forecastDiv.innerHTML = "";
        forecastDiv.lastChild = "";
        // добавляем таблицу в forecastDiv
        forecastDiv.appendChild(table);
        //очистка таблицы если дочерних элементов 3 или больше
        if (forecastDiv.childElementCount > 2) {
            // Если да, то удаляем второй дочерний элемент
            forecastDiv.removeChild(forecastDiv.children[1]);
        }
    };
};
// функция для отображения модального окна с сообщением об ошибке
function showModal(message) {
    const modalElement = document.getElementById("errorModal");
    const modalMessage = document.getElementById("errorMessage");
    modalMessage.textContent = message;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
};
