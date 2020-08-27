const express = require('express');
const router = express.Router();

const paginationController = require('../controllers/paginationController');

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

router.get('/example_a/:page', paginationController.exampleAPagesInit);

router.get('/example_b/:page', paginationController.exampleBPagesInit);

router.get('/example_c/:page', paginationController.exampleCPagesInit);

router.post('/generatePages', paginationController.checkIfAlreadyGenerated,
paginationController.genExampleA, paginationController.genExampleB, paginationController.genExampleC);

router.post('/removePages', paginationController.removePages);

module.exports = router;
