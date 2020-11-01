const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://admin:admin@127.0.0.1:27017/taskmanager?authSource=admin", { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected"));
// mongoose.set("debug", true);

// require("./models/Task");
// require("./models/Job");

app.use("/api", require("./routes"));

const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port " + server.address().port);
});
