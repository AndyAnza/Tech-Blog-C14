const router = require('express').Router();

//HOME ROUTE
router.get('/', async (req, res) => {
  //   res.send('Home');
  res.render('pages/timeline');
});

//DASHBOARD ROUTE
router.get('/dashboard', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('pages/dashboard');
});

//LOGIN RPUTE
router.get('/login', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('pages/login');
});

//SIGN IN ROUTE
router.get('/signIn', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('pages/signIn');
});

module.exports = router;
