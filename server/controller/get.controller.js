const userModel = require('../config/DATABASE');

const getUser = (req, res) => {
userModel.query("SELECT * FROM member", (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
        console.log(result);
    }
});
}
module.exports.getUser = getUser