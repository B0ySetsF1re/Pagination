const express = require('express');
const router = express.Router();

const paginationController = require('../controllers/paginationController');

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Main page'
  });
});

router.get('/example_a', function(req, res) {
  res.render('Example_A', {
    title: 'Example_A'
  });
});

router.post('/generatePages', function(req, res) {
  res.redirect('/');
});

module.exports = router;
