const express = require("express");

const app = express();

require("dotenv").config();

// middleware

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("START route");
});

// connection
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
