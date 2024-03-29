const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',  (req,res) => {
  res.render('login');
});


//auth logout
router.get('/logout', (req,res)=>{
  // handle with hpassport
  res.send('loggin out');
})

// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached the redirect URI');
});

module.exports = router;
