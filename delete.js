const client = require("./connection.js");

(async () => {
	let ret = await client.indices.delete({
		index: "cases"
	});
	console.log(ret);
	ret = await client.indices.delete({
		index: "laws"
	});
	console.log(ret);
})();
