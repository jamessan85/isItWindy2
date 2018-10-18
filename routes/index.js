var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('/weather', function(req, res, next) {
  axios.get('https://api.darksky.net/forecast/8d2d5a982e2e4a8286564f6e95f89112/37.8267,-122.4233')
  .then(function (response) {
    res.send(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
})


module.exports = router;
