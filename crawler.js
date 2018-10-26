const request = require('request');

request('http://www.coincap.io', function (error, response, body) {
  
  let data = parseCoin(body, 'bitcoin');
  console.log(data); 

  let data2 = parseCoin(body, 'ethereum');
  console.log(data2); 

  let data3 = parseCoin(body, 'litecoin');
  console.log(data3); 



});

function parseCoin(html, coin){
	bitcoininfo = html.match("Asset:"+coin+"\":([^\$]*)")[1].slice(0, -2);;
  	return JSON.parse(bitcoininfo)
}
