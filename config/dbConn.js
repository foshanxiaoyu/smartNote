const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect();
console.log("DB connected ...");

module.exports = client;
