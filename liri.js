// requiring node packages
require('dotenv').config();
var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify.credentials.id);

// putting terminal inputs into variables
var command = process.argv[2];
var secondCommand = process.argv[3];

var commands = {
	'movie-this': secondCommand,
	'spotify-this-song': secondCommand,
	'my-tweets': secondCommand,
	'do-what-it-says': secondCommand
}

//commands[command]();