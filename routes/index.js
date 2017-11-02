var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BuildIt: 3d Scene Designer'})
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'BuildIt: 3d Scene Designer'})
});

/* GET build page. */
router.get('/build', function(req, res, next) {
  res.render('build', { title: 'BuildIt: 3d Scene Designer'})
});

/* GET browse page. */
router.get('/browse', function(req, res, next) {
  res.render('browse', { title: 'BuildIt: 3d Scene Designer'})
});
module.exports = router;

/* GET judy page. */
router.get('/judy', function(req, res, next) {
  res.render('judy', { title: 'BuildIt: 3d Scene Designer'})
});

/* GET kayli page. */
router.get('/kayli', function(req, res, next) {
  res.render('kayli', { title: 'BuildIt: 3d Scene Designer'})
});

/* GET Editor page. */
router.get('/editor', function(req, res, next) {
  res.render('editor', { title: 'BuildIt: 3d Scene Designer'})
});
module.exports = router;
