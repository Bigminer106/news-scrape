const mongoose = require('mongoose');
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const handlebars = require('express-handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

console.log('Grabbing Articles from The Onion...');

request('https://www.theonion.com', (err, res, html) => {
  var $ = cheerio.load(html);
  var results = [];

  $('a.js_curation-click').each((i, element) => {
    var title = $(element).text();
    var link = $(element).children().attr('href');

    results.push({
      title: title,
      link: link
    });
  });
  console.log(results);
});