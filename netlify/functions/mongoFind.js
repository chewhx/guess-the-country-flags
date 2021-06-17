require("dotenv").config();
const MongoClient = require("mongodb");

exports.handler = async (e, context) => {
  try {
    const dbs = await MongoClient.connect(process.env.MONGOURI, {
      useUnifiedTopology: true,
    });

    const db = dbs.db("unicorn").collection("flags");

    const res = await db.find().sort({ attempts: -1, correct: -1 }).toArray();

    dbs.close();
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
