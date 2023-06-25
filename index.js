const dotenv = require("dotenv").config();
const express = require("express");
const dbconnection = require("./config/dbConnection");
const cors = require("cors");
const path = require('path');
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const roomRoutes = require("./routes/roomRoutes");
const hostelDetailRoutes = require("./routes/hostelDetail");
const complainRoutes = require("./routes/complainRoutes");
const billRoutes=require("./routes/billsRoutes");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
dbconnection();
const app = express();
app.get("/", (req, res) => {
  res.send("hello world!");
});
app.use(cors());
// Serve static files from the "Images" directory
app.use('/Images', express.static(path.join(__dirname, 'Images')));
app.use(bodyParser.json());
app.use(userRoutes);
app.use(mealRoutes);
app.use(roomRoutes);
app.use(hostelDetailRoutes);
app.use(complainRoutes);
app.use(billRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port ${process.env.PORT}`);
});
