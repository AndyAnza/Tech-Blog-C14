const router = require('express').Router();
const { User, Post } = require('../model');

//HOME ROUTE
// router.get('/', async (req, res) => {
//   //   res.send('Home');
//   res.render('pages/timeline');
// });

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      order: [['createdAt', 'DESC']],
    });
    const posts = postData.map(post => post.get({ plain: true }));
    console.log(posts);
    // req.session.save(() => {
    //   if (req.session.countVisit) {
    //     req.session.countVisit++;
    //   } else {
    //     req.session.countVisit = 1;
    //   }
    res.render('pages/timeline', {
      posts,
      // countVisit: req.session.countVisit,
      // loggedIn: req.session.loggedIn,
    });
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DASHBOARD ROUTE
router.get('/dashboard', (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('pages/dashboard');
});

//LOGIN ROUTE
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
