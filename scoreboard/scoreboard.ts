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

const LOCK_SCOREBOARD = process.env['LOCK_SCOREBOARD'];

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
        if(LOCK_SCOREBOARD && submission.time_from_start > 3.5*60) {
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

const CONTEST_NAME= 'lucid-2017-internal';

const LIMIT = 100;
const BASE_URL = `https://www.hackerrank.com/contests/${CONTEST_NAME}/challenges/`;
const REST_URL = `https://www.hackerrank.com/rest/contests/${CONTEST_NAME}/judge_submissions/?limit=` + LIMIT;

var cookiejar = rp.jar();
cookiejar.setCookie(cookie, 'https://www.hackerrank.com');

function getPage(page: number) {
    return rp({
        method:'GET',
        uri: REST_URL + '&offset=' + page*LIMIT,
        jar: cookiejar,
        json: true
    });
}

async function getSubmissions() {

    let first = await getPage(0);
    let rest = [];
    for(let i=1; i*LIMIT < first.total; i++) {
        rest.push(getPage(i));
    }

    let result = first.models;

    let otherPages = await Promise.all(rest);

    otherPages.forEach(data => {
        result.push(...data.models);
    });

    let seen = {};
    return result.filter(submission => {
        if(seen[submission.id]) {
            return false;
        }
        seen[submission.id] = true;
        return true;
    });
}

export async function leaderboard(schoolFilter?:string) {

    let abbreviations = {
        'byu': 'BYU',
        'usu': 'USU',
        'utah': 'Utah',
    };
    schoolFilter = schoolFilter && schoolFilter.toLocaleLowerCase();
    if(schoolFilter && !(schoolFilter in abbreviations)) {
        schoolFilter = '';
    }

    let data = await getSubmissions();

    let byUserName = bucket(data, 'hacker_username');

    let profiles = {};
    let promises = [];
    for(let user in byUserName) {
        promises.push(rp({
            method:'GET',
            uri: 'https://www.hackerrank.com/rest/contests/master/hackers/' + user,
            jar:cookiejar,
            json: true,
        }).then(result => profiles[user] = result));
    }
    await Promise.all(promises);

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">
    <style>.container { min-width:1300px; } .title {color: black;}</style>
    <style>
    .tooltip {
        position: relative;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 300px;
        background-color: black;
        color: #fff;
        text-align: left;
        padding: 5px;
        border-radius: 6px;

        position: absolute;
        z-index: 1;
        top: 50%;
        left: calc(100% + 10px);
        transform: translateY(-50%);
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }
    </style>
    </head>
    <body>

    <div class="container">
    <h1><a class="title" href="?">Lucid Programming Competition Leaderboard</a></h1>
    <table class="bordered striped centered"><tbody>\n<thead><tr><th>Rank</th><th>Name</th><th>Location</th>`;
    problems.forEach(p => {
        result += `<th><a href="${BASE_URL+p}">${p}</a></th>`;
    });
    result += '<th>Score</th><th>Time</th></tr></thead>';

    for(let i=0; i<scores.length; i++) {
        let score = scores[i];
        if(score.score == 0) {
            continue;
        }
        let bio = (profiles[score.userName].model.short_bio || '').split('\n');
        let school = (bio.shift() || '').toLocaleLowerCase();

        let names = bio.map(n => escape(n)).join('<br>');

        let nameTooltip = bio.length > 0 ? 'Competitors:<br>' + names : 'Update the "About" field to have the school you are competing at as the first line (BYU, Utah, or USU), followed by the name of each person on your team on the next lines.';

        let row = `\n<tr><td>${i+1}</td><td><a class="tooltip" href="https://www.hackerrank.com/${score.userName}">${escape(profiles[score.userName].model.name)} <span class="tooltiptext">${nameTooltip}</span></a></td>`;
        if(schoolFilter && schoolFilter != school) {
            continue;
        }
        if(abbreviations[school]) {
            if(!schoolFilter) {
                row += `<td><a href="?school=${abbreviations[school]}">${abbreviations[school]}</a></td>`;
            } else {
                row += `<td>${abbreviations[school]}</td>`;
            }
        } else {
            row += `<td><a class="tooltip" href="https://www.hackerrank.com/settings/bio">Set Location<span class="tooltiptext">Update the "About" field to have the school you are competing at as the first line (BYU, Utah, or USU), followed by the name of each person on your team on the next lines.</span></td>`;
        }
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