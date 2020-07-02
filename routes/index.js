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
      res.json(my);
    })
  })

  httpReq.on('error', err => {
    console.log(err.message);
  })
});

router.get('/get24', function (req, res, next) {
  let url = 'https://api.seniverse.com/v3/weather/hourly.json?key=SuGIvEHwK8b1Ed0nY&location=' + req.query.cityID + '&language=zh-Hans&unit=c&start=0&hours=24';
  const httpReq = https.get(url, res1 => {
    let hourlyData = '';
    res1.setEncoding('utf-8');
    res1.on('data', chunk => {
      hourlyData += chunk;
    })
    res1.on('end', ()=>{
      res.json(JSON.parse(hourlyData));
    })
  });
})

module.exports = router;
