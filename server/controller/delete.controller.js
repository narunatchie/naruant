const userModel = require('../config/DATABASE');

const deleteUser = (req, res) => {
    const id = req.params.id;
    userModel.query("DELETE FROM member WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}
module.exports.deleteUser = deleteUser;