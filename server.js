const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const mongoose = require("mongoose");
const authRoute = require('./routes/authRoutes.js')
const userRoute = require("./routes/userRoutes.js")
const transactionRoute = require("./routes/transactionRoutes.js")



require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


const PORT = process.env.PORT || 7000;
const mongoUrl = process.env.MONGO_URL;

// Public routes
app.use('/', authRoute)

app.use("/", userRoute)
app.use("/transaction", transactionRoute)


//mongoose connect
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("✅ Connected to Database");
    //App Listened
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((e) => {
    console.error("❌ Connection Failed:", e);
  });



