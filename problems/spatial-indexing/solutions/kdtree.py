from collections import namedtuple
from operator import itemgetter
from pprint import pformat

dimensions = 2

# Adapted from https://en.wikipedia.org/wiki/K-d_tree
class Node(namedtuple('Node', ['location', 'left_child', 'right_child'])):
    def __repr__(self):
        return pformat(tuple(self))

def kdtree(point_list, depth=0):
    if not point_list:
        return None
    axis = depth % dimensions

    # Sort point list and choose median as pivot element.
    point_list.sort(key=itemgetter(axis)) # This is really slow, but it doesn't really matter.
    median = len(point_list) // 2 # choose median

    # Create node and construct subtrees
    return Node(
        location=point_list[median],
        left_child=kdtree(point_list[:median], depth + 1),
        right_child=kdtree(point_list[median + 1:], depth + 1)
    )

def dist_squared(p1, p2):
    return sum((s1 - s2)**2 for s1, s2 in zip(p1, p2))

def better(p0, p1, p2):
    p1_dist = dist_squared(p0, p1)
    p2_dist = dist_squared(p0, p2)
    if p1_dist < p2_dist:
        return p1, p1_dist
    elif p1_dist == p2_dist:
        if p1 < p2:
            return p1, p1_dist
        else:
            return p2, p2_dist
    else:
        return p2, p2_dist

def nearest(point, tree, depth=0):
    if not tree:
        return None, None
    axis = depth % dimensions
    best = None
    best_dist = None
    other = None
    # First search on the side that is likely to have the closest point.
    if point[axis] <= tree.location[axis]:
        best, best_dist = nearest(point, tree.left_child, depth+1)
        other = tree.right_child
    else:
        best, best_dist = nearest(point, tree.right_child, depth+1)
        other = tree.left_child

    if best:
        # Compare the best from that side with this node.
        best, best_dist = better(point, best, tree.location)
    else:
        # If there wasn't a point on that side, then this node is the closest so far.
        best = tree.location
        best_dist = dist_squared(point, tree.location)

    # Is the point closer to the split line, than the current best point?
    # If yes, we need to check for closer points on the other side of the split.
    if abs(tree.location[axis] - point[axis])**2 <=  best_dist:
        other_best, other_best_dist = nearest(point, other, depth+1)
        if other_best:
            best, best_dist = better(point, best, other_best)

    return best, best_dist

def main():
    N = int(input())
    points = [tuple(map(int, input().strip().split())) for _ in range(N)]
    tree = kdtree(points)
    # print(tree)
    Q = int(input())
    for _ in range(Q):
        test_point = tuple(map(int, input().strip().split()))
        best_point, best_dist = nearest(test_point, tree)
        print("{} {}".format(*best_point))

if __name__ == '__main__':
    main()
