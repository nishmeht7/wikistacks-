const models = require('../models');
const express = require('express'); 
const router = express.Router(); 



var Page = models.Page; 
var User = models.User; 

router.get('/', function(req,res){
	//res.redirect('/');
	//console.log("Posting wiki bitch")

	Page.findAll({})
		.then(function(pages){
			for (let page of pages) {
			page.url = page.get("route");
			//console.log(page.url);
			//console.log(page.url); 
		}
			res.render('index', {pages: pages})
		})
})

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
 
 User.findAll({
 	where: {
 		email : req.body.email
 	}
 }).then(function(userArr){
 	let userFinalTry = userArr; 
 	if(!userArr.length){
 		  console.log("Making new User");
 		  var user = User.build({
		  name: req.body.name,
		  email: req.body.email
  		});
 		  user.save()
 		  .then(function(userInst){
 		  	userFinalTry = [userInst];
 		  	//console.log(userFinalTry);
 		  })
 	}
 	console.log(userFinalTry);
 	var page = Page.build({
    title: req.body.title,
    content: req.body.content,
    author: userArr[0].id
  });
 	  page.save()
	  .then(function(page){
	  	res.redirect(page.get("route"))
	  })

 })

 //  var page = Page.build({
 //    title: req.body.title,
 //    content: req.body.content
 //  });

 //  var user = User.build({
	// name: req.body.name,
	// email: req.body.email
 //  });

 //  // STUDENT ASSIGNMENT:
 //  // make sure we only redirect *after* our save is complete!
 //  // note: `.save` returns a promise or it can take a callback.
 //  user.save(); 
 //  page.save()
	//   .then(function(page){
	//   	res.redirect(page.get("route"))
	//   })
	  

 
  // -> after save -> res.redirect('/');
  //res.json(page)

  //res.redirect(page.route);
  //console.log(page.get("route"));
});

router.get('/add', function(req, res, next){
	res.render('addpage', {noCache: true})
})

router.get('/:url', function(req, res, next){
	var url = req.params.url;

	Page.findAll({
		where: {urlTitle: url}
	}).then(function(pages){
		// console.log(page.title);
		//res.json(pages);
		res.render('wikipage', {pages: pages});
	})
	.catch(next); 
	//console.log(pageUrl);
	//res.send();

})


module.exports = router; 