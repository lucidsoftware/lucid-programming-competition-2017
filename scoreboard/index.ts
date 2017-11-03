import * as scoreboard from './scoreboard';

exports.handler = async (event, context, callback) => {
    try {
        callback(null, await scoreboard.leaderboard(event.school));
    } catch(e) {
        callback(e);
    }
};

exports.queue = async (event, context, callback) => {
    try {
        callback(null, await scoreboard.getBaloonQueue(event.school));
    } catch(e) {
        callback(e);
    }
}