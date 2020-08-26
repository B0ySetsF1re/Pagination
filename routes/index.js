const express = require('express');
const router = express.Router();

const paginationController = require('../controllers/paginationController');

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Main page'
  });
});

router.post('/generatePages', function(req, res) {
  res.redirect('/');
});

module.exports = router;
