# Problems
Lucid writes problems every year for the annual programming competition. You have been tasked with selecting which problems should be used this year.

It's important that the problems vary in topic and in difficultly.

You've gathered a list of `K` candidate problems. Each problems has one of `N` topics and one of `N` difficulties. How possible sets of `N` problems exist such that each topic and difficulty is present?

# Constraints
`1 <= N <= 8`
`N <= K <= 10000`

The answer is guaranteed to be less than 2^53

# Input
The first line will have two integers, N and K. K lines follow.

Each of the following lines will describe a problem giving a description followed by a number separated by a space.

Note: problems may have the same topic and difficulty as another problem, and still be considered different problems.

# Output
Output the number of possible problem sets of size `N` that can be selected where every topic and every difficulty is present.

# Examples

<table>
    <tr>
        <th>Input</th>
        <th>Input</th>
        <th>Input</th>
    </tr>
    <tr>
        <td><pre>2 4
topic_one 0
topic_two 1
topic_one 1
topic_two 0</pre></td>
        <td><pre>2 10
topic_one 0
topic_one 1
topic_two 0
topic_two 1
topic_one 1
topic_two 0
topic_two 1
topic_one 0
topic_two 0
topic_one 1</pre></td>
        <td><pre>8 22
problems 4
elevator 0
polygons 6
kdtree 3
eating_pizza 3
elevator 6
problems 4
resize 7
stuck 2
i18n 0
problems 5
eating_pizza 1
polygons 5
elevator 2
i18n 4
stuck 6
elevator 5
problems 4
elevator 2
stuck 7
problems 7
kdtree 2</pre></td>
    </tr>
    <tr>
        <th>Output</th>
        <th>Output</th>
        <th>Output</th>
    </tr>
    <tr>
        <td><pre>2</pre></td>
        <td><pre>13</pre></td>
        <td><pre>13</pre></td>
    </tr>
</table>