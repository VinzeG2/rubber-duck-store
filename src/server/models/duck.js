const mongoose = require("mongoose");

const duckSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  deleted: { type: Boolean, required: false }
}, {
  timestamps: true
});

module.exports = mongoose.models.Duck || mongoose.model("Duck", duckSchema);
