"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var rp = require('request-promise');
var tough = require('tough-cookie');
var escape = require('escape-html');
var cookie = new tough.Cookie({
    key: "_hrank_session",
    value: process.env['HACKERRANK_AUTH'],
    domain: 'www.hackerrank.com',
    httpOnly: true,
    maxAge: 31536000
});
function bucket(data, key) {
    var result = {};
    data.forEach(function (d) {
        if (!(d[key] in result)) {
            result[d[key]] = [];
        }
        result[d[key]].push(d);
    });
    return result;
}
function calculateScore(submissions) {
    var score = 0;
    var time = 0;
    var problemStatus = {};
    submissions.sort(function (a, b) {
        return a['time_from_start'] - b['time_from_start'];
    });
    submissions.forEach(function (submission) {
        var slug = submission.challenge.slug;
        if (!(problemStatus[slug])) {
            problemStatus[slug] = {
                complete: false,
                penalty: 0,
                time: 0
            };
        }
        if (problemStatus[slug].complete) {
            return;
        }
        if (submission.status == 'Accepted') {
            problemStatus[slug].complete = true;
            score++;
            problemStatus[slug].time = submission.time_from_start;
            time += problemStatus[slug].time + problemStatus[slug].penalty;
        }
        else {
            problemStatus[slug].penalty += 20;
        }
    });
    return {
        score: score,
        problemStatus: problemStatus,
        time: time,
        userName: submissions[0].hacker_username
    };
}
function toTimeStr(time) {
    var minutes = Math.abs(time);
    var hours = Math.floor(minutes / 60);
    var min = minutes - hours * 60;
    var seconds = Math.round((min - Math.floor(min)) * 60);
    min = Math.floor(min);
    if (min < 10) {
        min = '0' + min;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return (time < 0 ? '-' : '') + hours + ':' + min + ':' + seconds;
}
var problems = [
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
function leaderboard() {
    return __awaiter(this, void 0, void 0, function () {
        var cookiejar, data, byUserName, scores, user, submissions, score, result, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cookiejar = rp.jar();
                    cookiejar.setCookie(cookie, 'https://www.hackerrank.com');
                    return [4 /*yield*/, rp({
                            method: 'GET',
                            uri: 'https://www.hackerrank.com/rest/contests/lucid-2017-internal/judge_submissions/?offset=0&limit=10000',
                            jar: cookiejar,
                            json: true
                        })];
                case 1:
                    data = _a.sent();
                    byUserName = bucket(data.models, 'hacker_username');
                    scores = [];
                    for (user in byUserName) {
                        submissions = byUserName[user];
                        score = calculateScore(submissions);
                        scores.push(score);
                    }
                    scores.sort(function (a, b) {
                        return (b.score - a.score) || (a.time - b.time);
                    });
                    result = "<html><head><link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css\"></head>\n    <body>\n\n    <div class=\"container\"><table class=\"bordered striped centered\"><tbody>\n<thead><tr><th>Rank</th><th>Name</th>";
                    problems.forEach(function (p) {
                        result += "<th>" + p + "</th>";
                    });
                    result += '<th>Score</th><th>Time</th></tr></thead>';
                    _loop_1 = function (i) {
                        var score = scores[i];
                        if (score.score == 0) {
                            return "continue";
                        }
                        var row = "\n<tr><td>" + (i + 1) + "</td><td>" + escape(score.userName) + "</td>";
                        problems.forEach(function (p) {
                            row += '<td>';
                            if (score.problemStatus[p] && score.problemStatus[p].complete) {
                                row += "" + toTimeStr(score.problemStatus[p].time);
                                if (score.problemStatus[p].penalty) {
                                    row += "<br>(+" + score.problemStatus[p].penalty + ")";
                                }
                            }
                            row += '</td>';
                        });
                        row += "<td>" + score.score + "</td><td>" + toTimeStr(score.time) + "</td>";
                        row += '</tr>';
                        result += row;
                    };
                    for (i = 0; i < scores.length; i++) {
                        _loop_1(i);
                    }
                    result += '</tbody></table></div></body></html>';
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.leaderboard = leaderboard;
;
