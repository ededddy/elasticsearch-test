const { Client } = require("@elastic/elasticsearch");

const main = async () => {
	const client = new Client({ node: "http://localhost:9200", });
	try {
		const {body} = await client.search({
			index: "cases",
			body: {
				query: {
					match : {
						zh_content: "拳擊比賽"
					}
				}
			}
		});
		console.log(body.hits.hits);
	} catch (e) {
		console.log(e);
	}
};

main();
