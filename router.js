require("dotenv").config();
const { irsend } = require("./controll.js");
const fetch = require("node-fetch");
const util = require("util");
const fs = require("fs");
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)
const jsondir = "/home/pi/node/aircon/public/status.json";

const router = require("express").Router();
router.post("/switch", async (req, res, next) => {
	if (req.header("device") === "raspi") {
		await irsend(req.body.key);
		const data = await fetch('https://slack.com/api/users.profile.set', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;  charset=utf-8', "Authorization": `Bearer ${process.env.SLACK_TOKEN}` },
				body: JSON.stringify({
					"profile": {
						"status_emoji": `:${req.body.key}:`
					}
				})
			});
		await writeFile(jsondir, JSON.stringify({ status: req.body.key }));
		res.json({ success: true });
	} else {
		res.status(400);
	}
});
router.get("/status", async (req, res, next) => {
	const json = await readFile(jsondir, "utf8");
	res.json(JSON.parse(json));
});
module.exports = router;

