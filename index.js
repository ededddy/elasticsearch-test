const { Client } = require("@elastic/elasticsearch");
const data = require("./transformedCaseLaws.json");
require("events").EventEmitter.prototype._maxListeners = 1000;

const main = async () => {
	const client = new Client({ node: "http://localhost:9200", });
	let id = 1;  
	const regx = new RegExp(/\r?\n|\r|\t/g);
	data.forEach(
		async ({
			num,
			date,
			ty,
			voting,
			result,
			reporter,
			aj1,
			aj2,
			link,
			mentioned,
			pLink,
			subject,
			summary,
			cn_content,
			pt_content,
		}) => {
			const mentions = mentioned.map(({ codex, law_id  }) => {
				return `${codex} ${law_id}`;
			});
			const ready = {
				id: id++,
				case_num: num,
				date,
				caseType: ty,
				voting,
				result,
				judicator: reporter,
				assistant_judges: `${aj1} ${aj2}`,
				link,
				pt_link: pLink,
				subject,
				summary,
				laws_zh: mentions.join(", "),
				zh_content: cn_content.replace(regx, ""),
				pt_content: pt_content.replace(regx, ""),
			};
			await client.index({
				index:"cases",
				body: ready
			});
		}
	);
};
main();
