
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

// Create `ExpressHandlebars` instance with a default layout.
hbs = handlebars.create({
    defaultLayout: 'main',
    // helpers      : helpers,

    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: ['views/partials/'] // ,'shared/templates/']
});

//Route to the js files
var index = require('./routes/index');
var contact = require('./routes/contact');
var packages = require('./routes/packages');
var search = require('./routes/searchpage');

//express
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
// app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// URLS that we can use in our html
app.get('/', index.view);
app.get('/contact', contact.view);
app.get('/packages', packages.view);
app.get('/searchpage', searchpage.view);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
