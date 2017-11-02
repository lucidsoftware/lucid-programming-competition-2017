# Paintful Intersections

Filbert is an intern at Lucid Software, and he is working on a bug in Lucidpress. Some of the shapes on documents are missing color. Filbert checks the code and quickly notices where the mistake is: one of the rendering functions is painting the intersection of shapes twice, so the browser is running out of paint! Help Filbert fix this function before more users' documents lose their color.

In order to prevent all this waste, Filbert must only paint intersection of shapes once. He needs code that calculates the area of the intersection of a pair of convex polygons.

A couple of examples:

<div align="center">
<img alt="Overlapping squares" src="./squares.png" width="250px">
</div>

If the side length is ![](https://latex.codecogs.com/svg.latex?s), the intersection area is ![](https://latex.codecogs.com/svg.latex?%5Cfrac%7Bs%5E2%7D%7B4%7D%3D%5Cfrac%7B10%5E2%7D%7B4%7D%3D25).

<div align="center">
<img alt="Overlapping triangles" src="./triangles.png" width="200px">
</div>

If the side length is ![](https://latex.codecogs.com/svg.latex?s), the area is ![](https://latex.codecogs.com/svg.latex?%5Cfrac%7Bs%5E2%5Csqrt%7B3%7D%7D%7B8%7D%3D%5Cfrac%7B10%5E2%5Csqrt%7B3%7D%7D%7B8%7D%3D21.651) where ![](https://latex.codecogs.com/svg.latex?s) is the triangle's edge length.

Fortunately, Filbert knows the general solution for calculating the area of a polygon. Given vertices in order (clockwise or counterclockwise), ![](https://latex.codecogs.com/svg.latex?%28x_1%2C%20y_1%29%2C%20%28x_2%2C%20y_2%29%2C%20%28x_3%2C%20y_3%29%2C%20%5Cldots%28x_n%2Cy_n%29) and treating ![](https://latex.codecogs.com/svg.latex?%28x_0%2C%20y_0%29) as ![](https://latex.codecogs.com/svg.latex?%28x_n%2C%20y_n%29), the area is:

<div align="center">
    <img src="https://latex.codecogs.com/svg.latex?%5Cbegin%7Balign%7D%20A%26%3D%5Cfrac%7B1%7D%7B2%7D%5Cleft%7C%5Csum_%7Bi%3D1%7D%5E%7Bn%7Dx_%7Bi-1%7Dy_i-x_iy_%7Bi-1%7D%5Cright%7C%20%5Cnotag%20%5C%5C%20%26%3D%5Cfrac%7B1%7D%7B2%7D%5Cleft%7Cx_ny_1%20-%20x_1y_n%20+%20x_2y_1-x_1y_2+x_2y_3-x_3y_2+%5Cldots%20x_%7Bn-1%7Dy_n-x_ny_%7Bn-1%7D%5Cright%7C%20%5Cnotag%20%5Cend%7Balign%7D)">
</div>

Some additional info:

* Membership of a point ![](https://latex.codecogs.com/svg.latex?%28x%2C%20y%29) in the polygon is determined by the terms ![](https://latex.codecogs.com/svg.latex?%28x%20-%20x_i%29%28y_%7Bi-1%7D%20-%20y_i%29%20-%20%28y%20-%20y_i%29%28x_%7Bi-1%7D%20-%20x_i%29). If all are positive, it is inside a clockwise polygon. If all are negative, it is inside a counterclockwise polygon. If at least one term is zero, it is on the boundary (note: remember that floating point computations are not exact and and may require some small tolerance).
* The intersection of two convex polygons is convex.
* Non-parallel lines ![](https://latex.codecogs.com/svg.latex?%28x_1%2C%20y_1%29%2C%20%28x_2%2C%20y_2%29) and ![](https://latex.codecogs.com/svg.latex?%28x_2%2C%20y_2%29%2C%20%28x_3%2C%20y_3%29) intersect at

<div align="center">
    <img src="https://latex.codecogs.com/svg.latex?x%3D%5Cfrac%7B%28x_1y_2-y_1x_2%29%28x_3-x_4%29-%28x_1-x_2%29%28x_3y_4-y_3x_4%29%7D%7B%28x_1-x_2%29%28y_3-y_4%29-%28y_1-y_2%29%28x_3-x_4%29%7D">
</div>

and similarly for ![](https://latex.codecogs.com/svg.latex?y).

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
