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
