var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res) {
  console.log(req.body.name);

  // call AI model

  // additional business rules

  res.render('result', { name: req.body.name });
});

module.exports = router;
