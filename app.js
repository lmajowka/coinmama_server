var express = require('express')
  , http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);


const port = 3001

const CoinCap = require('./exchanges/coincap');
const CoinsLive = require('./exchanges/coinslive');

app.get('/crawl', (req, res) => {
	new CoinCap().crawl();
	new CoinsLive().crawl();
	io.emit('price_change', {name: 'test'});
	res.send('Crawling')
});

io.on('connection', function(socket){
  console.log('a user connected');
});




server.listen(port);