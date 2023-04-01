const withAuth = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    // Set the loggedIn variable to true
    res.locals.loggedIn = true;
    next();
  }
};

module.exports = withAuth;
