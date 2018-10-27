CrawlerBase = require('../crawler_base');


class CoinsLive extends CrawlerBase {

	constructor(){
		super()
		this.url = 'https://coins.live';
		this.source = 'coinslive';
	}

	parse(html, coin){
		coin = coin.charAt(0).toUpperCase() + coin.slice(1)
		let regex1 = new RegExp("class=\"coin_name(.*?)"+coin+"(.*?)tr>","s");
		let coinSection = html.match(regex1)[2];
		let regex2 = new RegExp("class=\"coin_price(.*?)([0-9.,]+)[^<]","s");
		let priceUsd = coinSection.match(regex2)[2];
		return priceUsd
	}

}

module.exports = CoinsLive

