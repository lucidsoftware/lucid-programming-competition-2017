#!/usr/bin/python3

import random

RANGE = 10000
def rand_point():
    # Random distribution
    # x = random.randint(-RANGE, RANGE)
    # y = random.randint(-RANGE, RANGE)

    # Exponential distribution
    x = int(min(random.expovariate(10/RANGE), RANGE))
    y = int(min(random.expovariate(10/RANGE), RANGE))

    return x, y

n, k = input().split()
print(n)
for x, y in sorted(rand_point() for _ in range(int(n))):
    print("{} {}".format(x, y))
print(k)
for x, y in sorted(rand_point() for _ in range(int(k))):
    print("{} {}".format(x, y))
