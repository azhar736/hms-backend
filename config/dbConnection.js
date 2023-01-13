const mongoose = require("mongoose");
const dbconnection = () => {
  let secret = process.env.MONGO_URI;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(secret)
    .then(() => {
      console.log("connected to the database successfully");
    })
    .catch((e) => {
      console.log("connection to the database failed", e.message);
    });
};
module.exports = dbconnection;
