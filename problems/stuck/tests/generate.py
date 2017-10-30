#!/usr/bin/python2
import argparse
import random

parser = argparse.ArgumentParser()
parser.add_argument('rows', type=int)
parser.add_argument('columns', type=int)
parser.add_argument('--density', default=.5, type=float)
args = parser.parse_args()

print args.rows, args.columns

grid = ['O' if random.random() < args.density else '.' for _ in xrange(args.rows * args.columns)]
start = random.randrange(len(grid))
end = start
while start == end:
	end = random.randrange(len(grid))
grid[start] = '^'
grid[end] = '$'

for row in zip(*[iter(grid)] * args.rows):
	print ''.join(row)
