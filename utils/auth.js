const withAuth = (req, res, next) => {
    // Check if the user is logged in by checking the 'loggedIn' session variable
    if (!req.session.loggedIn) {
        // If the user is not logged in, redirect to the login page
        res.redirect('/login');
    } else {
        // If the user is logged in, proceed to the next middleware/route handler
        next();
    }
};

module.exports = withAuth;