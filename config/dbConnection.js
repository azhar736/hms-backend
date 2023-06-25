const mongoose = require("mongoose");
let secret = process.env.MONGO_URI;
const dbconnection = async () => {
  await mongoose.connect(secret, () => {
    console.log("Connect to DB Successfully");
  });
};
module.exports = dbconnection;
