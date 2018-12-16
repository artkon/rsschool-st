const router = require('express').Router();

// const authCheck = (req, res, next) => {
//     if(req.user) {
//         res.redirect('/app');
//     } else {
//         next();
//     }
// }

router.get('/', (req, res) => {
    // res.sendFile(path('/public/index.html'));
});

module.exports = router;
