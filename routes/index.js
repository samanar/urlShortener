var express = require("express");
const { NetworkAuthenticationRequire } = require("http-errors");
var router = express.Router();
const urlModel = require("../schemas/urlSchema");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/:code", async function (req, res) {
  const { code } = req.params;
  console.log(code);
  const found = await urlModel.findOne({ code }).lean().exec();
  console.log(found);
  if (found) return res.redirect(found.url);
  else return res.render("index", { title: "Express", error: false });
});

router.post("/create", async function (req, res, next) {
  const { url } = req.body;
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  const isValid = !!pattern.test(url);
  if (!isValid) return res.send({ error: true });

  const found = await urlModel.findOne({ url }).lean().exec();
  if (found) return res.send({ result: found });

  let codeLength = 4;
  let counter = 1;
  let code = Math.random().toString(36).substr(2, codeLength);
  while (await urlModel.exists({ code })) {
    code = Math.random().toString(36).substr(2, codeLength);
    counter++;
    if (counter > 5) {
      codeLength++;
      counter = 1;
    }
  }

  const newUrl = new urlModel({ url, code });
  await newUrl.save();
  res.send({ result: newUrl });
});

module.exports = router;
