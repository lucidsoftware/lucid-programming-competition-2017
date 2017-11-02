var rp = require('request-promise');
var tough = require('tough-cookie');
var escape = require('escape-html');

let cookie = new tough.Cookie({
    key: "_hrank_session",
    value: process.env['HACKERRANK_AUTH'],
    domain: 'www.hackerrank.com',
    httpOnly: true,
    maxAge: 31536000
});

function bucket(data, key) {
    let result = {};
    data.forEach(d => {
        if(!(d[key] in result)) {
            result[d[key]] = []
        }
        result[d[key]].push(d)
    });
    return result;
}

function calculateScore(submissions) {
    let score = 0;
    let time = 0;
    let problemStatus = {};
    submissions.sort((a,b) => {
        return a['time_from_start'] - b['time_from_start'];
    });

    submissions.forEach(submission => {
        if(!submission.in_contest_bounds) {
            return;
        }
        let slug = submission.challenge.slug;
        if(!(problemStatus[slug])) {
            problemStatus[slug] = {
                complete: false,
                penalty: 0,
                time: 0
            };
        }
        if(problemStatus[slug].complete) {
            return;
        }
        if(submission.status == 'Accepted') {
            problemStatus[slug].complete = true;
            score++;
            problemStatus[slug].time = submission.time_from_start;
            time += problemStatus[slug].time + problemStatus[slug].penalty;
        } else {
            problemStatus[slug].penalty += 20;
        }
    });
    return {
        score: score,
        problemStatus: problemStatus,
        time: time,
        userName: submissions[0].hacker_username,
    }
}

function toTimeStr(time) {
    let minutes = Math.abs(time);
    let hours = Math.floor(minutes/60);
    let min: any = minutes - hours * 60;
    let seconds: any = Math.round((min - Math.floor(min)) * 60);
    min = Math.floor(min);
    if(min < 10) {
        min = '0' + min;
    }
    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    return (time < 0 ? '-' : '') + hours + ':' + min + ':' + seconds;
}

let problems = [
    'bowling-scoring',
    'eating-pizza',
    'i18n',
    'one-elevator',
    'paintful-intersections',
    'powerful-growth',
    'problems',
    'proportional-resize',
    'spatial-indexing',
    'tron-flowchart',
];

export async function leaderboard() {

    var cookiejar = rp.jar();
    cookiejar.setCookie(cookie, 'https://www.hackerrank.com');

    let data = await rp({
        method:'GET',
        uri: 'https://www.hackerrank.com/rest/contests/lucid-2017-internal/judge_submissions/?offset=0&limit=10000',
        jar: cookiejar,
        json: true
    });

    let byUserName = bucket(data.models, 'hacker_username');

    let scores = [];
    for(let user in byUserName) {
        let submissions = byUserName[user];
        let score = calculateScore(submissions);
        scores.push(score);
    }
    scores.sort((a, b) => {
        return (b.score - a.score) || (a.time - b.time)
    });


    let result = `<html><head><link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"></head>
    <body>

    <div class="container"><table class="bordered striped centered"><tbody>\n<thead><tr><th>Rank</th><th>Name</th>`;
    problems.forEach(p => {
        result += `<th>${p}</th>`;
    });
    result += '<th>Score</th><th>Time</th></tr></thead>';

    for(let i=0; i<scores.length; i++) {
        let score = scores[i];
        if(score.score == 0) {
            continue;
        }

        let row = `\n<tr><td>${i+1}</td><td>${escape(score.userName)}</td>`;
        problems.forEach(p => {
            row += '<td>';
            if(score.problemStatus[p] && score.problemStatus[p].complete) {
                row += `${toTimeStr(score.problemStatus[p].time)}`;
                if(score.problemStatus[p].penalty) {
                    row += `<br>(+${score.problemStatus[p].penalty})`;
                }
            }
            row += '</td>';
        });
        row += `<td>${score.score}</td><td>${toTimeStr(score.time)}</td>`;
        row += '</tr>';
        result += row;
    }
    result += '</tbody></table></div></body></html>';

    return result;
};
