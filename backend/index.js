const express = require("express");
const mongoose = require("mongoose");
// Creating a server instance
const app = express();

// Telling the server to accept any incoming data in JSON format only
app.use(express.json());

// Connecting to MongODB database
mongoose

  .connect("mongodb://localhost:27017/post", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongODB"))
  .catch((err) => console.log(err));
const PORT = 3000;

app.listen(PORT, () => console.log("Server started"));