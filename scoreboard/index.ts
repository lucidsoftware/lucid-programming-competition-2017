import * as scoreboard from './scoreboard';

exports.handler = async (event, context, callback) => {
    try {
        callback(null, await scoreboard.leaderboard(event['queryStringParameters']['school']));
    } catch(e) {
        callback(e);
    }
};