const { MongoClient } = require("mongodb");
MONGODB_URL =
  "mongodb+srv://root:admin123@cluster0.r7co3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
MONGODB_NAME = "Student-Mentor";
const client = new MongoClient(MONGODB_URL);

const mongo = {
  db: null,

  async connect() {
    await client.connect();
    console.log("Connected to Mongo...");

    this.db = client.db(MONGODB_NAME);
    console.log(`'${MONGODB_NAME}' database is selected`);
  },
};

module.exports = mongo;
