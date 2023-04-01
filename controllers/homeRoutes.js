const router = require('express').Router();
const { User, Post } = require('../model');
const withAuth = require('../utils/auth');

//HOME ROUTE - RENDERS ALL USERS POSTS
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
      order: [['createdAt', 'DESC']],
    });
    const posts = postData.map(post => post.get({ plain: true }));
    console.log(posts);
    req.session.save(() => {
      if (req.session.countVisit) {
        req.session.countVisit++;
      } else {
        req.session.countVisit = 1;
      }
      res.render('pages/timeline', {
        posts,
        countVisit: req.session.countVisit,
        loggedIn: req.session.loggedIn,
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.userId;
    const userData = await User.findByPk(userId, {
      include: [{ model: Post }],
    });
    const userPosts = userData.get({ plain: true });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }
    console.log(userPosts);
    res.render('pages/dashboard', {
      id: userId,
      userPosts,
      countVisit: req.session.countVisit,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DASHBOARD ROUTE
// router.get('/dashboard', (req, res) => {
//   res.render('pages/dashboard');
// });

//LOGIN ROUTE
router.get('/login', (req, res) => {
  res.render('pages/login');
});

//SIGN IN ROUTE
router.get('/signIn', (req, res) => {
  res.render('pages/signIn');
});

module.exports = router;
