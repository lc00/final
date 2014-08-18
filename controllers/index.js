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
  addShots: function(req, res){
    // console.log(req.user.username)
    res.render('addShots', {
      user: req.user
    });

  },
  newTable: function(req, res){

    var username = req.user.username;

    var title = req.body.form_data.title;

    var note = req.body.form_data.note;

    var array = JSON.parse(req.body.array);

    User.findOne({username: username}, function(error, user){
      if(error){
        console.log(error)
      }
      else{}
        user.tablelist.push({title: title, note: note, array: array }) 
        user.save();
        res.send({ 
          result: [title, note, array]
        });
        
    });

  },
  practiceShots: function(req, res){

    var username = req.user.username;

    User.findOne({username: username}, function(error, user){
      if(error){
        console.log(error);
      }
      else{
        var arrayOfTables = user.tablelist;
        var tables = arrayOfTables.map(function(table){
          var result = [];
          for(var i=0; i< arrayOfTables.length; i++){
            result.push(table.array[i].location.top)
          }


          return result

         // { 
            // title: table.title, 
            // type: table.array.typeOfBall
            // top: table.array.location.top,
            // left: table.array.location.left

          // }


            // table.title
            // table.array.typeOfBall
            // table.array.location.top
            // table.array.location.left  
        });

        res.render('practiceShots',{
          user: req.user,
          tables: tables
          });
      }

    });

      


  }

};

// Export our index control
module.exports = indexController;