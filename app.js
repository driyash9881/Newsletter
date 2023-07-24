const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("node:https");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signUP.html")
})
app.post("/", function(req, res) {
    const firstName = req.body.firstN;
    const lastName = req.body.lastN;
    const email = req.body.emailI;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/89fa3dd7f4"
    const options = {
        method: 'POST',
        auth: '@Chanchal7206:89e48930c669ec0f7873957a04d00217-us21'
    }
    const request = https.request(url, options, function(response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/sucess.html");
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(req, res) {
    res.redirect("/")
})
app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3001")
});


//api key
//57e0f4625be1103f79c966575d3072fe-us21

//list id
//b1766b3552