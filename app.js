 var express = require("express");
 var logfmt = require("logfmt");
var app = module.exports =  express();
 var url = require('url');
 var pg = require('pg');
var http = require('http');
var path = require('path');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// app.use(logfmt.requestLogger());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

  // var connectionString = process.env.DATABASE_URL ||  "postgres://yjluvfzfeipgtt:H6c46uR71OrqAytEjwV5FtaMwY@ec2-107-22-163-140.compute-1.amazonaws.com:5432/d9ln0vulna1mlo"

var params = { host: 'ec2-107-22-163-140.compute-1.amazonaws.com',user: 'yjluvfzfeipgtt',password: 'H6c46uR71OrqAytEjwV5FtaMwY',database: 'd9ln0vulna1mlo', ssl: true };
var client = new pg.Client(params);
client.connect();
client.query('CREATE TABLE IF NOT EXISTS soildata (id SERIAL PRIMARY KEY, reading INTEGER, user_id INTEGER, plant_id INTEGER, redline INTEGER, isdry Boolean)');
client.query('INSERT INTO soildata(reading, user_id, plant_id, redline, isdry) VALUES(750, 1, 1, 800, false)');
client.query('INSERT INTO soildata(reading, user_id, plant_id, redline, isdry) VALUES(600, 1, 2, 1000, false)');
client.query('INSERT INTO soildata(reading, user_id, plant_id, redline, isdry) VALUES(900, 1, 1, 800, true)');

query = client.query('SELECT * FROM soildata WHERE plant_id = 2', function(err, result){
  // console.log(result);
  console.log(result.rows);
});
query.on('end', function() { client.end(); });





app.get('/', function(req, res){
res.send("hello world");
  // var connectionString = "postgres://yjluvfzfeipgtt:H6c46uR71OrqAytEjwV5FtaMwY@ec2-107-22-163-140.compute-1.amazonaws.com:5432:/d9ln0vulna1mlo";
  // var client = new pg.Client(connectionString);
  // client.connect(connectionString, function(err, client, done) {
  //   console.log('hello');
  //   console.log(client);
  //    client.query('SELECT * FROM your_table', function(err, result) {
  //       done();
  //       if(err) return console.error(err);
  //       console.log(result.rows);
  //       res.send(result.rows);
  //    });
  // });
});


 http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});












