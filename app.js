const express = require('express');
var app = express(); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');
const wikiRouter = require('./routes/wiki.js')


app.use(morgan('dev')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/wiki', wikiRouter); 

var env = nunjucks.configure('views', {noCache: true});
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);


app.use(express.static('public'));

app.get('/', function(req, res){
	console.log("Got the Get");
	res.send("Wht's good");
}) 

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

