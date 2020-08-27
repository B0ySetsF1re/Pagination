const express = require('express');
const router = express.Router();

const paginationController = require('../controllers/paginationController');

// GET - home page route
router.get('/', function(req, res) {
  if(req.query.error == 'alreadyGenerated') {
    res.render('index', {
      title: 'Main',
      errorMessage: 'Examples were already generated!'
    });
  } else if(req.query.error == 'DataBaseIsEmpty') {
    res.render('index', {
      title: 'Main',
      errorMessage: 'Database is empty!'
    });
  } else {
    res.render('index', {
      title: 'Main'
    });
  }
});

// GET - /example_a/<number_of_page> route
router.get('/example_a/:page', paginationController.exampleAPagesInit);

// GET - /example_c/<number_of_page> route
router.get('/example_b/:page', paginationController.exampleBPagesInit);

// GET - /example_b/<number_of_page> route
router.get('/example_c/:page', paginationController.exampleCPagesInit);

// POST - /generatePages route
router.post('/generatePages', paginationController.checkIfAlreadyGenerated,
paginationController.genExampleA, paginationController.genExampleB, paginationController.genExampleC);

// POST - /generatePages route
router.post('/removePages', paginationController.removePages);

module.exports = router;
