var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            'Authorization': secret.GITHUB_TOKEN
        }
    };

    request(options, function(err, res, body) {
        if (err) throw err;
        cb(JSON.parse(body));
    });
}

var getImageURLs = function(Array) {
    for (i = 0; i < Array.length; i++) {
        console.log(Array[i].avatar_url)
    }
}

function downloadImageByURL(url, filePath) {
    request.get(url)
    .on('response', function (response) {                           
        console.log(response.headers);
      })
        .pipe(fs.createWriteStream(filePath));
}

// getRepoContributors("jquery", "jquery", getImageURLs);

downloadImageByURL("https://avatars0.githubusercontent.com/u/1615?v=4", './downloaded.jpeg')