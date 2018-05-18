#Liri Node App
This is a CLI application that takes in commands, and uses APIs from Twitter, Spotify, and OMDB. 
## Use
To use this application, you must clone the repo, then open the directory in your command line. There are several commands you can then enter:
* `node liri.js movie-this "Movie Title"` replacing "Movie Title" with whatever movie you want will return information on that movie, such as release date, cast, Rotten Tomatoes rating, and more
* `node liri.js spotify-this-song "Song Title"` replacing "Song Title" with whatever song you want will return the artist, the song, a Spotify link, and the album
* `node liri.js my-tweets` will return your tweets to the console
* `node liri.js do-what-it-says` will execute whatever is in the random.txt file
## Built With
* [File-System](https://www.npmjs.com/package/file-system "File-System NPM")
* Node
* [Node Spotify API](https://www.npmjs.com/package/node-spotify-api "Node-Spotify-Api")
* [Request](https://www.npmjs.com/package/request "Request NPM")
* [Twitter](https://www.npmjs.com/package/twitter "Twitter NPM")
## Developers
* Wenona Frankwich