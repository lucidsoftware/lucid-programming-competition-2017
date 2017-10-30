import shapely.geometry

def read_numeric(type, line):
    return list(map(type, line.split()))

n1 = int(input())
v1 = [read_numeric(float, input()) for x in range(n1)]
n2 = int(input())
v2 = [read_numeric(float, input()) for x in range(n2)]

p1 = shapely.geometry.Polygon(v1).convex_hull
p2 = shapely.geometry.Polygon(v2).convex_hull
p3 = p1.intersection(p2)

area = p3.area
print('{0:.3f}'.format(round(area, 3)))
