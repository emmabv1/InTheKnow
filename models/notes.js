const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: String,
  body: String
});

var Note = mongoose.model("Notes", NoteSchema);
module.exports = Note;