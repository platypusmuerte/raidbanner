let fs = require('fs');
const path = require('path');

const appDataPath = process.env.APPDATA;
const scriptsPath = '/Firebot/firebot-data/user-settings/scripts/';
const platysIncFolder = 'pm.includes';

exports.getScriptManifest = () => {
	return {
		name: "Platys Raider Script",
		description: "Bounces a bar across screen",
		version: "2",
		author: "PlatypusMuerte",
		website: "https://twitter.com/PlatypusMuerte"
	};
};

function getDefaultParameters() {
	return new Promise((resolve, reject) => {
		resolve({
			delayTime: {
				type: "number",
				description: "Seconds before clearing effect",
				default: 20
			},
			message: {
				type: "string",
				description: "The raid message. Use token {raider} for the name.",
				default: "IT'S A {raider} RAID ! ! !"
			}
		});
	});
}
exports.getDefaultParameters = getDefaultParameters;

function getHead() {
	let jsContent;
	let file = path.join(appDataPath,scriptsPath + "/" + platysIncFolder + "/jqueryui/jquery-ui.min.js");

	return new Promise((resolve, reject) => {

		fs.readFile(file,(err,data) => {
			if(err) {
				jsContent = err;
			} else {
				jsContent = data;
			}

			resolve(`<script>` + jsContent + `</script>`);
		});
	});
}

function getCSS() {
	let fileContent;
	let file = path.join(appDataPath,scriptsPath + "/" + platysIncFolder + "/raider/raider.css");

	return new Promise((resolve, reject) => {

		fs.readFile(file,(err,data) => {
			if(err) {
				fileContent = err;
			} else {
				fileContent = data;
			}

			resolve(`<style>` + fileContent + `</style>`);
		});
	});
}

function jsEffects() {
	let fileContent;
	let file = path.join(appDataPath,scriptsPath + "/" + platysIncFolder + "/raider/main.js");

	return new Promise((resolve, reject) => {

		fs.readFile(file,(err,data) => {
			if(err) {
				fileContent = err;
			} else {
				fileContent = data;
			}

			resolve(`<script>` + fileContent + `</script>`);
		});
	});
}

function run(runRequest) {
	let raider = runRequest.command.args[0].toUpperCase().replace('@','');
  	let delayTime = runRequest.parameters.delayTime*1;
  	let raidMsg = runRequest.parameters.message.replace('{raider}',`<span>`+raider+`</span>`);

	return new Promise((resolve, reject) => {
		getHead().then((jsHead) => {
			getCSS().then((css) => {
				jsEffects().then((jsEffs) => {
					resolve({
						success: true,
						effects: [
							{
								type: EffectType.HTML,
								enterAnimation: "none",
								exitAnimation: "none",
								html:`<div id="raiderWrapper" class="raiderWrapper"><div class="pmRaiderThrowAwayDiv"></div>` + jsHead + css + `
								<div class="raiderBar">
									<div id="raiderName" class="raiderName">${raidMsg}</div>
								</div>` + jsEffs + `</div>`,
								length: 5,
								removal: "pmRaiderThrowAwayDiv"
							},{
								type: EffectType.DELAY,
								delay: delayTime
							},{
								type: EffectType.HTML,
								enterAnimation: "none",
								exitAnimation: "none",
								html: `<div class="pmRaiderThrowAwayDiv"><script>$(".raiderWrapper,.ui-effects-placeholder").remove();</script></div>`,
								length: 5,
								removal: "pmRaiderThrowAwayDiv"
							}
						]
					});
				});
			});
		});
	});
}

exports.run = run;