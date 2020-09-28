const validate = {};

validate.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    } 
    req.flash('errorMessage', 'Denied Access');
    res.redirect('/users/signin');
};

module.exports = validate;