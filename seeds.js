var mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment');

const seeds = [
	{
		name: "Cloud's Rest",
		image: 'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg',
		desc:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
	},
	{
		name: 'Desert Mesa',
		image: 'https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg',
		desc:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
	},
	{
		name: 'Canyon Floor',
		image: 'https://farm1.staticflickr.com/189/493046463_841a18169e.jpg',
		desc:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
	}
];
async function seedDB() {
	try {
		await Campground.remove({});
		console.log('campgrounds wiped');
		await Comment.remove({});
		console.log('comments wiped');

		// for (seed of seeds) {
		// 	let campground = await Campground.create(seed);
		// 	console.log('Campgroudn created');
		// 	// let comment = await Comment.create({
		// 	// 	body: 'blah blah blah',
		// 	// 	author: 'Homer'
		// 	// });
		// 	// console.log('comment created');

		// 	// campground.comments.push(comment);
		// 	// campground.save();
		// 	// console.log('comment is assingned and saved');
		// }
	} catch (error) {
		console.log(error);
	}
}

module.exports = seedDB;
