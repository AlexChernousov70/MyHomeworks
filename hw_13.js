// Получаем поле ввода и кнопку
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');

//добавляем слушатель работающий по загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    
        // получаем сохраненный в локальном хранилище город
        const localCity = localStorage.getItem('city');

        // Если данные существуют, подставляем их в значение поля ввода
        if (localCity) {
            cityInput.value = localCity;
        }
    });

// Добавляем слушатель события работающий по клику
searchButton.addEventListener('click', function(event) {
    // Предотвращаем стандартное поведение формы
    event.preventDefault();   
    
    // получаем значение из поля ввода
    const cityName = cityInput.value;
    
    // условие пустое ли поле
    if (cityName.trim() === "") {
        alert("Введенная форма пустая. Введите название города.");
    };

    // Сохраняем значение в локальное хранилище
    localStorage.setItem('city', cityName)
});
