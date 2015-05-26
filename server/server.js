var express = require('express');
//var fetchTitle = require('./fetch-title');
var app = module.exports.app = exports.app = express();

app.use(require('connect-livereload')());


// Static Content
app.use('/js',        staticAppDir('js'));
app.use('/dist',      express.static(__dirname + '/../dist'));
//app.use('/css',       staticAppDir('css'));
//app.use('/partials',  staticAppDir('partials'));
//app.use('/templates', staticAppDir('templates'));
//app.use('/sandbox', staticAppDir('sandbox'));


app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: __dirname + '/../app' });
});

app.listen(3007, '0.0.0.0'); //the port you want to use



// build relative path from this script to app folder: ../app/<dir>
function appDir(dir){
  return __dirname + '/../app/' + dir;
}

// serve a static folder:  ../app/<dir>
function staticAppDir(dir){
  return express.static(appDir(dir));
}
