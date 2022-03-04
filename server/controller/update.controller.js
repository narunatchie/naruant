
const userModel = require('../config/DATABASE');
const upDataUser = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const lastname = req.body.lastname;
    userModel.query(
        "UPDATE member SET firstname= ? ,lastname= ? WHERE id = ?;",
        [name, lastname, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
}
module.exports.upDataUser = upDataUser;
