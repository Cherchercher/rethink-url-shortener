require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
var express = require("express");
var cors = require("cors");
var shortLink = require("./routes/shortLink");
var redis = require("redis");
var bodyParser = require("body-parser");

var client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
} else {
  client = redis.createClient();
}

function isEmpty(obj) {
  return !Object.keys(obj).length > 0;
}

let redisMiddleware = (req, res, next) => {
  let key = req.shortURL;
  client.get(key, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data && !isEmpty) {
      const reponse = JSON.parse(data);
      return res.status(200).json(reponse);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.set(key, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};
const swaggerDocument = YAML.load("./swagger.yaml");

var app = express();

//allow all origins for now
app.use(cors({ origin: "*" }));
var jsonParser = bodyParser.json();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Parse Server plays nicely with the rest of your web routes
app.get("/", function (req, res) {
  res.status(200).send("URL Shortener. Visit api-docs for documentation.");
});
// redisMiddleware,

app.use("/shortLink", jsonParser, shortLink);

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const host = "0.0.0.0";
const port = process.env.PORT || 1337;

app.listen(port, host, function () {
  console.log("Server Started.......");
});
