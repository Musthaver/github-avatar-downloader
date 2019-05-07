var request = require("request");
var secret = require("./secrets");
var fs = require("fs");
var owner = process.argv[2];
var repo = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url:
      "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      Authorization: secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    if (err) throw err;
    cb(JSON.parse(body));
  });
}

// var getImageURLs = 

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

if (!owner || !repo) {
  console.log("please provide the repo owner and the repo name");
  process.exit();
} else {
  getRepoContributors(owner, repo, function(Array) {
    var login = "";
    var url = "";
    fs.mkdirSync("./avatars"); //make the avatar director within the current directory
  
    for (i = 0; i < Array.length; i++) {
      login = "./avatars/" + Array[i].login + ".jpg";
      url = Array[i].avatar_url;
      downloadImageByURL(url, login);
    }
  });
}
