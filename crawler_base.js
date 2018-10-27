const request = require('request');
const connection = require('./mysql');

class CrawlerBase{

	crawl(){

		request(this.url, (error, response, body) => {

			const coins = ['bitcoin','ethereum','litecoin'];

			for (let coin of coins){
				let data = this.parse(body, coin);
				this.saveIntoDatabase(coin, data, this.source)
			}


		});
	}


	saveIntoDatabase(coin, priceUsd, source){
		connection.query(`insert into coin_prices (coin, price_usd, source) VALUES ('${coin}',${priceUsd}, '${source}')`, function (error, results, fields) {});	
	}
}

module.exports = CrawlerBase