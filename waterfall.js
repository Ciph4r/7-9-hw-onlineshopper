const {waterfall} = require('async')


waterfall([
    function(callback) {
        callback(null, 5, 7);
    },
    function(arg1, arg2, callback) {
        const newNum = arg1 + arg2
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, newNum);
    },
    function(arg1, callback) {
        const res = arg1 * 10
        // arg1 now equals 'three'
        callback(null, res);
    }
], function (err, result) {
    console.log(result)
    // result now equals 'done'
});