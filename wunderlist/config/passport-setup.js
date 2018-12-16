const passport = require('passport');
const GithubStrategy = require('passport-github2');
const LocalStrategy = require('passport-local');
const config = require('./');
const User = require('../models/user').User;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user) ;
    });
});

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ "username": username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.checkPassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
        return done(null, user);
    });
}))

passport.use(new GithubStrategy({
        clientID: config.get('github:id'),
        clientSecret: config.get('github:secret'),
        callbackURL: 'http://127.0.0.1:3000/auth/github/redirect'
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({githubId: profile.id}).then((currentUser) => {
            if(currentUser) {
                console.log('user allready exists. Here is: ', currentUser);
                done(null, currentUser);
            } else {
                new User({
                    githubId: profile.id,
                    githubUserName: profile.username,
                }).save().then((newUser) => {
                    console.log('new user created' + newUser);
                    done(null, newUser);
                })
            }
        })
}));

module.exports = passport;

// http://127.0.0.1:3000/auth/github/redirect
// id: 3e0f30fc6e96d7f9da1a
// secret: 52cb57224430e87273cd82d049af09b4bf3010c8