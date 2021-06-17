require("dotenv").config();
const MongoClient = require("mongodb");

exports.handler = async function (e, context) {
  MongoClient.connect(
    process.env.MONGOURI,
    { useUnifiedTopology: true },
    (err, dbs) => {
      if (err) console.error(err);
      const db = dbs.db("unicorn").collection("flags");

      db.find().toArray((err, res) => {
        if (err) console.error(err);
        console.log(res);
        dbs.close();
        return {
          statusCode: 200,
          body: res,
        };
      });
    }
  );
};
