// Import required modules.
var express = require('express');
var stormpath = require('express-stormpath');
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
	day:Number
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

var ReviewSchema = s{
	paper_id:Number,
	user:UserSchema,
	summary:String
}

var Paper = mongoose.model('Paper', PaperSchema, 'papers');
var Review = mongoose.model('Review', ReviewSchema, 'reviews');

// Initialize our Express app.
var app = express();

// Configure Stormpath.
var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: '/Users/caw/.stormpath/apiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/3ow3opGnLNWjwhTYQwd014',
  secretKey: 'RANDOMTHINGMKAYOKAY',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Handle routes here

// Generate a simple home page.
app.get('/', function(req, res) {
  res.redirect(qotdURI);
});

