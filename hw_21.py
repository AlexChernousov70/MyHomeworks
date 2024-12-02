from hw_21_cities import cities_list

# создаем пустой сет
cities_set = set()

# создаем пустой список
clear_cities_list = []

# обходим циклом и очищаем от лишней инфы, оставляет в списке только имена городов
for cities_dict in cities_list:
    clear_cities_list.append(cities_dict.get("name"))

# переводим список в сет
cities_set = set(clear_cities_list)

# поиск плохих букв
all_last_words = set([words[-1] for words in cities_set])
all_first_words = set([words[0].lower() for words in cities_set])
bad_words = list(all_last_words - all_first_words)
# замена сеты без городов, оканчивающихся на плохие буквы
# cities_set = set([name_city for name_city in cities_set if name_city[-1] != bad_words[0] and name_city[-1] != bad_words[1]])
cities_set = set([name_city for name_city in cities_set if all(name_city[-1] != bad_word for bad_word in bad_words)])

# ПЕРВЫЙ ХОД
first_move = True
# ПОСЛЕДНЯЯ БУКВА
last_word = ''

# Я ХОЧУ СЫГРАТЬ С ТОБОЙ В ОДНУ ИГРУ
while True:
    # проверка - если ход не первый
    if not first_move:
        # проверяем остались ли слова на last_word
        for name_city in cities_set:
            # если оставись продолжаем игру
            if name_city[0] == last_word.upper():
                break
        # если не осталось объявляем о проигрыше
        else:
            print(f'\nГородов на "{last_word}" не осталось')
            print("=== ВЫ ПРОИГРАЛИ=== \nну а чего вы ожидали?")
            exit()
    # ход человека
    city_input = input('Введите название города: ')
    # проверяем сдался ли кусок мяса
    if city_input.lower() == 'стоп':
        print("=== ВЫ ПРОИГРАЛИ=== \nну а чего вы ожилали?")
        exit()

    # проверка нахождения города в множестве
    if city_input.capitalize() in cities_set:
        # проверка первый ли это ход, если да то первая буква города - любая
        if first_move or city_input.lower()[0] == last_word:
        # определение последней буквы
            last_word = city_input[-1]
            # вывод на экран
            print(f'Роботу на "{last_word}"')
            # удаление города из множества
            cities_set.remove(city_input.capitalize())
            # определяем, что первый ход закончен
            first_move = False
        else:
            print(f'Вам на "{last_word}"!')
            continue
    # если нет города вывод текста
    else:
        print('нет такого города, вероятно вы проиграли машине')
        continue
    # ход Робота
    # перебираем множество
    for name_city in cities_set:
        # если город начинается на последнюю букву города человека
        if name_city[0] == last_word.upper():
            # выводим на экран
            print(f'ХОД РОБОТА: {name_city}')
            # опеределяем последнюю букву города робота
            last_word = name_city[-1]
            # выводим на экран
            print(f'Вам на "{last_word}"')
            break
    else:
        print(f'\nГородов на "{last_word}" не осталось')
        print('\n=== ВЫ ПОБЕДИЛИ ===\n')
        exit()
    # удаляем из множества названный роботом город
    cities_set.remove(name_city)