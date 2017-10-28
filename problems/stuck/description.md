# Stuck

Through means unknown, you been stuck in a diagram!

One shape has an exit link. To extricate yourself from the diagram, you must move from shape to shape and reach the link.
There are five available functions for moving:

```
down()    // move to the nearest shape below the current
left()    // move to the nearest shape left of the current
right()   // move to the nearest shape right of the current
up()      // move to the nearest shape above the current
random()  // randomly move to any shape (including the current)
```

What is the fewest average function calls required to reach the exit?

For example, consider the following flowchart of 8 shapes, where the exit link is at shape H:

<div align="center">
    <img alt="Example flowchart" src="./example-flowchart.svg">
</div>

If you started at D, you would call `right() down()`, so the fewest average calls are 2.

If you started at A, you *could* call `right() down() right()` But it's actually optimal on average to instead call
`random()` There's 1/8 chance you reach H, and immediately exit (1 total call). There's 1/8 change you reach E, and
call `down()` (2 calls). There's even 1/8 chance you would remain on A, and call `random()` again (2+ calls). When each
possible outcome is weighted by its probabilty, the average number of function calls of this optimal strategy is 2.333.

## Input

The positions of the shapes is given as a grid. The first line is two space-separated integers 0 <= R, C <= 100, which
are the numbers of rows and columns. The following R rows each have C characters. `^` represents the starting shape,
`$` represents the ending shape, `O` represents another shape, and `.` represents empty space.

## Output

The minimum average function calls, accurate to within 0.001.

## Examples

<table>
    <tr>
        <th>Input</th>
        <th>Input</th>
        <th>Input</th>
    </tr>
    <tr>
        <td><pre>3 4
O.O.
O^.O
O.O$</pre></td>
        <td><pre>3 4
^.O.
OO.O
O.O$</pre></td>
        <td><pre>2 2
$.
.^</pre></td>
    </tr>
    <tr>
        <th>Output</th>
        <th>Output</th>
        <th>Output</th>
    </tr>
    <tr>
        <td><pre>2.000</pre></td>
        <td><pre>2.333</pre></td>
        <td><pre>2.000</pre></td>
    </tr>
</table>
