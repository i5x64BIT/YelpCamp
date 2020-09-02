const express = require('express'),
	router = express.Router();

router.use((req, res, next) => {
	res.locals.user = req.user;
	return next();
});

router.get('/', (req, res, next) => {
	// req.body.username = 'i5x64BITi';
	// req.body.password = '123123';
	// const xhr = new XMLHttpRequest();
	// xhr.open('POST', '/login', true);
	// xhr.setRequestHeader('Content-Type', 'application/json');
	// xhr.send();
	return res.render('landing');
});

module.exports = router;
