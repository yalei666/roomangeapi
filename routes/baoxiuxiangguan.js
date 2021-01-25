var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/addBaoXiu', function(req, res, next) {
  console.log(req);
  res.send(req.data);
});

module.exports = router;