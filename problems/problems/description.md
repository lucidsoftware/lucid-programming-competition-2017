# Problems
Lucid writes problems for the annual programming competition. You have been tasked with selecting which problems are used this year. A well-balanced competition has problems that vary in topic and difficultly.

You've gathered a list of K candidate problems. Each problems has one of  N possible topics and one of N possible difficulties. How many sets of N problems exist such that every topic and difficulty is present?

# Input
The first line will have two integers, N and K, where 1 <= N <= 8 and N <= K <= 10^5 The next K lines each describe a problem, giving its topic and difficulty, separated by a space.

Note: Each problem is considered to be distinct, even if another problem has the same topic and difficulty.

# Output
Output the number of problem sets of size N that can be selected where every topic and every difficulty is present. The answer is guaranteed to be less than 2^53.

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
