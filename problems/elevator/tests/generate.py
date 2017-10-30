#!/usr/bin/env python2
import argparse
import random

parser = argparse.ArgumentParser()
parser.add_argument('capacity', type=int)
parser.add_argument('people', type=int)
parser.add_argument('--max-distance', default=5000, type=int)
args = parser.parse_args()

print args.capacity, args.people

for _ in xrange(args.people):
	print random.randrange(-args.max_distance, args.max_distance)
