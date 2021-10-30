const client = require("./connection.js");
require("events").EventEmitter.prototype._maxListeners = 1000;

const metadata = require("./laws/metadata.json");

let dbID = 1;
(async () => {
	metadata.forEach(async (fileName) => {
		const data = require(`./laws/combined/${fileName}.json`);
		let mapped = [];
		data.forEach((law) => {
			const ready = {
				id: dbID,
				dbId: dbID++,
				codex: fileName,
				law_id: law.idx,
				law_num: law.num,
				zh_name: law.cn_name,
				pt_name: law.pt_name,
				zh: law.cn_detail,
				pt: law.pt_detail,
				zh_remark: law.cn_remark,
				pt_remark: law.pt_remark,
			};
			mapped.push({index:{}}, ready);
		});
		const ret = await client.bulk({
			index:"laws",
			body: mapped
		});
		console.log(ret.body);
		console.log(`INDEXED ${mapped.length/2} laws`);
	});
})();
