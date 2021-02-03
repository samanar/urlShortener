var express = require("express");
var router = express.Router();
const urlModel = require("../schemas/urlSchema");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/create", function (req, res, next) {
  const {url} = req.body
  
});

module.exports = router;
