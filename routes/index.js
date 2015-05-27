var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : "root",
  password : "",
  database : 'test'
});
connection.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendfile(__dirname + '/public/index.html');
});

router.get("/getData", function(req,res,next){
	
	connection.query('CALL GetAllProducts();', function(err, rows, fields) {
	  	if (!err){
	  		res.json(rows[0])
	    	//res.end();
	  	}
	  	else
	    	console.log('Error while performing Query.');
	});
});

router.post('/addUser', function(req, res, next){
	var myParams =  "'"  + req.body.name + "','" + req.body.city + "','" + req.body.designation + "'";
	connection.query('CALL sp_insert_data('+myParams+')', function(err, rows, fields) {
	  	if (!err){
	    	res.json(rows)
	    	//res.end();
	  	}
	  	else
	    	console.log('Error while performing Query.');
	});
});


router.post('/getDataById', function(req, res, next){
	var myParams = "'" + req.body.id + "'";
	connection.query('CALL sp_get_data_by_id('+myParams+')', function(err, rows, fields) {
	  	if (!err){
	  		console.log(rows);
	    	res.json(rows)
	    	//res.end();
	  	}
	  	else
	    	console.log('Error while performing Query.');
	});
})

router.post('/updateUser', function(req, res, next){
	var myParams = "'" + req.body.userId + "'" + req.body.name + "','" + req.body.city + "','" + req.body.designation + "'";
	connection.query('CALL sp_update_data('+myParams+')', function(err, rows, fields) {
	  	if (!err){
	    	res.json(rows)
	    	//res.end();
	  	}
	  	else
	    	console.log('Error while performing Query.');
	});
});

module.exports = router;