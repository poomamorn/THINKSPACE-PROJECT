var express = require ('express');
var app = express ();
var http = require('http').Server(app);
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/Data';


app.use(bodyParser.json());


app.get('/', function(req, res){
    // res.sendfile('public/home.html');
    res.sendFile(__dirname + '/public/home.html');
});



app.get('/books/:name', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        console.log(req.params.name);
        if (err) {
            return res.send({
                'status' : 1,
                'message' : err
            });
        } else {
            var collection = db.collection('books');
            collection.findOne({
                'name' : req.params.name
            }, function (err, doc) {
                if (err) {
                    return res.send({
                        'status' : 1,
                        'message' : err
                    });
                } else if (doc != null) {
                    console.log('Found ' + req.params.name + '.');
                    return res.send({
                        'status' : 0,
                        'message' : 'product found',
                        'user' : doc,

                    });
                } else {
                    console.log('Can not find ' + req.params.name + '.');
                    return res.send({
                        'status' : 2,
                        'message' : 'product not found'
                    });
                }
                db.close();
            });
        }
    });
});


app.use(express.static(path.join(__dirname,'public')));

http.listen(3000, function () {
    console.log('listening on 3000');
});
