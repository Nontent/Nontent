const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware')


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth/', require('./routes/authRoutes'))
app.use(errorHandler)

var server = app.listen(5000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

module.exports = server
