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
  const newId = lastCreatedDuck?.id ? lastCreatedDuck.id + 1 : 1;

  const newDuck = new Duck({ id: newId, color, size, price, stock });
  await newDuck.save();
  res.status(201).json(newDuck);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const duck = await Duck.findOne({ id: Number(id) });

  if (!duck) {
    return res.status(404).json({ error: "Duck not found" });
  }

  duck.deleted = true
  await duck.save();

  res.status(204).end();
})

router.put("/:id", async (req, res) => {
  const { price, stock } = req.body;

  if (price == null || stock == null) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const duck = await Duck.findOne({ id: Number(req.params.id), deleted: false });
  if (!duck) {
    return res.status(404).json({ error: "Duck not found" });
  }

  duck.price = price;
  duck.stock = stock;

  await duck.save();
  res.status(200).json(duck);
});


module.exports = router;
