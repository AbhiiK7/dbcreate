"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const restService = express();

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
    let speech =
        req.body.result &&
        req.body.result.parameters &&
        req.body.result.parameters.echoText
            ? req.body.result.parameters.echoText
            : "Seems like some problem. Speak again.";


        //create post request post variable =  speech
    if (speech !== null || speech !== ''){
        request.post(
            'https://forserene.com/mini/myDB.php',
            { slack: "try" },
            function (error, response, body) {
                if (!error) {
                    var obj = json_decode(body);
                    return res.json({
                        speech: obj.text,
                        displayText: obj.code,
                        source: "webhook-echo-sample"
                    });
                }else{
                    //failure
                    return res.json({
                        speech: "connection failed",
                        displayText: "connection failed",
                        source: "webhook-echo-sample"
                    });
                }
            }
        );
    } else{
        //submit return message to the user
        return res.json({
            speech: "Please enter database name",
            displayText: "Please enter database name",
            source: "webhook-echo-sample"
        });
    }



});







restService.listen(process.env.PORT || 8000, function() {
    console.log("Server up and listening");
});
