const { Router } = require("express");

const router = Router();

router.get("/", (request, response) => {
  return response.json({ message: "hola" });
});

module.exports = router
