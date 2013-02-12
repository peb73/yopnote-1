
/**
 * Module dependencies.
 */

require('./response');
var fs = require('fs');
var CONFIG = require('config').YopnoteAPI;

var express = require('express')
  , app = module.exports = express()

var date = new Date();
var logFile = fs.createWriteStream('./log/access.'+date.getFullYear()+"."+(1+date.getMonth())+"."+date.getDate()+'.log', {flags: 'a'});

app.configure(function(){
  app.use(express.logger({stream: logFile}));
//  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(app.router);

});

app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
  app.use(express.errorHandler({}));
});

//Montage de l'api REST sur /
app.use('/', app.bookmarks_app = require('./yopnote-restAPI')());

if (module.parent === null) {
  app.listen(CONFIG.appPort);
  //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  console.log("Express server start");
}