const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.get('/', function(req, res) {
  res.send('Main page');
});

app.listen(port);
console.log('Server started on port' + port);

module.exports = app;
