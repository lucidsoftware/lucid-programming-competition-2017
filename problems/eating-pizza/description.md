# Eating Pizza

Every Friday is pizza day at Lucid Software.

Megan and Jacob are avid pizza consumers and have devised a pizza-eating game.

In the game, Megan and Jacob start with P slices and take turns eating at least M slices but no more than N slices. The first person who fails to eat the requisite pizza on their turn loses. Megan always eats first because, of course, ladies first.

Assuming each player eats optimally, deduce the winner each week.

## Input

The first line will contain the number of weeks to analyze 1 <= W <= 10^5.
The next W lines consist of three space-separated integers: P, M, and N. 1 <= P <= 10^9 and 1 <= M <= N <= 10^9

## Output

Print W lines where each line is he name of the winner that week.

## Examples

<table>
	<tr>
		<th>Input</th>
	</tr>
	<tr>
		<td><pre>3
2 3 6
5 3 6
10 3 6</pre></td>
	</tr>
	<tr>
		<th>Output</th>
	</tr>
	<tr>
		<td><pre>Jacob
Megan
Jacob
</pre></td>
	</tr>
</table>

### Explanation

The first week there are 2 slices to eat but the minimum is 3. Megan goes first and does not have enough to eat, so Jacob wins.

The second week there are 5 slices. Megan goes first and eats all 5. She wins.

The third week there are 10 slices. Megan goes first and can eat 3 to 6 slices, leaving 4 to 7 slices. If Jacob eats as much as he can, he leaves Megan 0 to 1 slices, below the minimum 3. Jacob has a winning strategy no matter what Megan does.
