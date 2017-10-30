#!/usr/bin/python3

import math

n = int(input())
cur_log = int(math.log(n, 2))
next_power = int(math.pow(2, cur_log+1))
print(next_power)
