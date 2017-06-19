var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();
var bodyparser = require('body-parser');
var mongoose =require('mongoose');
var Items = require("./models/Items");

mongoose.connect("mongodb://localhost:27017/items");

var connection = mysql.createConnection({
	host :'localhost',
	user :'root',
	password : ''
});

connection.query('USE items');

app.set('port',3000);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyparser.urlencoded({ extended: false }));

app.get('/',function(req,res){
	connection.query('select * from item', function(err,rows){
		res.render('shoppingcart',{items:rows});
	});

});

app.get('/additem',function (req,res){
	res.render('additem');
});

app.post('/add', function(req,res){
	
	var data = {
		itemno: req.body.itemno,
		name: req.body.name,
		quantity: req.body.quantity
	};
	
	connection.query('INSERT INTO item SET ?', data, function(err,res){
	if(err)throw err;
	});
	
	res.redirect('/');
});


app.get('/delete1/:id', function (req,res){
	var tid=req.params.id;
	connection.query('DELETE FROM item where itemno=?',[tid], function(err,rows){
		if(err)
			console.log('Error Selecting ',err);
	});
	
	res.redirect('/');
});


//////////////////////////////////////

app.get('/m',function(req,res){
	Items.getAllItems(function(err,students){
		if (err){
			console.log(err);
		}

		res.render('shoppingcart',{items: students});
	});
	
});

app.post('/addItemM',function(req,res){
	var newItem = new Items({
		itemno : req.body.name,
		name : req.body.name,
		quantity: req.body.quantity
	});

	Items.addItem(newItem,function (err,student) {
		if (err){
			console.log(err);
		}

		res.redirect('/m');
	});
});

app.get('/removeStudent/:id', function(req,res){
	
	console.log(req.params.id);
	Items.deleteStudent(req.params.id,function(err,student){
		if (err){
			console.log(err);
		}

		res.redirect('/m');
	});
});

app.listen(app.get('port'));
console.log('~~~Server Runnign on port localhost:'+app.get('port')+'~~~');