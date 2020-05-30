const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const express = require('express');
const app      = express();

app.use('/public', express.static(__dirname + '/public'));

app.use (function (req, res, next) {
	if (req.secure) {
    	next();
    } else {     
    	res.redirect('https://' + req.headers.host + req.url);
    }
});


const hostname = '198.199.95.122';
// const hostname = '192.168.1.88';

app.get('/',function(req,res) {
  res.sendFile(__dirname + '/index.html');
});


app.get('/filter',function(req,res) {
  res.sendFile(__dirname + '/filter.html');
});

app.get('/tbyool',function(req,res) {
  res.sendFile(__dirname + '/tbyool.html');
});

app.get('/sat',function(req,res) {
  res.sendFile(__dirname + '/sat.html');
});

app.get('/irr',function(req,res) {
  res.sendFile(__dirname + '/irr.html');
});

app.get('/irrfilter',function(req,res) {
  res.sendFile(__dirname + '/irrfilter.html');
});

app.get('/.well-known/acme-challenge/Ig46qRj9a5SP1MK5jC0vqdwKXn-Ikv2F6aXtuMpjCkE',function(req,res) {
  res.sendFile(__dirname + '/.well-known/acme-challenge/Ig46qRj9a5SP1MK5jC0vqdwKXn-Ikv2F6aXtuMpjCkE.txt');
});

app.get('/.well-known/acme-challenge/XIY61zlj8737nSPZQnAlmq7q4bTtL6BALI7J3V_kckA',function(req,res) {
  res.sendFile(__dirname + '/.well-known/acme-challenge/XIY61zlj8737nSPZQnAlmq7q4bTtL6BALI7J3V_kckA.txt');
});


https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/hamptonator.com/privkey.pem','utf8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/hamptonator.com/fullchain.pem', 'utf8'),
  ca: fs.readFileSync('/etc/letsencrypt/live/hamptonator.com/chain.pem', 'utf8')
},app).listen(3000);

http.createServer(app).listen(8080);