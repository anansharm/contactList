var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('mongodb://root:nkudu4yb@ds011248.mlab.com:11248/contactlist', ['contactlist']);



var bodyParser = require('body-parser');

var port = Number(process.env.PORT || 3000);

// app.get('/', function(req, res){

// 	res.send('Hello World');

// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
	console.log('I recieved a request');

 // var contactList = [{"name":"Anand","email":"anand@imdb.com","phone":"(111) 111-1111"},
 //                    	  {"name":"Phillip","email":"phillip@imdb.com","phone":"(222) 222-2222"},
 //                    	  {"name":"Reyes","email":"reyes@imdb.com","phone":"(333) 333-3333"}];
 //    res.json(contactList);
 db.contactlist.find(function(err, docs){
 	console.log(docs);
 	res.json(docs);
 });

});

app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
		new: true}, function (err, doc){
			res.json(doc);
		

	});
});

app.listen(port);

console.log('Server running on port 3000');