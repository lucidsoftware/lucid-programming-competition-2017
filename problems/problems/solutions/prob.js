let memoized = new Map();

function countWays(problems, idx, difficulties, topics) {
    if (difficulties == 0 || topics == 0) {
        return 1;
    }
    let key = difficulties + (topics << 10) + (idx << 20);
    if (memoized.has(key)) {
        return memoized.get(key);
    }
    let result = 0;
    for (let i = idx; i < problems.length; i++) {
        let [difficulty, topic, count] = problems[i];
        let dbit = 1 << difficulty;
        let tbit = 1 << topic;
        if ((difficulties & dbit) && (topics & tbit)) {
            result = (result + count * countWays(problems, i + 1, difficulties - dbit, topics - tbit)) //% 1000007;
        }
    }
    // memoized.set(key, result);
    return result;
}

var chunks = [];
process.stdin.on('data', c => {
    chunks.push(c);
});

process.stdin.on('end', function() {
    var data = chunks.join('').trim().split('\n');


    let n = parseInt(data[0].split(' ')[0], 10);

    let set = 0;
    for (let i = 0; i < n; i++) {
        set = set | (1 << i);
    }

    let topicIdx = {};
    let problems = {};

    for(let i=1; i<data.length; i++) {
        let key = data[i];
        let [topic, difficulty] = key.split(' ');
        let idx;
        // key += ',' + i;

        if(topic in topicIdx) {
            idx = topicIdx[topic];
        } else {
            idx = Object.keys(topicIdx).length;
            topicIdx[topic] = idx;
        }

        if(key in problems) {
            problems[key][2]++;
        } else {
            problems[key] = [idx, parseInt(difficulty, 10), 1];
        }
    }
    console.log(countWays(Object.values(problems), 0, set, set));

});