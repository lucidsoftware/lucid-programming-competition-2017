# Problems
Lucid writes problems every year for the annual programming competition. You have been tasked with selecting which problems should be used this year. It's challenging because there are many different skill levels which participate in the competition. You want every team to be able to solve at least 1 problem (even the students brand new to programming), you want every problem to be solved by at least one team, and you don't want any team to solve all of the problems.

You've gathered a list of `K` problems, each with one of `N` topics and `N` difficulties and you need to select `N` problems from the list such that each topic and each difficulty is in your final selection. How many possible problem sets can you select?

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