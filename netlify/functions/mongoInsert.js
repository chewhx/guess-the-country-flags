require("dotenv").config();
const MongoClient = require("mongodb");
const sanitize = require("mongo-sanitize");

exports.handler = async function (e, context) {
  // your server-side functionality
  const body = sanitize(context);
  MongoClient.connect(
    process.env.MONGOURI,
    { useUnifiedTopology: true },
    (err, dbs) => {
      if (err) console.error(err);
      const db = dbs.db("unicorn").collection("flags");

      db.insertOne(body, (err, res) => {
        if (err) console.error(err);
        dbs.close();
        return {
          statusCode: 200,
        };
      });
    }
  );
};
