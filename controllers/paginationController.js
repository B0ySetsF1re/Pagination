const User = require('../models/paginationUserModel');

const mongojs = require('mongojs');
var db = mongojs('pagination_examples', ['example_a', 'example_b', 'example_c']);

const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

async function genNewUser() {
  return new Promise((resolve) => {
    let newUser = {};

    newUser = new User({
      first_name: lorem.generateWords(1),
      last_name: lorem.generateWords(1),
      email: lorem.generateWords(1) + '@' + lorem.generateWords(1) + '.com',
      username: lorem.generateWords(1),
      role: lorem.generateWords(1)
    });

    resolve(newUser);
  });
}

exports.checkIfAlreadyGenerated = async (req, res, next) => {
  db.getCollectionNames(function(err, colNames) {
    if(err) {
      return console.log(err);
    }

    if(colNames.length != 0) {
      res.redirect('/?error=' + encodeURIComponent('alreadyGenerated'));
    }
    else {
      next();
    }
  });
}

exports.genExampleA = async (req, res, next) => {

  for(let i = 0; i < 100; i++) {
    db.example_a.insert(await genNewUser(), (err, user) => {
      if(err) {
        return console.log(err);
      }
    });
  }

  next();
}

exports.genExampleB = async (req, res, next) => {
  for(let i = 0; i < 110; i++) {
    db.example_b.insert(await genNewUser(), (err, user) => {
      if(err) {
        return console.log(err);
      }
    });
  }

  next();
}

exports.genExampleC = async (req, res, next) => {
  for(let i = 0; i < 200; i++) {
    db.example_c.insert(await genNewUser(), (err, user) => {
      if(err) {
        return console.log(err);
      }
    });
  }

  res.redirect('/');
  next();
}

async function pagesInit(page, resPerPage, collection) {
  const foundUsers = await new Promise((resolve, reject) => {
    collection.find({}).limit(resPerPage).skip((resPerPage * page) - resPerPage, function(err, users) {
      if(err) {
        reject(new Error(err));
      }
      resolve(users);
    });
  });

  const numOfUsers = await new Promise((resolve, reject) => {
    collection.count({}, function(err, result) {
      if(err) {
        reject(new Error(err));
      }
      resolve(result);
    });
  });

  return new Promise((resolve) => {
    resolve({
      page: page,
      resPerPage: resPerPage,
      foundUsers: foundUsers,
      numOfUsers: numOfUsers
    });
  });
}

exports.exampleAPagesInit = async (req, res, next) => {
  const pageConfig = await pagesInit((req.params.page || 1), 10, db.example_a);

  if(pageConfig.numOfUsers == 0) {
    res.render('Example_A', {
      title: 'Example A',
    });
  } else {
    res.render('Example_A', {
      title: 'Example A',
      users: pageConfig.foundUsers,
      currentPage: pageConfig.page,
      pages: Math.ceil(pageConfig.numOfUsers / pageConfig.resPerPage),
      paginationLink: '/example_a/', // Needed for paginationView.ejs
    });
  }

  next();
}

exports.exampleBPagesInit = async (req, res, next) => {
  const pageConfig = await pagesInit((req.params.page || 1), 10, db.example_b);

  if(pageConfig.numOfUsers == 0) {
    res.render('Example_B', {
      title: 'Example B',
    });
  } else {
    res.render('Example_B', {
      title: 'Example B',
      users: pageConfig.foundUsers,
      currentPage: pageConfig.page,
      pages: Math.ceil(pageConfig.numOfUsers / pageConfig.resPerPage),
      paginationLink: '/example_b/', // Needed for paginationView.ejs
    });
  }

  next();
}

exports.exampleCPagesInit = async (req, res, next) => {
  const pageConfig = await pagesInit((req.params.page || 1), 10, db.example_c);

  if(pageConfig.numOfUsers == 0) {
    res.render('Example_C', {
      title: 'Example C',
    });
  } else {
    res.render('Example_C', {
      title: 'Example C',
      users: pageConfig.foundUsers,
      currentPage: pageConfig.page,
      pages: Math.ceil(pageConfig.numOfUsers / pageConfig.resPerPage),
      paginationLink: '/example_c/', // Needed for paginationView.ejs
    });
  }

  next();
}
