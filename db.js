var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : "",
  password : "",
  database : 'test'
});

connection.connect();

connection.query('SELECT * from testdata', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});

connection.end();