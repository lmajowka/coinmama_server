const express = require('express')
const app = express()
const port = 3000

const CoinCap = require('./exchanges/coincap');
const CoinsLive = require('./exchanges/coinslive');

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/crawl', (req, res) => {
	new CoinCap().crawl();
	new CoinsLive().crawl();
	res.send('Crawling')
});


app.listen(port, () => console.log(`App listening on port ${port}!`))