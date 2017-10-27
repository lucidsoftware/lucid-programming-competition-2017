# Bowling

Lucid is renting out the bowling alley for an Engineering activity, and we need to verify that the scoring system is correct.

## How to score bowling

We will use the traditional method to calculate the score.

A game of bowling consists of 10 frames where 10 pins are set up at the beginning of each frame. Each frame the bowler will take up to two shots attempting to knock down the pins. If the player knocks down all 10 pins on the first shot, they do not take a second shot.

In general, one point is scored for each pin that is knocked over. So if a player bowls over three pins wit the first shot, then six with the second, the player would receive a total of nine points for that frame.

In the event that all ten pins are knocked down by a plaer in a single frame, bonuses are awarded:

* <b>Strike</b>: When all ten pins are knocked down with the first ball, the player is awarded ten points, plus a bonus of whatever is scored with the next two balls.
* <b>Spare</b>: A "spare" is awarded when no pins are left standing after the second ball of a frame. (i.e., a player uses both balls of a frame to clear all ten pins.) A player acheiving a spare is awarded ten points, plus a bonus of whatver is scored with the next ball.

### The 10th frame

If the player wins bonus points on the 10th frame (either a strike or a spare) the player gets extra throws to calculate the bonus points, but the points are not double counted

# Input
The first line of the input will be a number `N`, `N` lines will follow.

Each line will be a full game represented by the number of pins knocked down on each throw, each number separated by a space. Every game will be well formed, there will be exactly the correct number of throws for each game.

# Output
For each game print out the final score each on its own line.

# Examples

<table>
    <tr>
        <th>Input</th>
        <th>Input</th>
    </tr>
    <tr>
        <td><pre>3
10 10 10 10 10 10 10 10 10 10 10 10
5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
10 0 0 10 0 0 10 0 0 10 0 0 10 0 0</pre></td>
        <td><pre>2
4 5 5 4 6 3 2 7 7 2 3 6 6 3 8 1 1 8 9 0
6 2 5 3 3 7 8 1 10 4 6 8 1 7 3 10 4 6 6</pre></td>
    </tr>
    <tr>
        <th>Output</th>
        <th>Output</th>
    </tr>
    <tr>
        <td><pre>300
150
50</pre></td>
        <td><pre>90</pre></td>
    </tr>
</table>