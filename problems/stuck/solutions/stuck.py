# Python 3
import itertools
import sys

rows, columns = map(int, input().split())
grid = list(sys.stdin)
for i in range(rows):
    for j in range(columns):
        if grid[i][j] == '^':
            start = i, j
        elif grid[i][j] == '$':
            end = i, j

distances = [[float('inf')] * columns for _ in range(rows)]
edge = [end]
distance = 0
while edge:
    edge, old_edge = [], edge
    for i, j in old_edge:
        if distances[i][j] == float('inf'):
            distances[i][j] = distance
            directions = (
                ((i, j) for i in range(i - 1, -1, -1 ) if grid[i][j] != '.'),
                ((i, j) for i in range(i + 1, rows   ) if grid[i][j] != '.'),
                ((i, j) for j in range(j - 1, -1, -1 ) if grid[i][j] != '.'),
                ((i, j) for j in range(j + 1, columns) if grid[i][j] != '.'),
            )
            edge.extend(position for direction in directions for position in itertools.islice(direction, 0, 1))
    distance += 1

fixed = [distances[i][j] for i in range(rows) for j in range(columns) if grid[i][j] != '.']
total = len(fixed)
avg = float('inf')
while True:
    fixed = [distance for distance in fixed if distance < avg]
    new_avg = (sum(fixed) + total) / len(fixed)
    if avg == new_avg:
        break
    avg = new_avg
result = min(avg, distances[start[0]][start[1]])

print('{:.3f}'.format(result))
