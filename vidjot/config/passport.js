const LocalStragey = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// Load User Model
const User = mongoose.model('users');


module.exports = (passport) => {
    passport.use(new LocalStragey({ usernameField: 'email' },
        (email, password, done) => {
            console.log(email);
        }));
};

