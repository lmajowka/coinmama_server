CrawlerBase = require('../crawler_base');


class CoinCap extends CrawlerBase {

	constructor(){
		super()
		this.url = 'http://www.coincap.io';
		this.source = 'coincap';
	}

	parse(html, coin){
		let info = html.match("Asset:"+coin+"\":([^\$]*)")[1].slice(0, -2);;
  		return JSON.parse(info)['priceUsd'];
	}

}

module.exports = CoinCap

