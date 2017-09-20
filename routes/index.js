var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BuildIt: 3d Scene Designer'})
});

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'BuildIt: 3d Scene Designer'})
});

/* GET home page. */
router.get('/build', function(req, res, next) {
  res.render('build', { title: 'BuildIt: 3d Scene Designer'})
});

/* GET home page. */
router.get('/browse', function(req, res, next) {
  res.render('browse', { title: 'BuildIt: 3d Scene Designer'})
});
module.exports = router;
