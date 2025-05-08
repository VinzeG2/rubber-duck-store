const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    duck: { type: mongoose.Schema.Types.ObjectId, ref: "Duck", required: true },
    quantity: { type: Number, required: true },
    country: { type: String, required: true },
    deliveryMode: {
        type: String,
        enum: ["land", "air", "sea"],
        required: true
    },
    package: { type: String, required: true },
    filling: { type: String, required: true },
}, {
  timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)
