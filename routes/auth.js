const express = require('express'),
	router = express.Router(),
	passport = require('passport');

const User = require('../models/user');

router.get('/register', (req, res) => {
	res.render('register.ejs');
});
router.post('/register', (req, res) => {
	User.register(
		new User({
			username: req.body.username
		}),
		req.body.password,
		(err, user) => {
			if (err) {
				console.log(err);
				res.redirect('/register');
			} else
				passport.authenticate('local')(req, res, () => {
					res.redirect(req.session.redirectTo || '/campgrounds');
				});
		}
	);
});
router.get('/login', (req, res) => {
	res.render('login.ejs');
});
router.post(
	'/login',
	passport.authenticate('local', {
		failureRedirect: '/login'
	}),
	(req, res) => {
		let redirectTo = req.session.redirectTo;
		req.session.redirectTo = undefined;
		res.redirect(redirectTo || '/campgrounds');
	}
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
