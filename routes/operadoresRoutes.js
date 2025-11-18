const express = require("express");
const router = express.Router();

router.get("/operadores", (req, res) => {
  res.render("operadores", { title: "Operadores" });
});

module.exports = router;
