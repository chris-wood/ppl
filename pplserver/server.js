// Import required modules.
var express = require('express');
// var stormpath = require('express-stormpath');
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/ppl')

var AuthorSchema = {
	name:String,
	affl:String,
	email:String,
	phone:String
}

var VenueSchema = {
	name:String,
	publisher:String,
	day:Number,
	month:Number,
	year:Number
}

var PaperSchema = {
	title:String,
	authors:[AuthorSchema],
	venue: VenueSchema
}

var UserSchema = {
	name:String,
	alias:String,
	email:String
}

var ReviewSchema = {
	paper_id:Number,
	user:UserSchema,
	summary:String
}

var Papers = mongoose.model('Papers', PaperSchema, 'papers');
var Reviews = mongoose.model('Reviews', ReviewSchema, 'reviews');

// Initialize our Express app.
var app = express();

// Configure Stormpath.
// var stormpathMiddleware = stormpath.init(app, {
//   apiKeyFile: '/Users/caw/.stormpath/apiKey.properties',
//   application: 'https://api.stormpath.com/v1/applications/3ow3opGnLNWjwhTYQwd014',
//   secretKey: 'RANDOMTHINGMKAYOKAY',
//   expandCustomData: true,
//   enableForgotPassword: true
// });

// app.use(stormpathMiddleware);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Handle routes here
var baseURI = "/v1/";
var papersURI = baseURI + "papers/";
var reviewsURI = papersURI + "reviews/";
var authorsURI = baseURI + "authors/";
var venuesURI = baseURI + "venues/";

// Generate a simple home page.
app.get('/', function(req, res) {
  res.redirect(baseURI);
});

app.get(baseURI, function(req, res) {
	console.log("Welcome home...");
	res.json({msg: "Welcome home..."});
});

app.get(papersURI, function(req, res) {
	console.log("Getting papers...");

	Papers.find({}, function(err, papers) {
		var paperMap = {};

		papers.forEach(function(paper) {
			paperMap[paper._id] = paper;
		});

		res.json(paperMap);
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
