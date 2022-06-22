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

let xmlHttp = new XMLHttpRequest();
let serverDate = new Date(xmlHttp);
let serverTimestamp = epochConverter(serverDate)
let serverEpoch = {
    epoch: serverTimestamp
}

setInterval(() => {
    clientDate = new Date()
    clientTimestamp = epochConverter(clientDate)
    clientEpoch = {
        epoch: clientTimestamp
    }
    serverDate = new Date(xmlHttp);
    serverTimestamp = epochConverter(serverDate)
    serverEpoch = {
        epoch: serverTimestamp
    }
}, 30000);

router.get('/',
    function (req, res, next) {
        if (ajv.validate(timeSchema, clientEpoch, serverEpoch)) {
            res.status(200).send([clientEpoch, serverEpoch])
        } else {
            res.status(500).send('Error: Not an epoch number')
        }
    }
);



module.exports = router;
