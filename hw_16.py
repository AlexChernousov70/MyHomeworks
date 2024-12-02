# TIME
# введение секунд
seconds = input('Введите секунды: ')
# вычисление минут, часов, секунд
minites = int(seconds) // 60
hours = int(minites) // 60
minites = int(minites) % 60
seconds = int(seconds) % 60

print(f'{hours} часов {minites} минут {seconds} секунд')

# TEMP
# введение температуры в градусах Цельсия
celsius_temp = input('Введните температуру в градусах Цельсия: ')
# перевод температуры в градусах Цельсия из строки в число
celsius_temp = float(celsius_temp)
# перевод температуры в градусах Цельсия в градусы Кельвина, Фаренгейта, Реомюра
kelvin_temp = celsius_temp + 273.15
fahrenheit_temp = celsius_temp * 9 / 5 + 32
reomur_temp = celsius_temp * 4 / 5

print(f'Температура в Кельвинах: {round(kelvin_temp, 2)}, Температура в  Фаренгейтах: {round(fahrenheit_temp)}, Температура в Реомюрах: {round(reomur_temp)}')