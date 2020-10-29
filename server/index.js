const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// mongoose.connect("mongodb://localhost/conduit");
// mongoose.set("debug", true);

// require("./models/Task");
// require("./models/Job");
// require("./config/passport");

app.use('/api', require("./routes"));

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port " + server.address().port);
});
