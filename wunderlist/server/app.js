const express = require('express');
require('./config/mongoose-setup');
const cookieSession = require('cookie-session');
const http = require('http');
const config = require('config');
const path = require('path');
const passport = require('passport');
const cors = require('cors');

require('./config/passport-setup');
const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/app');
const apiRoutes = require('./routes/api');

const app = express();

const corsOptions = {
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(require('cookie-parser')());

app.use(cookieSession({
    maxAge: config.get('cookie:maxAge'),
    keys: [config.get('cookie:key')]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/app', appRoutes);

const isAuthenticated = (req, res, next) => {
    req.user ? next() : res.status(403).json('You are not authorized. Please, login first!')
}
app.use('/api', isAuthenticated, apiRoutes);


app.use(function(req, res){
    res.status(404);
    if (req.accepts('html')) {
        res.redirect('/404.html')
        return;
    }
  });


http.createServer(app).listen(config.get('port'));


module.exports = app;
