// requiring node packages
require('dotenv').config();
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// requiring keys.js to access api keys
var keys = require('./keys.js');

// generating spotify and twitter objects
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//console.log(spotify.credentials.id);

// omdb api key
var omdbAPI = "22ef53e6";

var queryURLomdb = "";

// putting terminal inputs into variables
var command = process.argv[2];
var secondCommand = process.argv[3];

// twitter 
var params = {screen_name: 'WFrankwich', statuses_count: 20};

// object to hold command functions
var liriCommands = {
	'movie-this': function(){
		if(secondCommand){
			// replacing spaces with plus signs
			var movieTitle = secondCommand.replace(" ", "+");
			console.log(movieTitle);
		} else {
			console.log("Nope!");
		}
	},
	'spotify-this-song': function(){
		if(secondCommand){
			spotify.search({ type: 'track', query: secondCommand, limit: 1}, function(err, data) {
    			if ( err ) {
        			console.log('Error occurred: ' + err);
        			return;
    			}
 
    			console.log(JSON.stringify(data));
    			console.log(data.tracks.name); 
			});
		} else {
			console.log("Please enter a song!");
		}
	},
	'my-tweets': function(){
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
    			//console.log(tweets);
    			for(var i = 0; i < 20; i++){
    				console.log(tweets[i].text, "--", tweets[i].created_at);

    			}
  			}
		});
	},
	'do-what-it-says': function(){
		if(secondCommand){
			console.log("Yes!");
		} else {
			console.log("Nope!");
		}
	}
}

// calling function from object
liriCommands[command]();