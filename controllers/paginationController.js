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
  });

  next();
}

exports.genExampleA = async (req, res, next) => {

  for(let i = 0; i < 10; i++) {
    db.example_a.insert(await genNewUser(), (err, user) => {
      if(err) {
        return console.log(err);
      }
    });
  }

  next();
}

exports.genExampleB = async (req, res, next) => {
  for(let i = 0; i < 11; i++) {
    db.example_b.insert(await genNewUser(), (err, user) => {
      if(err) {
        return console.log(err);
      }
    });
  }

  next();
}

exports.genExampleC = async (req, res, next) => {
  for(let i = 0; i < 20; i++) {
    db.example_c.insert(await genNewUser(), (err, user) => {
      if(err) {
        return console.log(err);
      }
    });
  }

  res.redirect('/');
  next();
}
