const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const mongojs = require('mongojs');

var app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var databaseUrl = "news-scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", error => {
  console.log("Database Error:", error);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/all', (req, res) => {
  db.scrapedData.find({}, (err, found) => {
    if (err) {
      throw err;
    } else {
      res.json(found);
    }
  });
});

app.get('/scrape', (req, res) => {
  request('https://www.theonion.com', (err, res, html) => {
    var $ = cheerio.load(html);
    
    if (err) throw err;
    
    $('h3 a.js_curation-click').each((i, element) => {
      var title = $(element).text();
      var link = $(element).attr('href');

      if (title && link) {
        db.scrapedData.insert({
          title: title,
          link: link
        },
        (err, inserted) => {
          if (err) {
            throw err;
          } else {
            console.log(inserted);
          }
        });
      }
    });

    $('h6 a.js_curation-click').each((i, element) => {
      var title = $(element).text();
      var link = $(element).attr('href');

      if (title && link) {
        db.scrapedData.insert({
          title: title,
          link: link
        },
        (err, inserted) => {
          if (err) {
            throw err;
          } else {
            console.log(inserted);
          }
        });
      }
    });

    $('header h1 a.js_entry-link').each((i, element) => {
      var title = $(element).text();
      var link = $(element).attr('href');

      if (title && link) {
        db.scrapedData.insert({
          title: title,
          link: link
        },
        (err, inserted) => {
          if (err) {
            throw err;
          } else {
            console.log(inserted);
          }
        });
      }
    });
  });

  res.send('Scrape Complete');
});

app.listen(3000, () => {
  console.log('Listening on Port 3000!');
})