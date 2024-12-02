#  ввод текста и сдвига
text = input('Введите текст на русском или английском языке: ')
value = input('Введите число, которое будет использоваться как сдвиг для шифрования: ')

# проверка является ли value числом
try:
    int(value)
except ValueError:
    print("Введено некорректное значение сдвига для шифрования!")
    exit()

# создание нового текста
new_text = ""

# цикл прохождения по каждому символу слова
for char in text:
    # проблем оставляем без изменений
    if char == " ":
        new_text = new_text + " "
    # текст шифруем
    else:
        new_text = new_text + str(chr(ord(char) + int(value)))

#  вывод результата
print(f'\nРезультат: {new_text}\n')