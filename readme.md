# How to use

Configure your mysql in this file:

``` coinmama_server/mysql.js ```

# Install packages

``` $ npm install ```

# Run server

``` $ npm start ```

This will start node server in the port 3001

Navigate to

`http://localhost:3001/crawl` to start crawling prices

# Schema for DB

```CREATE TABLE `coin_prices` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `coin` varchar(11) DEFAULT NULL,
  `price_usd` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `source` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2536 DEFAULT CHARSET=utf8;```