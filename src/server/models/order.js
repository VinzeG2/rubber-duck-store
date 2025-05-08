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
    totalPrice: { type: Number, required: true },
    detailedPrice: {
        basePrice: { type: Number, required: true },
        bulkDiscount: { type: Number, required: true },
        packagingAdjustment: { type: Number, required: true },
        countryTax: { type: Number, required: true },
        deliveryFee: { type: Number, required: true },
        finalTotal: { type: Number, required: true }
    }
      
}, {
  timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)
