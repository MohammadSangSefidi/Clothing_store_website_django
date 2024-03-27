from random import choice


def activeCode(num):
    code = ''
    for num in range(int(num)):
        code += str(choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
    return code
