const express = require('express');
const app = express();
const cors=require('cors');
// var port = 2020;
const morgan = require('morgan');
const path = require('path');

const config = require('./configs');
require('./db');
app.use(morgan('dev'));
app.use(cors());

const API_Route = require('./route/api.route');




var pug = require('pug');
app.set('view engine', pug);
app.set('views', path.join(__dirname, 'views'));



app.use(express.static('images'));
app.use('/amrit', express.static(path.join(__dirname, 'images')));



app.use(express.urlencoded({
    extended: true,

}))

app.use('/api', API_Route);

app.use(function (req, res, next) {
    next({
        msg: 'not found',
        status: 404
    })
})

app.use(function (error, req, res, next) {
    res
    .status(error.status||400)
    .json({
        msg: error.msg || error,
        status: error.status || 400
    })
});

app.listen(config.port, function (err, done) {
    if (err) {
        console.log('error');
    }
    else {
        console.log('app listen at port ' + config.port);
    }
});