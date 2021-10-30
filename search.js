const { Client } = require("@elastic/elasticsearch");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));

const main = async () => {
	const client = new Client({ node: "http://localhost:9200", });
	try {
		await client.search({

			index: "laws",
			body: {
				"size": 3000,
				"min_score": Number(1e-4),
				"query": {
					"fuzzy": {
						"codex": {
							"value": "商法",
							"fuzziness": "2"
						}
					}
				}
			}
		});
		const query = {
			"size" : 3000,
			"query": {
				"bool": {
					"must": {
						"match": {
							"caseType": "人身保護令"
						}
					},
					"must_not": {
						"match": {
							"id" : 699
						}
					}
				}
			}
		};


		const res = await fetch("http://localhost:9200/cases/_search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(query)    
		});
		const body = await res.json();
		const hits = body.hits.hits; 
		hits.forEach( ({_source}) => {
			console.log(_source.id);
		});
	} catch (e) {
		console.log(e);
	}
};

main();
