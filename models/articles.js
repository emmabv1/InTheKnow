const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Notes"
  }
});

var Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles;