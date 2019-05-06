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
    var login = "";
    var url = "";
    fs.mkdirSync("./avatars");

    for (i = 0; i < Array.length; i++) {
        login = "./avatars/" + Array[i].login + ".jpg";
        url = Array[i].avatar_url;
        console.log(login, url);
        downloadImageByURL(url, login);
    }
}

function downloadImageByURL(url, filePath) {
    request.get(url)
        .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", getImageURLs);


