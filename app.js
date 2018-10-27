var express = require('express')
  , http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
const connection = require('./mysql');


const port = 3001

const CoinCap = require('./exchanges/coincap');
const CoinsLive = require('./exchanges/coinslive');

app.get('/crawl', (req, res) => {
	new CoinCap().crawl();
	new CoinsLive().crawl();
	getQuotes();
	res.send('Crawling')
});

io.on('connection', function(socket){
  console.log('a user connected');
});


function getQuotes(){
	connection.query(`select cp.coin, round((cp2.price_usd + cp.price_usd)/2,2) as avg_price, cp.created_at from coin_prices as cp, coin_prices as cp2
	where cp.coin = cp2.coin and cp.created_at = cp2.created_at and cp.source != cp2.source
	order by created_at DESC limit 3`, function (error, results, fields) {
		io.emit('price_change', {results});
	});	
}



server.listen(port);