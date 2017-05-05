// Import Node Dependencies
var connection = require('./connection.js');
var moment = require('moment');



// Connect to MySQL database
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  };
  console.log('connected as id ' + connection.threadId);
});




// Methods for MySQL commands
var orm = {

  // selectAll()
  selectAll: function(callback) {

    // Run MySQL Query
    connection.query('SELECT * FROM burgers', function (err, result) {
      if (err) throw err;
      callback(result);
    });

  },

  // insertOne()
  insertOne: function(burger_name, callback){

    // Create a new timestamp
    var timestamp = moment().format('YYYY-DD-MM HH:mm:ss');

    // Run MySQL Query
    connection.query('INSERT INTO burgers SET ?', {
      burger_name: burger_name,
      devoured: false,
      date_time: timestamp
    }, function (err, result) {
      if (err) throw err;
      callback(result);
    });

  },

  // updateOne()
  updateOne: function(burgerID, callback){

    // Run MySQL Query
    connection.query('UPDATE burgers SET ? WHERE ?', [{devoured: true}, {id: burgerID}], function (err, result) {
        if (err) throw err;
        callback(result);
      });

  }

};



// Export the ORM object in module.exports.
module.exports = orm;
