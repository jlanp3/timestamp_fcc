// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get(
  "/api/:date",
  (req, res, next) => {
    if (req.params.date.includes("-")) {
      date = new Date(req.params.date);
      if (date.toString() === "Invalid Date") {
        req.err = date.toString();
      } else {
        req.unix = Date.parse(date);
        req.utc = new Date(date).toUTCString();
      }
    } else {
      date = new Date(parseInt(req.params.date));
      req.unix = Date.parse(date);
      req.utc = new Date(date).toUTCString();
    }
    next();
  },
  (req, res) => {
    if (req.err === "Invalid Date") {
      res.json({ error: req.err });
    } else {
      res.json({ unix: req.unix, utc: req.utc });
    }
  }
);

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port ⚡ " + listener.address().port);
});
