function getNum(max, tries) {
    let ans = Math.floor(Math.random()*(max+1));
    for(let i=1; i<tries; i++) {
        ans = Math.max(ans, Math.floor(Math.random()*(max+1)));
    }
    return ans;
}

function generateGame(tries) {
    let result = [];
    for(let i=0; i<10; i++) {
        let first = getNum(10, tries);
        result.push(first);
        if(first < 10) {
            let second = getNum(10-first, tries);
            result.push(second);
            if(i == 9 && second + first == 10) {
                result.push(getNum(10, tries));
            }
        } else if(i == 9) {
            let first = getNum(10, tries);
            result.push(first);
            if(first < 10) {
                result.push(getNum(10-first, tries));
            } else {
                result.push(getNum(10, tries));
            }
        }
    }
    return result.join(' ');
}

function calculateScore(input) {
    let game = input.split(' ').map(a => parseInt(a,10));
    let score = game.reduce((a,b) => a + b, 0);
    let frame = 1;
    let index = 0;
    for(let i=0; i<9; i++) {
        if(game[index] == 10) {
            score += game[index+1];
            score += game[index+2];
        }
        if(game[index] < 10) {
            if(game[index] + game[index+1] == 10) {
                score += game[index+2];
            }
            index++;
        }
        index++;
    }
    return score;
}

var chunks = [];
process.stdin.on('data', c => {
    chunks.push(c);
});

process.stdin.on('end', function() {
    var data = chunks.join('').trim().split('\n');

    for(let i=1; i<data.length; i++) {
        console.log(calculateScore(data[i]));
    }
});

// console.log(30);
// for(let i=0; i<30; i++) {
//     console.log(generateGame(i));
// }