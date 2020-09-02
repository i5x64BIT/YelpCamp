const Campground = require('../models/campground'),
	Comment = require('../models/comment');

const express = require('express'),
	router = express.Router({ mergeParams: true }),
	flash = require('express-flash-messages');

router.use(flash());
module.exports = {
	isLoggedIn: (req, res, next) => {
		if (!req.user) {
			req.session.redirectTo = req.originalUrl;
			req.flash('warning', 'Please login first');
			return res.redirect('/login');
		}
		return next();
	},
	checkCommentOwnership: (req, res, next) => {
		if (req.isAuthenticated()) {
			Comment.findById(req.params.comment_id, (err, foundCommet) => {
				if (err) {
					return console.log(err);
				}
				if (!foundCommet.author.id.equals(req.user.id)) {
					req.flash('danger', 'You cant do that!');
					return res.redirect('back');
				}
				return next();
			});
		} else {
			req.flash('warning', 'Please login first');
			res.redirect('back');
		}
	},
	checkCampgroundOwnership: (req, res, next) => {
		if (req.isAuthenticated()) {
			Campground.findById(req.params.id, (err, foundCamp) => {
				if (err) {
					console.log(err);
				}
				if (!foundCamp.author.id.equals(req.user.id)) {
					req.flash('danger', 'You cant do that!');
					return res.redirect(`/campgrounds/${foundCamp.id}`);
				}
				next();
			});
		} else {
			req.flash('warning', 'Please login first');
			res.redirect('back');
		}
	}
};
