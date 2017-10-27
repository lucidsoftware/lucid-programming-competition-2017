# Eating Pizza

Megan and Jacob excitedly await pizza each Friday at Lucid Software. They are avid pizza consumers and can therefore eat an infinite amount of pizza! Whenever pizza is delivered, Megan and Jacob grab P pizzas and sneak off to play a little game. In the game, Megan and Jacob take turns eating whole pizzas and the first one that does not eat pizza on their turn loses. On any given turn, Megan or Jacob does not want to eat too much or too little pizza (Pizza is to be enjoyed!). More than N pizzas is too much, but less than M pizzas is too little. Megan always eats first because, of course, ladies first. Each player eats optimally to win within the constraints above. Given P, M, N for a set of weeks, can you deduce who was the winner for each week?

## Input

The first line will contain W, the number of weeks to analyze.
The next W lines each contain three number: P, M, and N for number of pizzas, minimum and maximum pizzas that can be eaten on a turn respectively.

## Output

Print W lines where each line contains 'Megan' if Megan wins or 'Jacob' if Jacob wins that week.

## Constraints

1 <= W <= 10**5
1 <= P <= 10**9
1 <= M <= N <= 10**9

# Example

## Input

3
2 3 6
5 3 6
10 3 6

## Output

Jacob
Megan
Jacob

## Explanation

In each week Megan and Jacob can eat between 3 and 6 pizzas per turn inclusive.

The first week there are two pizza to eat but the minimum one can eat is 3. Megan goes first but does not have enough to eat so she loses. Jacob wins.

The second week there are 5 pizzas. Megan goes first and can eat all 5. She wins.

The third week there are 10 pizzas. Megan goes first and can eat 3 to 6 pizzas. After her turn there could be between 4 and 7 pizzas left depending on her choice. On Jacob's turn he can eat the rest of the pizzas if there are 4, 5 or 6 left. If Megan left 7 pieces, Jacob can eat 6 of them leaving 1 left over. Jacob has a winning strategy no matter what Megan does. Jacob wins.
