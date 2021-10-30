const client = require("./connection.js");
const caseConfig = require("./case_setting.json");
const lawConfig = require("./law_setting.json");

( async () => {
	let ret = await client.indices.create({
		index : "cases", 
		body : caseConfig 
	});
	console.log(ret);
	ret = await client.indices.create( {
		index: "laws",
		body : 	lawConfig
	});
	console.log(ret);
})();
