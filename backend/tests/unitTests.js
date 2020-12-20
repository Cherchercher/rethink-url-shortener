const expect = require("chai").expect;
const mongoUnit = require("mongo-unit");
const testData = require("./testData.json");
const shortLink = require("../models/shortLink");

mongoUnit.start().then(() => {
  console.log("fake mongo is started: ", mongoUnit.getUrl());
  process.env.DATABASE_URL = mongoUnit.getUrl(); // this var process.env.DATABASE_URL = will keep link to fake mongo
  run(); // this line start mocha tests
});

after(async () => {
  await mongoUnit.stop();
});

describe("shortLink", () => {
  beforeEach(() => mongoUnit.initDb(process.env.DATABASE_URL, testData));
  afterEach(() => mongoUnit.drop());

  it("should get shortURL", async () => {
    let item = await shortLink.getDestinationURL("https://aloha.com");
    if (item) {
      return expect(result.destinationURL).to.equal("A");
    } else {
      return false;
    }
  });

  it("should redirect to destination URL", () => {
    //TODO
    return true;
  });

  it("should return same short url if destination URL exists", () => {
    //TODO
    return true;
  });
});
