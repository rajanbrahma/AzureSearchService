const express = require('express');
const router = express.Router();
const fs = require("fs"),
      json = "";
const axios = require('axios');
const formatString = require('../serverside');

const file = fs.readFileSync(__dirname+'/../config/config.json', 'utf8');

const api_endpoint_base = JSON.parse(file).api_endpoint_base;
const api_endpoint_searchFields = JSON.parse(file).searchFields;
const api_endpoint_accessKey = JSON.parse(file).accessKey;
const api_endpoint_topCount = JSON.parse(file).docCount;
const api_endpoint_selectFields = JSON.parse(file).selectFields;
const max_sample_len = JSON.parse(file).maximumSampleLength;


router.get('/content_search', function(req, res, next) {
  res.render('search-page');
});

router.post('/callapi',function(req,res){
  var search_string = req.body.value;
  var api_endpoint = api_endpoint_base + "&search=" + search_string + "&searchFields=" + api_endpoint_searchFields + "&$top=" +  api_endpoint_topCount + "&$select=" + api_endpoint_selectFields;

  axios.get(api_endpoint, {
    headers: {
      'api-key': api_endpoint_accessKey
    }
  })
  .then((res1) => {

    res.send(formatString(res1,search_string,max_sample_len));
    res.send({
      "data":json_array_for_FE,
      "status":200
    });
  })
  .catch((error) => {
    console.error(error)
  })
});

module.exports = router;
