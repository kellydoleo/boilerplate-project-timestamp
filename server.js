// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//api endpoint for timestamps
app.get("/api/timestamp", (req, res) => {
  res.json({unix: Date.now(), utc: Date()});
  
})

app.get("/api/timestamp/:time", (req, res) => {
const time_string = req.params.time;
if(/\d{5,}/.test(time_string)) {
  const time_int = parseInt(time_string);
  res.json({unix: time_int, utc: new Date(time_int).toUTCString()});

} else {
  let dateObject = new Date(time_string); 
  if(dateObject.toString() === "Invalid Date") {
    res.json({error: "Invalid Date"})
  } else {
    res.json({unix: dateObject.valueOf(), utc: dateObject.toUTCString()});
  }
}
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
