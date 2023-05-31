let { Router } = require("express");
let router = Router();

router.get("/", async (req, res) => {
  res.json({
    msg: "Hola",
  });
});

module.exports = router;
