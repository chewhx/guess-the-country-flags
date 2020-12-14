const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&titles=Singapore&explaintext=1&format=json"

https.get(url, (res)=> {
    res.on("data", (data) => {
      const results = JSON.parse(data)
      console.log(results.query.pages[27318].extract)
    })
})

app.listen(3000, ()=> {
  console.log("Server.js up and running!")
})
