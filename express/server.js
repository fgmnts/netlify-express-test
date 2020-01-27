'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
let str = "boot";
const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("heyo");
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

/*
const query_url =
  "https://www.stories.com/en_eur/clothing/knitwear/cardigans/product.wrap-cardigan-grey.0657572001.html";
const Nightmare = require("nightmare");

function check() {
  const nightmare = Nightmare({ show: false });

  nightmare
    .goto(query_url)
    //.wait(3000)
    .evaluate(() => document.querySelector("#size_0657572001002").classList)
    .end()
    .then(classes => {
      var d = new Date();
      console.log(
        d.toLocaleString(),
        "is-sold-out",
        Object.values(classes).includes("is-sold-out")
      );
      str = d.toLocaleString() + " > ";
      "is-sold-out" + " > ";
      Object.values(classes).includes("is-sold-out");
      //
    })
    .catch(error => {
      console.error("Search failed:", error);
    });
}

setInterval(function() {
  check();
}, 1000 * 60 * 15);
check();
*/
module.exports = app;
module.exports.handler = serverless(app);
