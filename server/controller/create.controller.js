const userModel = require('../config/DATABASE');

const createUser = (req,res) =>{
    const name = req.body.name;
    const lastName = req.body.lastname;
    const email = req.body.email;
    userModel.query(
        "INSERT INTO member (firstname, lastname,email) VALUES (?,?,?)",
        [name, lastName, email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("insert data success");

            }
        }
    );
}
module.exports.createUser = createUser;