var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('weathermain', { title: 'Express' });
});

router.get('/getCityName', function (req, res, next) {
  let url = "https://api.seniverse.com/v3/location/search.json?key=S_OoNzXhyAwJTTnlH&q=";
  url += req.query.latitude + ':' + req.query.longitude;
  const httpReq = https.get(url, response => {
    response.setEncoding('utf-8');
    response.on('data', data => {
      let my = JSON.parse(data);
      my.results[0].name;
      res.json(my);
    })
  })

  httpReq.on('error', err => {
    console.log(err.message);
  })
});

module.exports = router;
