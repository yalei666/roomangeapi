var express = require('express');
var router = express.Router();
const formidable = require('formidable');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* POST login page. */
router.post('/reset', function(req, res, next) {
	const form = new formidable.IncomingForm();
	form.parse(req,(err,fields,files)=>{
		console.log(fields);
		console.log(files.file.name);
		res.send('1');
	})

});
module.exports = router;