const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const User = require('../models/user').User;
const pattern = require('../config/serverValidRegExps');
const config = require('../config/');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/auth/login/index.html'));
});

//{ failureRedirect: '/auth/login/', successRedirect: '/app/' }

router.post('/login',
    passport.authenticate('local'), (req, res) => {
        console.log('authenticated, user is: ', req.user);
        res.json({ username: req.user.username, userId: req.user.userId });
    }
);

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/auth/register/index.html'));
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!pattern.test(username)) {
        res.send('Invalid login. Rules: (Length from 6 to 50 characters, letters, digist, "_", "." are allowed)');
        return;
    }

    if (!pattern.test(password)) {
        res.send('Invalid password. Rules: (Length from 6 to 50 characters, letters, digist, "_", "." are allowed)');
        return;
    }

    User.findOne({ username }, (err, user) => {
        if(!user){
            if (err) { res.status(500).send('Eror occured') }
            if (user) { res.status(500).send('This user allready exists') }
            new User({ username, password })
                .save((err, user) => {
                    if (err) { 
                        res.status(500).send('db error');
                        console.log(err);
                    }
                    res.status(200).json({ username: user.username, userId: user.userId });
            });
        } else {
            res.send("Bad request");
            console.log('This login is allready taken = ' + username);
        }
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.get('/github', 
    passport.authenticate('github', {
        scope: ['user']
}));

const authConfig = { 
    failureRedirect: config.get('reactServerURI'), 
    successRedirect: config.get('reactServerURI') + 'app' };

router.get('/github/redirect',
    passport.authenticate('github', authConfig)
);

module.exports = router;
