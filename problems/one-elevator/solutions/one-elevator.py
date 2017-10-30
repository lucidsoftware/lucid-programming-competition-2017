# Python 2
import sys

capacity, people = map(int, raw_input().split())
floors = [int(line) for line in sys.stdin]

above = sorted((floor for floor in floors if floor > 0), reverse=True)
below = sorted((-floor for floor in floors if floor < 0), reverse=True)
one_way = sum(above[i] for i in xrange(0, len(above), capacity)) \
    + sum(below[i] for i in xrange(0, len(below), capacity))
distance = 2 * one_way - max(next(iter(above), 0), next(iter(below), 0))

hour = 9 + distance / 3 / 60 % 24
minute = distance / 3 % 60
second = distance % 3 * 20

print '{:02}:{:02}:{:02} {}'.format((hour - 1) % 12 + 1, minute, second, 'AM' if hour < 12 else 'PM')
