require("dotenv").config();
const MongoClient = require("mongodb");
const sanitize = require("mongo-sanitize");

exports.handler = async (e, context) => {
  try {
    // your server-side functionality

    if (e.httpMethod !== "POST") {
      return {
        statusCode: 400,
        error: "Access denied",
      };
    }

    const body = JSON.parse(sanitize(e.body));

    const dbs = await MongoClient.connect(process.env.MONGOURI, {
      useUnifiedTopology: true,
    });

    const db = dbs.db("unicorn").collection("flags");

    await db.insertOne(body);

    dbs.close();
    return {
      statusCode: 201,
    };
  } catch (err) {
    return {
      statusCode: 500,
      error: JSON.stringify(err),
    };
  }
};
