const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const exphbs = require ("express-handlebars");
const axios = require ("axios");
const cheerio = require ("cheerio");

const PORT = process.env.PORT || 3000;
const app = express();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log(`App running on port ${PORT}!`);
});