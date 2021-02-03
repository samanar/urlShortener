const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const urlModel = mongoose.model("Url", urlSchema);
module.exports = urlModel;
