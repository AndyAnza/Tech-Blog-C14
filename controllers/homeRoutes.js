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

//DASHBOARD ROUTE - SHOW USERS POSTS
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

    const user = await User.findOne({ where: { id: userId } });
    const username = user.username;
    console.log(userPosts);
    res.render('pages/dashboard', {
      id: userId,
      username,
      userPosts,
      countVisit: req.session.countVisit,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE NEW POST IN DASHBOARD
router.post('/dashboard', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.session.userId;
    console.log(userId);
    const newPost = await Post.create({
      title,
      content,
      userId,
    });
    res.status(202).json({ message: 'Post created', post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE POST IN DASHBOARD
router.delete('/:userId/:postId', withAuth, async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const deletePost = await Post.destroy({
      where: {
        id: postId,
      },
    });

    if (deletePost === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//LOGIN ROUTE
router.get('/login', (req, res) => {
  res.render('pages/login');
});

//SIGN IN ROUTE
router.get('/signIn', (req, res) => {
  res.render('pages/signIn');
});

module.exports = router;
