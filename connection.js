const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

var client = new Client({
	node: process.env.ES_HOST
});

module.exports = client;
