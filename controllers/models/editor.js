const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kind = ["estudios", "creencias", "eventos", "bienvenidos", "sermones"];

const EditorSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  editorData: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
  kind: {
    type: String,
    required: true,
    enum: kind,
    lowercase: true,
  },
});

module.exports = mongoose.model("Editor", EditorSchema);
