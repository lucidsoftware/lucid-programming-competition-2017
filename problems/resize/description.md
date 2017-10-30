# Proportional Resize

<img align="right" src="example.png">

A Lucidchart document contains a list of blocks. Each block is stored as a bounding box: the `x` and `y` coordinates of the top-left corner and the block's width and height. A block is resized by clicking on one of the corners and dragging it to another location. Additionally, if the user holds the shift key while resizing a block it will lock the height to width ratio. While resizing with the aspect ratio locked there are a few things that are always true.

1. The corner opposite the one being dragged never moves.
2. One edge of the block always stays under the cursor.

Calculate the final bounding box of a block, given the initial bounding box, the corner being dragged, and where the cursor was when the drag action completed.

Note: We use a coordinate system that increases down and to the right.

# Input

The first line is a single integer T, the number of test cases.
Each test case consists of 3 lines.
The first line of each test case is the bounding box of the block represented by four integers, `x y w h`, separated by spaces.
The second line is the corner being dragged, one of `TopLeft`, `TopRight`, `BottomLeft`, or `BottomRight`.
The third line is the point where the cursor was released represented by two integers, `x y`, separated by a space.

#### Constraints
```
0 < T <= 100
0 <= x, y, w, h <= 1000
```

# Output

For each of the T test cases, output a single line with final bounding box of the block as four numbers, `x y w h`, separated by spaces, and rounded down to the nearest integer.

# Example

<table>
    <tr>
        <th>Input</th>
        <th>Output</th>
    </tr>
    <tr>
        <td>
<pre>
4
100 100 100 100
BottomRight
300 200
100 100 200 100
BottomRight
400 200
200 200 200 100
BottomRight
400 100
100 100 200 100
TopLeft
500 500
</pre>
        </td>
        <td>
<pre>
100 100 200 200
100 100 300 150
200 100 200 100
300 200 600 300
</pre>
        </td>
    </tr>
</table>
