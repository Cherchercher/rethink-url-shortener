require("./../database/connection");
const mongoose = require("mongoose");
var URLCount = require("./URLCount");

function numberToBase(number, base = 62) {
  //  Transform number to digits in base
  //  Args:
  //  number: input number to transform
  //  base: base to transform into
  //  Returns:
  //  transformed digits in base
  let convertedString = "";
  let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  while (number > 0) {
    convertedString = s[parseInt(number % base)] + convertedString;
    number = Math.floor(number / base);
  }
  return convertedString;
}

//define schema for shortLink model
let shortLinkSchema = new mongoose.Schema({
  destinationURL: {
    type: String,
  },
  shortenedURL: {
    type: String,
  },
});

//create short link model
const shortLinkModel = mongoose.model("shortLink", shortLinkSchema);

//generate short link
async function shortenURL(destinationURL) {
  async function next() {
    let shortURL = "";
    URLCount.incrementCount();

    let number_of_urls_obj = await URLCount.getCount();
    let number_of_urls = number_of_urls_obj.count;

    //map base 62 to char
    for (var i = 0; i < numberToBase(number_of_urls).length; i++) {
      shortURL += numberToBase(number_of_urls).charAt(i);
    }

    let results = await shortLinkModel.find({ shortenedURL: shortURL }).exec();
    if (results.length == 0) {
      return shortURL;
    } else {
      return await next();
    }
  }
  let shortenedURL = await next();
  let result = await shortLinkModel.create({
    shortenedURL: shortenedURL,
    destinationURL: destinationURL,
  });
  return {
    destination: destinationURL,
    //replace with actual server url
    shortened: "http://localhost/" + result.shortenedURL,
  };
}

module.exports = {
  getDestinationURL: (data) => shortLinkModel.findOne({ shortenedURL: data }),
  createShortURL: (data) => shortenURL(data.destinationURL),
};
