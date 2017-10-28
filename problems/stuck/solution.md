# Stuck - solution

Each shape has an ideal function call when on that shape. Categorize shapes into "random", where `random()` is called, and "fixed", where `random()` is not called. The random shapes all have the same average number of moves; the fixed shapes vary by their location.

We will progressively move more and more shapes from fixed to random, as we find that random is better. The algorithm works like this:

1. Compute the moves to reach the destination from each shape using only fixed calls.
2. Assign all shapes that are reachable to the "fixed" category, and others to the "random" category.
3. Compute the average number of moves for the random shapes.
4. Move any fixed shapes to random, where the random average in \#3 is less than their fixed value.
5. If any shapes are moved in \#4, go to \#3 and repeat.

One challenge is calculating \#3, since `random()` can land on a fixed or a random shape. If ![](http://latex.codecogs.com/gif.latex?n) is the number of shapes, and ![](http://latex.codecogs.com/gif.latex?E) is the average number of moves,

![](http://latex.codecogs.com/gif.latex?E_{random}=1+\frac{n_{fixed}E_{fixed}+n_{random}E_{random}}{n_{fixed}+n_{random}})

![](http://latex.codecogs.com/gif.latex?E_{random}=1+E_{fixed}+\frac{n_{random}}{n_{fixed}})

Let's apply this to the example flowchart in the problem description:

<div align="center">
    <img alt="Example flowchart" src="./example-flowchart.svg">
</div>

|Shape|Category|Distance|
|-|-|-|
|A|fixed|3|
|B|fixed|2|
|C|fixed|1|
|D|fixed|2|
|E|random|∞|
|F|fixed|2|
|G|fixed|1|
|H|fixed|0|

![](http://latex.codecogs.com/gif.latex?E_{random}=1+\frac{3+2+1+2+2+1+0}{7}+\frac{1}{7}=1+1.571+0.143=2.714)

|Shape|Category|Distance|
|-|-|-|
|A|random|2.714|
|B|fixed|2|
|C|fixed|1|
|D|fixed|2|
|E|random|2.714|
|F|fixed|2|
|G|fixed|1|
|H|fixed|0|

![](http://latex.codecogs.com/gif.latex?E_{random}=1+\frac{2+1+2+2+1+0}{6}+\frac{2}{6}=1+1.333+0.333=2.667)

|Shape|Category|Distance|
|-|-|-|
|A|random|2.667|
|B|fixed|2|
|C|fixed|1|
|D|fixed|2|
|E|random|2.667|
|F|fixed|2|
|G|fixed|1|
|H|fixed|0|

This final table shows minumum average calls starting at each of the shapes.
