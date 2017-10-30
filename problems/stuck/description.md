# Stuck

Through means unknown, you been stuck in a flowchart!

One shape has an exit link. To extricate yourself, you must move from shape to shape and reach the link.
There are five available functions for moving:

```
down()    // move to the nearest shape directly below
left()    // move to the nearest shape directly left
right()   // move to the nearest shape directly right
up()      // move to the nearest shape directly above
random()  // randomly move to any shape (including the current)
```

What is the minimum average function calls required to reach the exit?

For example, consider the following 8-shape flowchart, where the exit link is at shape H:

<div align="center">
    <img alt="Example flowchart" src="./example-flowchart.svg">
</div>

* If you started at B, you would call `down() right()`, so the fewest average calls are 2.
* If you started at A, *could* call `right() down() right()`. But it would better on average to call `random()`.
  There's 1/8 chance you reach B, and call `down() right()` (3 total calls). There's 1/8 chance you reach H and exit (1
  call). There's even 1/8 chance you would remain at A, and call `random()` again (2+ calls). When each possible
  outcome is weighted by its probabilty, the average of the optimal strategy is 2.667.

## Input

The positions of the shapes are given as a grid. The first line is two space-separated integers 0 <= R, C <= 200, which
are the numbers of rows and columns. The following R lines each have C characters. `^` represents the starting shape,
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
        <td><pre>3 5
O.^OO
.O...
O.O$.</pre></td>
        <td><pre>3 5
^.OOO
.O...
O.O$.</pre></td>
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
        <td><pre>2.667</pre></td>
        <td><pre>2.000</pre></td>
    </tr>
</table>
