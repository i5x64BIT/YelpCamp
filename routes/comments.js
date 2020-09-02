const Campground = require('../models/campground');

const express = require('express'),
	router = express.Router({ mergeParams: true }),
	flash = require('express-flash-messages');

router.use(flash());

const Comment = require('../models/comment'),
	{ isLoggedIn, checkCommentOwnership } = require('../middleware');

//new
router.get('/new', isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new.ejs', { camp: foundCampground });
		}
	});
});
//create
router.post('/', isLoggedIn, (req, res) => {
	Comment.create(req.body.comment, (err, comment) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			comment.author.id = req.user._id;
			comment.author.username = req.user.username;
			comment.save();
			Campground.findById(req.params.id, (err, camp) => {
				if (err) {
					console.log(err);
				} else {
					camp.comments.push(comment);
					camp.save();
					res.redirect(`/campgrounds/${camp.id}`);
				}
			});
		}
	});
});
//edit
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if (err) {
			return console.log(err);
		}
		res.render('comments/edit', { camp_id: req.params.id, foundComment: foundComment });
	});
});

//Update
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
		if (err) {
			console.log(err);
		}
		res.redirect(`/campgrounds/${req.params.id}`);
	});
});
//Delete
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampgrond) => {
		if (err) {
			return console.log(err);
		}
		Comment.findByIdAndDelete(req.params.comment_id, (err) => {
			if (err) {
				return console.log(err);
			}
			for (let i = 0; i < foundCampgrond.comments.length; i++) {
				if (foundCampgrond.comments[i] === req.params.comment_id) {
					return foundCampgrond.comments.splice(i, 1);
				}
			}
			res.redirect(`/campgrounds/${req.params.id}`);
		});
	});
});

module.exports = router;
