#!/usr/bin/python3

import random
import shapely.geometry

BOUNDS = 100
def get_point():
    x = random.uniform(-BOUNDS, BOUNDS)
    y = random.uniform(-BOUNDS, BOUNDS)
    return (x, y)

def get_rounded(v, d):
    return ('{0:.9f}'.format(round(v[0], d)), '{0:.9f}'.format(round(v[1], d)))

n1 = int(input())
n2 = int(input())

NUM_DECIMALS = 9
raw_v1 = [get_point() for x in range(n1)]
v1 = list(set(shapely.geometry.Polygon(raw_v1).convex_hull.exterior.coords))
raw_v2 = [get_point() for x in range(n2)]
v2 = list(set(shapely.geometry.Polygon(raw_v2).convex_hull.exterior.coords))

print(len(v1))
print('\n'.join([v[0] + ' ' + v[1] for v in [get_rounded(p, NUM_DECIMALS) for p in v1]]))

print(len(v2))
print('\n'.join([v[0] + ' ' + v[1] for v in [get_rounded(p, NUM_DECIMALS) for p in v2]]))
