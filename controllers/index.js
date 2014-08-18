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

    var title = req.body.form_data.title;

    var note = req.body.form_data.note;

    var array = JSON.parse(req.body.array);

    User.findOne({username: username}, function(error, result){
      result.tablelist.push({title: title, note: note, array: array })

      result.save();
    })

    res.send({ 
      result: [title, note, array]
    });

  },
  practiceShots: function(req, res){
    res.render('practiceShots',{
      success: "success"
    });

  }

};

// Export our index control
module.exports = indexController;