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


    // see if the user has saved table(s);
    // if user is logged in and there is saved table(s), render the Practice Shots page
    // else render the Add Shots page
    if (req.user){
      var username = req.user.username;
      User.findOne({username: username}, function(error, result){
        if(error){
          console.log(error)
        }
        else{
          if( result.tablelist.length !== 0 ){
            res.render('practiceShots',{
              user: req.user,
              tablelist: result.tablelist
            });
          }
          else{
            res.render('addShots', {
              user: req.user
            })
          }

        }

      })
    }

    // this is rendering the default index page 
    else{
      res.render('index', {
        user: req.user
      })
    }

  },



  addShots: function(req, res){
    // console.log(req.user.username)
    res.render('addShots', {
      user: req.user
    });

  },
  newTable: function(req, res){

    var username = req.user.username;

    var level = req.body.level;

    var category = req.body.category;

    var title = req.body.form_data.title;

    var note = req.body.form_data.note;

    var array = JSON.parse(req.body.array);

    User.findOne({username: username}, function(error, user){
      if(error){
        console.log(error)
      }
      else{
        user.tablelist.push({title: title, note: note, level: level, category: category, array: array }) 
        user.save();
        res.send({ 
          result: [title, note, level, category, array]
        });
      }
        
    });

  },
  practiceShots: function(req, res){

    var username = req.user.username;

    User.findOne({username: username}, function(error, result){
      if(error){
        console.log(error);
      }
      else{
        res.render('practiceShots',{
          user: req.user,
          tablelist: result.tablelist
        });
      }

    })

  }



};

// Export our index control
module.exports = indexController;