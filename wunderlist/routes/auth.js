const router = require('express').Router();
const passport = require('passport');
const path = require('path');
const User = require('../models/user').User;
const pattern = require('../config/serverValidRegExps');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/auth/login/index.html'));
});

router.post('/login',
    passport.authenticate('local', { 
        failureRedirect: '/auth/login/', 
        successRedirect: '/app/'
    })
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
            if (err) { res.status(500).send('Eror occured') };
            if (user) { res.status(500).send('This user allready exists') };
            new User({ username, password })
                .save((err, user) => {
                    if (err) { 
                        res.status(500).send('db error');
                        console.log(err);
                    };
                    res.redirect('/auth/login');
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

const authConfig = { failureRedirect: '/', successRedirect: '/app/' };

router.get('/github/redirect',
    passport.authenticate('github', authConfig)
);



module.exports = router;
