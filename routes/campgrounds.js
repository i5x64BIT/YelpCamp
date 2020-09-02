const express = require('express'),
	router = express.Router();

const { isLoggedIn, checkCampgroundOwnership } = require('../middleware'),
	Campground = require('../models/campground');
const passport = require('passport');
const user = require('../models/user');

//Index
router.get('/', (req, res) => {
	Campground.find({}, (error, allCampgrounds) => {
		if (error) {
			console.log(error);
		} else {
			res.render('campgrounds/index.ejs', { camps: allCampgrounds });
		}
	});

	//res.render('campgrounds.ejs', { camps: camps });
});
//New
router.get('/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new.ejs', {});
});
//Create
router.post('/', isLoggedIn, (req, res) => {
	Campground.create(
		{
			name: req.body.campName,
			image: req.body.campUrl,
			author: {
				id: req.user.id,
				username: req.user.username
			},
			desc: req.body.campDcs
		},
		(err, newRec) => {
			if (err) {
				console.log(err);
			} else {
				res.redirect('/campgrounds');
			}
		}
	);
});
//Show
router.get('/:id', (req, res) => {
	Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
		if (err || !foundCampground) {
			res.redirect('back');
		} else {
			res.render('campgrounds/show', { camp: foundCampground, currentUser: req.user });
		}
	});
});
// //Show
// router.get('/:id', (req, res) => {
// 	Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			console.log('\n\n\n' + foundCampground);
// 			//res.render('campgrounds/show.ejs', { currentUser: req.user, camp: foundCampground });
// 		}
// 	});
//});

//edit
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/edit', { currentUser: req.user, camp: foundCampground });
		}
	});
});
//update
router.put('/:id', checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndUpdate(req.params.id, req.body.camp, (err) => {
		if (err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

router.delete('/:id', checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			res.redirect('/');
		} else {
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;
