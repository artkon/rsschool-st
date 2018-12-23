const router = require('express').Router();
const User = require('../models/user').User;

router.get('/username', (req, res) => {
    const username = req.user.username ? req.user.username : req.user.githubUserName;
    res.send(JSON.stringify({ username }));
  })

module.exports = router;
