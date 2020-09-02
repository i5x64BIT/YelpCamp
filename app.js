const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	session = require('express-session'),
	path = require('path'),
	methodOverride = require('method-override'),
	flash = require('express-flash-messages');

const seedDB = require('./seeds'),
	User = require('./models/user');

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());

app.use(
	session({
		secret: 'wefg12Cf',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();

//Routes
app.use(require('./routes/index'));
app.use('/campgrounds', require('./routes/campgrounds'));
app.use('/campgrounds/:id/comments', require('./routes/comments'));
app.use(require('./routes/auth'));

app.listen(80, '192.168.1.22', () => {
	console.log('Listening on port 80');
});
