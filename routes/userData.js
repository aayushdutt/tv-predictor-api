var express = require('express');
var router = express.Router();
var db = require('../models');


/* GET user data. */
router.get('/', function(req, res, next) {
	db.UserData.find()
		.then(function(userData) {
		userData = userData.reverse();
		res.json(userData);
		})
		.catch(function(err) {
			res.send(err);
	})
});


/* POST user data. */
router.post('/', function(req, res, next) {
	console.log("Request Recieved: ", req.body)
	db.UserData.find()
	.then(function(userData) {
		const badJson = req.body.ocr
		var correctJson = badJson.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
		const ocrArr = JSON.parse(correctJson)
		// userData.forEach(o => {
		// 	ocrArr.forEach(scannedOcr => {
		// 	if(
		// 		o["drug-name"].toLowerCase().startsWith(scannedOcr.toLowerCase())  || 
		// 		scannedOcr.toLowerCase().startsWith(o["drug-name"].toLowerCase())
		// 	)
		// 		return res.json(o);
		// 	})
		// })
		return res.json({null: null})
	})
	.catch(function(err) {
		res.send(err);
	})
});


module.exports = router;
