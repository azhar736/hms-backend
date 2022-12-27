const dotenv = require("dotenv").config();
const express = require("express");
const dbconnection = require("./config/dbConnection");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const roomRoutes = require("./routes/roomRoutes");
const hostelDetailRoutes = require("./routes/hostelDetail");
const complainRoutes = require("./routes/complainRoutes");

dbconnection();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(userRoutes);
app.use(mealRoutes);
app.use(roomRoutes);
app.use(hostelDetailRoutes);
app.use(complainRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port ${process.env.PORT}`);
});
