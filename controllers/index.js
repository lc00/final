// We also will be using our User model
var User = require('../models/user');

// Simple index controller
var indexController = {

  // Handle incoming requests for the '/' route
  index: function(req, res){

    // Since this route requires authentication,
    // called out in app.js, we have access to the
    // logged-in user's document from the database
    // via the injected "req.user" variable
    res.render('index', {
      user: req.user
    });
  }, 
  newBall: function(req, res){

    // new ball information
    var ball = { top: req.body.top,
                left: req.body.left
                };

    User.findOne({username: 'qq'}, function(error, result){
      result.tablelist.push({ball:ball});
      result.save();
    })




    res.send({ 
      ball: ball
    })


  }

};

// Export our index control
module.exports = indexController;