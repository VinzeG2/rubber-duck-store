const express = require("express")
const Duck = require("../models/duck");
const router = express.Router()

router.get("/", async (req, res) => {
  const ducks = await Duck.find().sort({ stock: -1 })
  res.json(ducks)
})


module.exports = router
