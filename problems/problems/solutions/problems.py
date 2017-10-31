
N, K = map(int, input().split())

topic_key = {}
current_key = 0
table = [[0] * N for _ in range(N)]
for _ in range(K):
    topic, difficulty = input().split()
    if topic not in topic_key:
        topic_key[topic] = current_key
        current_key += 1
    table[topic_key[topic]][int(difficulty)] += 1

def combos(table, used):
    if not table:
        return 1
    total = 0
    for topic in range(N):
        if topic in used or table[0][topic] == 0:
            continue
        new_used = used.copy()
        new_used.add(topic)
        total += table[0][topic] * combos(table[1:], new_used)
    return total

print(combos(table, set()))
