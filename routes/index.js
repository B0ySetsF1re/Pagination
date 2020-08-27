const express = require('express');
const router = express.Router();

const paginationController = require('../controllers/paginationController');

router.get('/', function(req, res) {
  if(req.query.error) {
    res.render('index', {
      title: 'Main',
      errorMessage: 'Examples were already generated!'
    });
  } else {
    res.render('index', {
      title: 'Main'
    });
  }
});

router.get('/example_a/:page', function(req, res) {
  res.render('Example_A', {
    title: 'Example_A'
  });
});

router.get('/example_b/:page', function(req, res) {
  res.render('Example_B', {
    title: 'Example_B'
  });
});

router.get('/example_c/:page', function(req, res) {
  res.render('Example_C', {
    title: 'Example_C'
  });
});

router.post('/generatePages', paginationController.checkIfAlreadyGenerated,
paginationController.genExampleA, paginationController.genExampleB, paginationController.genExampleC);

module.exports = router;
