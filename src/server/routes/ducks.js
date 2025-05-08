const express = require("express");
const Duck = require("../models/duck");

const router = express.Router();

router.get("/", async (req, res) => {
  const ducks = await Duck.find({ deleted: false });
  res.json(ducks);
});

router.post("/", async (req, res) => {

  const { color, size, price, stock } = req.body;

  if (!color || !size || !price || !stock) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const existing = await Duck.findOne({ color, size, price, deleted: false });

  if (existing) {
    existing.stock += stock;
    await existing.save();
    return res.status(200).json(existing);
  }

  const lastCreatedDuck = await Duck.findOne().sort({ id: -1 });
  const newId = lastCreatedDuck?.id ? lastCreatedDuck + 1 : 1;

  const newDuck = new Duck({ id: newId, color, size, price, stock });
  await newDuck.save();
  res.status(201).json(newDuck);
});

module.exports = router;
