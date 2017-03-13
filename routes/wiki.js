const models = require('../models');
const express = require('express'); 
const router = express.Router(); 



var Page = models.Page; 
var User = models.User; 

router.get('/', function(req,res){
	//res.redirect('/');
	console.log("Posting wiki bitch")
})

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
 
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save();
  // -> after save -> res.redirect('/');
  res.redirect('/');
});

router.get('/add', function(req, res){
	res.render('addpage', {noCache: true})
})


module.exports = router; 