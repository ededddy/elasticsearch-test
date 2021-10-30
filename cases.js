const client = require("./connection.js");
const data = require("./transformedCaseLaws.json");

const main = async () => {
	const regx = new RegExp(/\r?\n|\r|\t/g);
	let id = 1;
	let mapped = [];
	data.forEach(
		({
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
			mapped.push( {index: {}}, ready );
		}
	);
	const ret = await client.bulk( {
		index : "cases",
		body : mapped
	});
	console.log(ret);
};
main();
