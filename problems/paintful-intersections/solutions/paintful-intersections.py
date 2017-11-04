#!/usr/bin/python3

import math
import functools

class Polygon:
    def get_sorted_points(points):
        center_x = sum(list(map(lambda point: point[0], points))) / len(points)
        center_y = sum(list(map(lambda point: point[1], points))) / len(points)
        return sorted(points, key=lambda p: math.atan2(p[1]-center_y, p[0]-center_x))

    def __init__(self, points):
        self.points = Polygon.get_sorted_points(points) if len(points) > 0 else []

    def get_area(self):
        # shoelace formula
        n = len(self.points)
        if n == 0:
            return 0

        xs = list(map(lambda point: point[0], self.points))
        ys = list(map(lambda point: point[1], self.points))
        sum1 = sum([x*y for x, y in zip(xs[0:n-1], ys[1:])]) + xs[n-1]*ys[0]
        sum2 = sum([x*y for x, y in zip(xs[1:], ys[0:n-1])]) + xs[0]*ys[n-1]
        area = abs(0.5 * (sum1 - sum2))
        return area

    def get_intersection(self, subject):
        def is_inside(cp1, cp2, p):
            return (cp2[0]-cp1[0])*(p[1]-cp1[1]) > (cp2[1]-cp1[1])*(p[0]-cp1[0])

        def get_intersection_point(cp1, cp2, s, e):
            dc = [cp1[0] - cp2[0], cp1[1] - cp2[1]]
            dp = [s[0] - e[0], s[1] - e[1]]
            n1 = cp1[0]*cp2[1] - cp1[1]*cp2[0]
            n2 = s[0]*e[1] - s[1]*e[0]
            n3 = 1.0/(dc[0]*dp[1] - dc[1]*dp[0])
            return [(n1*dp[0] - n2*dc[0])*n3, (n1*dp[1] - n2*dc[1])*n3]

        # Sutherland-Hodgman algorithm
        intersection_points = subject.points
        cp1 = self.points[-1]

        for clip_point in self.points:
            cp2 = clip_point
            input_list = intersection_points

            if len(input_list) == 0:
                break

            intersection_points = []
            point_s = input_list[-1]

            for subject_point in input_list:
                point_e = subject_point
                if is_inside(cp1, cp2, point_e):
                    if not is_inside(cp1, cp2, point_s):
                        intersection_points.append(get_intersection_point(cp1, cp2, point_s, point_e))
                    intersection_points.append(point_e)
                elif is_inside(cp1, cp2, point_s):
                    intersection_points.append(get_intersection_point(cp1, cp2, point_s, point_e))
                point_s = point_e
            cp1 = cp2

        intersection = Polygon(intersection_points)
        return intersection

def read_numeric(type, line):
    return list(map(type, line.split()))

n1 = int(input())
v1 = [read_numeric(float, input()) for x in range(n1)]
n2 = int(input())
v2 = [read_numeric(float, input()) for x in range(n2)]

poly1 = Polygon(v1)
poly2 = Polygon(v2)
intersection = poly1.get_intersection(poly2)
if len(intersection.points) == 0:
    intersection = poly2.get_intersection(poly1)

print('{0:.2f}'.format(round(intersection.get_area(), 3)))
