const { Router } = require("express");

const router = new Router();

const contactsData = require("../contactsDB.json");

router.get("/", (req, res) => {
  res.send(contactsData);
});

module.exports = router;
