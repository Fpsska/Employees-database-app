const express = require("express");

const contactsRouter = require("./routes/contacts.routes");

const app = express();

require("dotenv").config();

// middleware

app.use(express.json());

// routes

app.use("/api/data", contactsRouter);

app.get("/", (req, res) => {
  res.send("START route");
});

// connection
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
