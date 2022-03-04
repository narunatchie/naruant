const userModel = require('../config/DATABASE');

const createUseremail = (req,res) =>{
    const email = req.body.email;
    userModel.query(
        "INSERT INTO emailuser (email) VALUES (?)",
        [email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("insert data success");
            }
        }
    );
}
module.exports.createUseremail = createUseremail;