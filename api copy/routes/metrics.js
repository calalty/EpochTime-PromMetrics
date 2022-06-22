var express = require('express');
var router = express.Router();
var promClient = require('prom-client')

router.get('/metrics', function(req,res){
    res.status(200).set('Content-Type', 'text/plain');
    res.end(setInterval(() => {
        promClient.collectDefaultMetrics()
    }, 30000))
})


module.exports = router;
