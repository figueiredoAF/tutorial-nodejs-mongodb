var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Users. */
router.get('/userlist', function(req, res){
  var db = require('../db');
  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  Users.find({}).lean().exec(function(err, docs){
    if(err){
      console.log('ERROR FINDING USERS');
      return;
    }
    console.log('USERS:', docs);
    res.render('userlist', {"userlist": docs});
  });

});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to register a new User */
router.post('/adduser', function(req, res){
  var db = require('../db');
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
  var newUser = new Users({username: userName, email: userEmail});
  newUser.save(function(err){
    if(err){
      console.log('Error registering user: ' + err.message);
      return err;
    }
    else {
      console.log('User registered');
      res.redirect('userlist');
    }
  });
});


module.exports = router;
