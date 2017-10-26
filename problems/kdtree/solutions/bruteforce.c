#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

typedef struct P2 {
    int x;
    int y;
} P2;


int dist(P2* a, P2* b) {
    int dx = b->x - a->x;
    int dy = b->y - a->y;
    return dx * dx + dy * dy;
}

int main(int arc, char** argv) {

    int N = 0;
    scanf("%d\n", &N);
    P2* points = malloc(N * sizeof(P2));
    for (int i = 0; i < N; i++) {
        scanf("%d %d\n", &(points[i].x), &(points[i].y));
    }

    int Q = 0;
    scanf("%d\n", &Q);
    for (int j = 0; j < Q; j++) {
        P2 temp;
        scanf("%d %d\n", &(temp.x), &(temp.y));
        P2* best_point = &points[0];
        int best_dist = dist(&temp, best_point);
        for (int i = 1; i < N; i++) {
            int test_dist = dist(&(points[i]), &temp);
            if (test_dist < best_dist) {
                best_dist = test_dist;
                best_point = &(points[i]);
            }
        }
        printf("%d %d\n", best_point->x, best_point->y);
    }
}
