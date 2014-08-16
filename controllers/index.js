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
  newTable: function(req, res){
    var username = req.body.user;
    var title = req.body.title;
    // new ball information
    // var ball = { 
    //   type: req.body.circle.typeOfBall,
    //   top: req.body.circle.top,
    //   left: req.body.circle.left
    // };

    User.findOne({username: username}, function(error, result){
      // result.tablelist.table.push({balls:ball});
      // result.tablelist.push({title: title, ball:[ {top: 30, left: 60} ] })
      // result.tablelist.push({table: ball})
      result.tablelist.push({title: title, balls:[ {top: 10, left: 10} ] })

      result.save();
    })


    res.send({ 
      result: title
    });


  }

};

// Export our index control
module.exports = indexController;