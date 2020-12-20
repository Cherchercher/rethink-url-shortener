var express = require("express");
var router = express.Router();
var shortLink = require("./../models/shortLink");

router.get("/", function (req, res) {
  res.status(200).send("shortLink routes. ");
});
/**
 *   Generates shortened URL for a given long URL
 */
router.post("/create", async function (req, res, next) {
  var data = req.body;
  let payload = await shortLink.createShortURL({
    destinationURL: data.destinationURL,
  });
  res.send(payload);
});
/*
  Returns the original URL to the user from the short URL
*/
router.get("/get/:shortUrl", async function (req, res, next) {
  var shortUrl = req.params.shortUrl;
  let item = await shortLink.getDestinationURL(shortUrl);
  if (item) {
    return res.redirect(item.destinationURL);
  } else {
    return { success: false };
  }
});

module.exports = router;
