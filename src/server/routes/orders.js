const express = require("express")
const Order = require("../models/order")
const Duck = require("../models/duck")

const router = express.Router()

router.post("/", async (req, res) => {
    const { color, size, quantity, country, deliveryMode } = req.body

    if (!color || !size || !quantity || !country || !deliveryMode) {
        return res.status(400).json({ error: "Missing fields" })
    }

    const duck = await Duck.findOne({ color, size })
    
    if (!duck) {
        return res.status(404).json({ error: "Duck not found" })
    }

    if (duck.stock < quantity) {
        return res.status(400).json({ error: "Insufficient stock" })
    }

    duck.stock -= quantity
    await duck.save()

    const order = new Order({
        duck: duck._id,
        quantity,
        country,
        deliveryMode
    })

    await order.save();

    res.status(201).json({ message: "Order placed", order })
})

module.exports = router;