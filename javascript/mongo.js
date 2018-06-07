const mongoose = require('mongoose');
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const handlebars = require('express-handlebars');

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);