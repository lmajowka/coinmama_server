var express = require('express')
  , http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
const connection = require('./mysql');
const SECONDS_TOLERANCE = 1;


const port = 3001

const CoinCap = require('./exchanges/coincap');
const CoinsLive = require('./exchanges/coinslive');

app.get('/crawl', (req, res) => {
	new CoinCap().crawl();
	new CoinsLive().crawl();
	emitQuotes();
	res.send('<script>setTimeout(() => location.reload(), 5000)</script>')
});

app.get('/coin/:name', function(req , res){

	connection.query(`select cp.coin, round((cp2.price_usd + cp.price_usd)/2,2) as avg_price, cp.created_at from coin_prices as cp, coin_prices as cp2
						where cp.coin = cp2.coin and cp.created_at >= DATE_SUB(cp2.created_at, interval ${SECONDS_TOLERANCE} second) and 
						cp.created_at <= DATE_ADD(cp2.created_at, interval ${SECONDS_TOLERANCE} second) and cp.source != cp2.source
						and cp.coin = '${req.params.name}'
						group by 1,2,3
						order by created_at DESC LIMIT 20`, function (error, results, fields) {
							res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
							res.json({"items": results});
						});
 
});

io.on('connection', function(socket){
  	emitQuotes();
  	console.log('a user connected');
});


function emitQuotes(){
	connection.query(`select cp.coin, round((cp2.price_usd + cp.price_usd)/2,2) as avg_price, cp.created_at from coin_prices as cp, coin_prices as cp2
						where cp.coin = cp2.coin and cp.created_at >= DATE_SUB(cp2.created_at, interval ${SECONDS_TOLERANCE} second) and 
						cp.created_at <= DATE_ADD(cp2.created_at, interval ${SECONDS_TOLERANCE} second) and cp.source != cp2.source
						order by created_at DESC limit 3

`, function (error, results, fields) {
		io.emit('price_change', {results});
	});	
}



server.listen(port);