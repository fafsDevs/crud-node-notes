const usersCtrl = {};

const User = require('../models/Users');
const passport = require('passport');

usersCtrl.renderSignupForm = (req, res) => {
    res.render('users/signup')
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    console.log(req.body);
    if (password != confirm_password) {
        errors.push({text: 'passwords do not match'});
    } 
    if (password.length < 5) {
        errors.push({text: 'passwords must be at least 5 characters'});
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('errorMessage', 'Email is already exists');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('successMessage', 'You are registered!');
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('successMessage', 'You are logged out now');
    res.redirect('/users/signin');
};


module.exports = usersCtrl;