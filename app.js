
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var engines = require('consolidate');

//setup mongodb
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://public:public1234@ds061228.mongolab.com:61228/mongo-shared');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);

// task routes
app.get('/api/tasks', routes.tasks(db))
app.post('/api/tasks/save', routes.saveTask(db))
app.post('/api/tasks/delete', routes.deleteTask(db))


//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port'));
});