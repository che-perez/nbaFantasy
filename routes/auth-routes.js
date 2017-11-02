const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const userController = require('../controllers/users-controller');

authRouter.get('/login', authHelpers.loginRedirect, (req, res, next) => {
 res.render('auth/login', {auth: (req.user) ? true : false});
});

authRouter.get('/register', authHelpers.loginRedirect, (req, res) => {
 res.render('auth/register', {auth: (req.user) ? true : false});
});

authRouter.post('/register', userController.create);

authRouter.post('/login', passport.authenticate('local', {
 successRedirect: `/`,
 failureRedirct: '/auth/login',
 failureFlash: true,
})
);

authRouter.get('/logout', (req, res) => {
 req.logout();
 res.redirect('/');
});

module.exports = authRouter;

