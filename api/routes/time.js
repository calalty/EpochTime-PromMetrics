var express = require('express');
var router = express.Router();
const Ajv = require("ajv")
const ajv = new Ajv()
const timeSchema = require('../schema/timeSchema.json')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function epochConverter(date) {
        return Date.parse(date)
}

let clientDate = new Date()
let clientTimestamp = epochConverter(clientDate)
let clientEpoch = {
    epoch: clientTimestamp
}

setInterval(() => {
    clientDate = new Date()
    clientTimestamp = epochConverter(clientDate)
    clientEpoch = {
        epoch: clientTimestamp
    }
}, 30000);

router.get('/',
    function (req, res, next) {
        if (ajv.validate(timeSchema, clientEpoch)) {
            res.status(200).send(clientEpoch)
        } else {
            res.status(500).send('Error: Not an epoch number')
        }
    }
);



module.exports = router;
