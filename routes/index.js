var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index')
})

router.get('/weather/:location', async function(req, res, next) {
  const location = req.params.location
  const getLongLat = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCLvBVVmItQHsdq4Uin6XH4w0z8oGmarkQ`)
  const latitude = getLongLat.data.results[0].geometry.location.lat;
  const longitude = getLongLat.data.results[0].geometry.location.lng;
  
  const result = await axios.get(`https://api.darksky.net/forecast/8d2d5a982e2e4a8286564f6e95f89112/${latitude},${longitude}`)
  res.send(result.data)
})

module.exports = router;
