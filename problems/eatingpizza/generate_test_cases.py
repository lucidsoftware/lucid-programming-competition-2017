import os
from random import randrange


def wpmn(w, p, mn):
    yield "{}\n".format(w)
    for _ in range(w):
        pizzas, min_eat, max_eat = randrange(p) + 1, randrange(mn) + 1, randrange(mn) + 1
        min_eat, max_eat = sorted([min_eat, max_eat])
        yield "{} {} {}\n".format(pizzas, min_eat, max_eat)


# w, p range, m and n range
ranges = [
    [10, 10, 5],
    [10, 1000, 200],
    [10, 1000, 500],
    [100, 10, 5],
    [100, 100, 50],
    [100, 1000, 900],
    [1000, 10, 10],
    [1000, 100, 10],
    [1000, 1000, 500],
    [10000, 100, 10],
    [10000, 1000, 100],
    [10000, 10000, 10000],
    [100000, 10000, 100],
    [100000, 1000000000, 10],
    [100000, 1000000000, 1000000000],
]

path = "tests/"

for i, (w, p, mn) in enumerate(ranges):
    with open("{}{}.in".format(path, i), "w") as f:
        f.writelines(wpmn(w, p, mn))

for file in os.listdir(path):
    if file.endswith(".in"):
        os.system("cat {}{} | python3 eatingpizza.py > {}{}".format(path, file, path, file.replace('.in', '.out')))
