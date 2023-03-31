const router = require('express').Router();

router.get('/', async (req, res) => {
  //   res.send('Home');
  res.render('main');
});

module.exports = router;
