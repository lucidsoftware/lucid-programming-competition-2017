
class Point():
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return "({}, {})".format(self.x, self.y)

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Point(self.x - other.x, self.y - other.y)

class Box():

    def fromPoints(p0, p1):
        x = min(p0.x, p1.x)
        y = min(p0.y, p1.y)
        w = abs(p0.x - p1.x)
        h = abs(p0.y - p1.y)
        return Box(x, y, w, h)

    def __init__(self, x, y, w, h):
        self.x = x
        self.y = y
        self.w = w
        self.h = h

    def __repr__(self):
        return '{} {} {} {}'.format(int(self.x), int(self.y), int(self.w), int(self.h))

    def tl(self):
        return Point(self.x, self.y)

    def tr(self):
        return Point(self.x + self.w, self.y)

    def bl(self):
        return Point(self.x, self.y + self.h)

    def br(self):
        return Point(self.x + self.w, self.y + self.h)

def reflected(refelctions, point):
    x = point.x
    y = point.y
    if refelctions['x'] % 2:
        x = -x
    if refelctions['y'] % 2:
        y = -y
    return Point(x, y)

def resizedBox(box, corner, mouse_up):
    # Normalize by reflecting to the positive quadrant and keep track so we can put it all back at the end.
    reflections = {'x': 0, 'y': 0}
    norm_box = Box(0, 0, box.w, box.h)
    if corner == "TopLeft":
        reflections['x'] = 1
        reflections['y'] = 1
        anchor = box.br()
    elif corner == "BottomLeft":
        reflections['x'] = 1
        anchor = box.tr()
    elif corner == "TopRight":
        reflections['y'] = 1
        anchor = box.bl()
    elif corner == "BottomRight":
        anchor = box.tl()

    # Use the reflected relative position.
    norm_mouse = reflected(reflections, mouse_up - anchor)
    # Normalize the mouse position as well.
    if norm_mouse.x < 0:
        reflections['x'] += 1
        norm_mouse.x = abs(norm_mouse.x)
    if norm_mouse.y < 0:
        reflections['y'] += 1
        norm_mouse.y = abs(norm_mouse.y)

    # Fix the aspect ratio. The reflections make this comparison simple.
    mouse_ratio = norm_mouse.x / norm_mouse.y
    box_ratio = norm_box.w / norm_box.h
    if mouse_ratio > box_ratio:
        x = norm_mouse.x
        y = int(x / box_ratio)
    else:
        y = norm_mouse.y
        x = int(y * box_ratio)

    # Convert back to the original quadrant.
    final_corner = reflected(reflections, Point(x, y))
    # Make a new box from the anchored corner and the dragged corner.
    return Box.fromPoints(anchor, anchor + final_corner)

def main():
    for t in range(int(input())):
        box = Box(*map(int, input().strip().split()))
        corner = input()
        mouseup = Point(*map(int, input().strip().split()))
        resized_box = resizedBox(box, corner, mouseup)
        print(resized_box)


if __name__ == '__main__':
    main()
