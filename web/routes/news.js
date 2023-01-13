var express = require('express');
var router = express.Router();
const { curly } = require('node-libcurl');
const querrystring = require('querystring');
//const terminate = curlTest.close.bind(curlTest);

//const curlTest = new Curl();
//import data from 'http://localhost:3001/news' assert { type: 'JSON' };
//var data = require('http://localhost:3001/news')
//console.log(data);


/* GET news page. */
router.get('/', async function(req, res, next) {
    // curlTest.setOpt(Curl.option.URL, "http://localhost:3001/news");
    // curlTest.setOpt(Curl.option.GET, true);
    // Curl.get()

    const { statusCode, data, headers } = await curly.get('http://localhost:3001/news')

    console.log(data.data[0]);
    console.log(data);
    
    res.render('news', 
    { 
        title: 'News',
        data: data.data
    });
});

module.exports = router;
