const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require('./routes/admin/auth')

//environment variable or you can say constants
env.config();
// mongodb connection
// mongodb+srv://Adnaan:<password>@cluster0.oy0sp.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://adnaanfuard101:<password>@cluster0.rr8hh1k.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rr8hh1k.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rr8hh1k.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    (err) => {
      if (err) throw err;
      console.log("Connected to MongoDB");
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
