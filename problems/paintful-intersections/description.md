# Paintful Intersections

Filbert is an intern at Lucid Software who is working on a bug in Lucidpress. Some of the shapes on documents are missing color. Filbert checks the code and quickly notices where the mistake is: one of the rendering functions is painting the intersection of shapes twice, so the browser is running out of paint! Help Filbert fix this function before more users' documents lose their color.

In order to prevent all this waste, Filbert needs to only paint intersection of shapes once, so he needs code that calculates the area of the intersection of a pair of convex polygons. Consider this example of two overlapping squares:

<div align="center">
<img alt="Overlapping squares" src="./squares.png" width="250px">
</div>

Both squares have a side length of 10 units, and the second square is offset by 5 units in both the `x` and `y` dimension. Thus the overlapping area is a square with a side length of 5 units, which has an area of 25 units.

Here's another example with overlapping triangles:

<div align="center">
<img alt="Overlapping triangles" src="./triangles.png" width="200px">
</div>

These equilateral triangles have a side length of 10 units. Recall that the formula for the area of a triangle is `(1/2)*b*h`, and for an equilateral triangle, the altitude is equal to `a*sqrt(3)/2`, where `a` is the side length. You'll notice that the overlapping region is equal to half the area of one of the triangles. So the total area of the overlapping region is:

```
(1/2) * (1/2)*b*h = (1/2) * (1/2)*a*(a*sqrt(3)/2) = a^2*sqrt(3)/8 = 21.651
```

Fortunately, Filbert knows the more general solutions for calculating the area of a polygon. Given vertices in clockwise or counterclockwise order, <img src="https://latex.codecogs.com/gif.latex?%28x_1%2C%20y_1%29%2C%20%28x_2%2C%20y_2%29%2C%20%28x_3%2C%20y_3%29%2C%20%5Cldots%28x_n%2Cy_n%29"> then the area is

<div align="center">
    <img alt="Shoelace formula" src="https://latex.codecogs.com/gif.latex?%5Cbegin%7Balign%7D%20A%26%3D%5Cfrac%7B1%7D%7B2%7D%5Cleft%7Cx_1%5Cleft%28y_n-y_1%5Cright%29+%5Csum_%7Bi%3D2%7D%5E%7Bn-1%7Dx_i%5Cleft%28y_%7Bi-1%7D-y_%7Bi+1%7D%5Cright%29+x_n%5Cleft%28y_1-y_n%5Cright%29%5Cright%7C%20%5Cnotag%20%5C%5C%20%26%3D%5Cfrac%7B1%7D%7B2%7D%5Cleft%7Cx_1%5Cleft%28y_n-y_1%5Cright%29+x_2%5Cleft%28y_1-y_2%5Cright%29+x_3%5Cleft%28y_2-y_3%5Cright%29+%5Cldots+x_n%5Cleft%28y_1-y_n%5Cright%29%5Cright%7C%20%5Cnotag%20%5Cend%7Balign%7D">
</div>

Some additional info:

* The intersection of two convex polygons is convex.
* The line passing through $(x_1, y_1)$ and (x_2, y_2) is defined by (x_2 - x_1)(y - y_1) = (y_2 - y_1)(x - x_1).
* A point (x, y) is inside a convex polygon if (x_1, y_1), (x_2, y_2), ... (x_n, y_n) iff (x - x_i)(y - y_i) - (x_{i+1} - x_i)(y_{i+1} - x_i) is always nonpostive or always nonnegative for all i.

## Input

The input will describe two convex polygons. The first line will contain an integer `N < 100`, the number of sides for the first polygon. The next `N` lines will contain a pair of decimal numbers `(x, y`),  representing the coordinates of the first polygon's vertices. This will be followed by a line containing an integer `M < 100`, the number of sides for the second polygon. The last `M` lines will contain the coordinates for the second set of vertices in the same fashion.

The vertices for each polygon can be given in any order. (Hint: One way to order vertices is computing atan2, using a selected vertex as the origin.)

Don't forget to account for cases where the polygons are completely disjoint (the area is zero) or where one polygon is contained entirely within the other (the area is the area of the contained polygon)!

## Output

The area of the intersection of the two polygons, rounded to 3 decimal places.

## Examples

<table>
    <tr>
        <th>Input</th>
        <th>Input</th>
    </tr>
    <tr>
        <td><pre>4
0.0 0.0
10.0 10.0
0.0 10.0
10.0 0.0
4
5.0 5.0
15.0 15.0
5.0 15.0
15.0 5.0
</pre></td>
        <td><pre>3
0 0
10 0
5 8.66025403784
3
0 8.66025403784
10 8.66025403784
5 0</pre></td>
    </tr>
    <tr>
        <th>Output</th>
        <th>Output</th>
    </tr>
    <tr>
        <td><pre>25.000</pre></td>
        <td><pre>21.651</pre></td>
    </tr>
</table>
