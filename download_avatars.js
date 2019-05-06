var request = require('request');
var secret = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
            'User-Agent': 'request',
            "Authorization": secret.GITHUB_TOKEN
        }
      };

request(options, function(err, res, body) {
    cb(JSON.parse(body));
  });
}
var getImageURLs = function(Array) {
    for (i = 0; i < Array.length; i++) {
        console.log(Array[i].avatar_url)
    }
}
getRepoContributors("jquery", "jquery", getImageURLs);