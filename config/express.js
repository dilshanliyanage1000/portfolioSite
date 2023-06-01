var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

module.exports = function () {
    var app = express();
    
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));

    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    //setting up view folder
    app.set('views', './app/views');

    //setting up EJS engine
    app.set('view engine', 'ejs');

    //setting up routes for all tabs
    app.use('/', require('../app/routes/index.server.routes.js'));
    
    //setting up static files
    app.use(express.static('./public'));
    app.use(express.static("./node_modules"));

    //return app
    return app;
};