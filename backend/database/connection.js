const mongoose = require("mongoose");
require("dotenv").config();

const mongoHost = process.env.DB_HOST || "localhost:27017";
const mongoDatabase =
  process.env.MONGO_DATABASE || "rethink-shortenURL-backend";
const URI = "mongodb://" + mongoHost + "/" + mongoDatabase;
const connectDB = async () => {
  await mongoose.connect(URI, {
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    authSource: "admin",
  });
};

connectDB();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});

module.exports = mongoose.connection;
