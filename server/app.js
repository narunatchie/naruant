require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require("cookie-session");
const passport = require('passport');
const passportSetup = require("./passport/passport");
const app = express();
app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
    next();
})

const router = require('./router/user.Router');
app.use('/api', router);


module.exports = app;