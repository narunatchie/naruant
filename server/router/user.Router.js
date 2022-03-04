const express = require('express');
const userRouter = express.Router();
const registerController = require('../controller/create.controller');
const getUserController = require('../controller/get.controller');
const updateUserController = require('../controller/update.controller');
const deleteUserController = require('../controller/delete.controller');
const postEmail = require('../controller/createemail.controller');
const passport = require('passport');
const CLIENT_URL = "http://localhost:3000/";
//curd
userRouter.get('/user', getUserController.getUser);
userRouter.post('/create', registerController.createUser);
userRouter.put('/update/:id', updateUserController.upDataUser);
userRouter.delete("/delete/:id", deleteUserController.deleteUser);
userRouter.post('/getemail',postEmail.createUseremail);
// facebook
userRouter.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));
userRouter.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = userRouter;