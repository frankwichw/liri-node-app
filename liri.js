// requiring node packages
require('dotenv').config();
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');

// requiring keys.js to access api keys
var keys = require('./keys.js');

// generating spotify and twitter objects
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//console.log(spotify.credentials.id);

// omdb api key
var omdbAPI = "22ef53e6";

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
			// creating query URL
			var queryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=" + omdbAPI;
			
			request(queryURL, function(error, response, body) {

				if (!error && response.statusCode === 200) {
				  	console.log("Title: " + JSON.parse(body).Title);
				    console.log("Release: " + JSON.parse(body).Year);
				    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				    console.log("Country: " + JSON.parse(body).Country);
				    console.log("Language: " + JSON.parse(body).Language);
				    console.log("Plot: " + JSON.parse(body).Plot);
				    console.log("Actors: " + JSON.parse(body).Actors);
				}
			});
		} else {
			var mrNobodyURL = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=" + omdbAPI;
			request(mrNobodyURL, function(error, response, body) {
	
				if (!error && response.statusCode === 200) {
				    console.log("Title: " + JSON.parse(body).Title);
				    console.log("Release: " + JSON.parse(body).Year);
				    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
				    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
				    console.log("Country: " + JSON.parse(body).Country);
				    console.log("Language: " + JSON.parse(body).Language);
				    console.log("Plot: " + JSON.parse(body).Plot);
				    console.log("Actors: " + JSON.parse(body).Actors);
				} 
			});
		}
	},
	'spotify-this-song': function(){
		if(secondCommand){
			spotify.search({ type: 'track', query: secondCommand, limit: 1}, function(err, data) {
    			if ( err ) {
        			console.log('Error occurred: ' + err);
        			return;
    			}
    			console.log("Artist: " + data.tracks.items[0].artists[0].name);
    			console.log("Song: " + data.tracks.items[0].name);
    			console.log("Spotify: " + data.tracks.items[0].external_urls.spotify);
  				console.log("Album: " + data.tracks.items[0].album.name);
			});
		} else {
			console.log("Please enter a song!");
		}
	},
	'my-tweets': function(){
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
			if (!error) {
    			// for loop to run through the tweets object and grab information to print to console
    			for(var i = 0; i < 20; i++){
    				console.log(tweets[i].text, "--", tweets[i].created_at);
    			}
  			}
		});
	},
	'do-what-it-says': function(){
		fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
  		}
  		// splitting data at the comma to grab the individual commands
  		var dataCommands = data.split(",");
  		// putting data in variables
  		var propertyCall = dataCommands[0];
  		var methodCall = dataCommands[1];
  		// calling function with the this keyword
  		secondCommand = methodCall;
  		liriCommands[propertyCall]();
		})
	}
}

// calling function through the object from the process.argv inputs
liriCommands[command]();
