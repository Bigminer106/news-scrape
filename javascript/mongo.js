const mongoose = require('mongoose');
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const handlebars = require('express-handlebars');

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";