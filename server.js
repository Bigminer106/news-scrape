const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

var db = require('./models');
var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/newsScraper');

app.get('/scrape', (req, res) => {
  axios.get('https://www.theonion.com/')
  .then(response => {
    var $ = cheerio.load(response.data);

    $('h3 a.js_curation-click').each((i, element) => {
      var result = {};

      result.title = $(this).text();
      result.link = $(this).attr('href');

      db.Article.create(result)
        .then(dbArticle => {
          console.log(dbArticle);
        })
        .catch(err => {
          return res.json(err);
        });
    });

    $('h6 a.js_curation-click').each((i, element) => {
      var result = {};

      result.title = $(this).text();
      result.link = $(this).attr('href');

      db.Article.create(result)
        .then(dbArticle => {
          console.log(dbArticle);
        })
        .catch(err => {
          return res.json(err);
        });
    });

    $('header h1 a.js_entry-link').each((i, element) => {
      var result = {};

      result.title = $(this).text();
      result.link = $(this).attr('href');

      db.Article.create(result)
        .then(dbArticle => {
          console.log(dbArticle);
        })
        .catch(err => {
          return res.json(err);
        });
    });

    res.send('Scrape Complete!');
  });
});

app.get('/articles', (req, res) => {
  db.Article.find({})
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/articles/:id', (req, res) => {
  db.Article.findOne({_id: req.params.id})
    .populate('note')
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post('/articles/:id', (req, res) => {
  db.Note.create(req.body)
    .then(dbNote => {
      return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
    })
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on Port ${PORT}!`);
});