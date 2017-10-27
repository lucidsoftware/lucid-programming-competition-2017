w = int(input())
for week in range(w):
    p, m, n = [int(x) for x in input().strip().split()]
    assert(1 <= w <= 10**5)
    assert(1 <= p <= 10**9)
    assert(1 <= m <= n <= 10**9)
    print('Megan' if p % (n+m) >= m else 'Jacob')
